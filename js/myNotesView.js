import React, {Component} from 'react'
import jsPDF from 'jspdf'
import BBFire from 'bbfire'
import Header from "./header.js"
import Footer from './footer.js'

var MyNotesContainer = React.createClass ({

	componentWillMount: function() {
		var self = this
        this.props.noteColl.on('sync',function() {
            self.forceUpdate()
        })
        BBFire.Events.on("modifyPrintList", function(noteModel, checkStatus) {
        	//console.log("triggered:", noteModel, checkStatus)

        	if (checkStatus) {
        		var toPrintCopyArr = self.state.toPrint.filter(function(model){return model})
        		toPrintCopyArr.push(noteModel)
        		self.setState({
        			toPrint: toPrintCopyArr
        		})
        	}
        	else {
        		var toPrintCopyArr = self.state.toPrint.filter(function(printListModel){
        			return noteModel.id !== printListModel.id
        		})
        		self.setState({
        			toPrint: toPrintCopyArr
        		})
        	}

        })
	},

	componentWillUnmount: function() {
		var self = this
        this.props.noteColl.off()
		BBFire.Events.off()
	},

	getInitialState: function() {
		return {
			toPrint: []
		}
	},

	render: function() {
	 	//console.log(this)
		return (
			<div className="homeView"> 
				<Header email={this.props.email}/>		
					<div className="leftCol">
						<MyNotesView noteColl={this.props.noteColl}/>
					</div>
					<div className="rightCol">
						<PrintView notesToPrint={this.state.toPrint}/>
					</div>
				<Footer />
			</div>
		)
	}
})

var MyNotesView = React.createClass({

	_deleteMyNote: function(model) {
		this.props.noteColl.remove(model)
	},

	render: function() {
		return(
			<div className="myNotesView">
				<p className="noteBlurb">MY NOTES | Click "Share" to publish your note at "Public Notes". Click "Vote" to add that candidate to your handy Ballot Cheat Sheet.</p>
				<hr></hr>
					<MyNotesScroll deleteNote={this._deleteMyNote} noteColl={this.props.noteColl} />
			</div>
		)
	}
})

var MyNotesScroll = React.createClass({

	_getMyNotesJsx: function(resultsArr) {
		//console.log(resultsArr)
		var self = this
		var jsxArr = []
    		resultsArr.forEach(function(resultMod, i) {
    			var component = <MyNote deleteNote={self.props.deleteNote} key={i} note={resultMod}/>
    			jsxArr.push(component)
    		})
    		return jsxArr
	},

	render: function() {
		return(
			<div className="scroll">
				{this._getMyNotesJsx(this.props.noteColl.models)}
			</div>
		)
	}
})

var MyNote = React.createClass({

	_printMyNote: function(event){
		var noteModel = this.props.note
		//console.log("triggering modify print list")
		BBFire.Events.trigger("modifyPrintList", noteModel, event.target.checked) //<= last argument is the "payload"
	},

	_shareMyNote: function(event){
		//console.log(event.target.checked)
		var noteModel = this.props.note
		var PubColl = BBFire.Firebase.Collection.extend({
   			url: "https://vote-write.firebaseio.com/publicNotes"
		})
		var pc = new PubColl()
		
		if (event.target.checked) {
			noteModel.set({
				is_shared: true
			})	
			pc.create(noteModel.attributes)
			
		}
		else {
			noteModel.set({
				is_shared: false
			})
			pc.remove(noteModel.attributes)
				
		}
		
	},

	_deleteNote: function(model, event) {
		this.props.deleteNote(model)
	},

	render: function() {
		var noteModel = this.props.note
		//console.log(noteModel)
		var styleObject = {display:'block'}

		if (!noteModel.get('id')) {
			styleObject.display = "none"
		}

		var shareCheckedStatus
		if (!noteModel.get('is_shared')) {
			shareCheckedStatus = false
		} else {
			shareCheckedStatus =  true
		}

		return (
			<div style={styleObject} className="myNoteView">
				<p><b>Election Date:</b> {noteModel.get("date")}</p>
				<p><b>Party:</b> {noteModel.get("party")}</p>
				<p><b>Area:</b> {noteModel.get("area")}</p>
				<p><b>Position:</b> {noteModel.get("position")}</p>
				<p><b>Name:</b> {noteModel.get("first_name")} {noteModel.get("last_name")}</p>
				<p><b>Note:</b> {noteModel.get("note_content")}</p>	
				<div className="myNotesButtons">
					<label className="share">Share<input type="checkbox" checked={shareCheckedStatus} onChange={this._shareMyNote}/></label>
					<label className="print">Vote<input type="checkbox" onChange={this._printMyNote}/></label>
					<button onClick={this._deleteNote.bind(this, noteModel)}>Delete</button>
				</div>
			</div>
		)
	}
})

var PrintView = React.createClass({

	render: function() {
		//console.log(this.props.notesToPrint)
		return(

			<div className="printView">
				<p className="printBlurb">BALLOT CHEAT SHEET | Take your condensed list of chosen candidates to the polls: print this page and bring in to the booth, or review it on your mobile device while waiting in line.</p>
				<hr></hr>
				<PrintScroll notesArr={this.props.notesToPrint} />
			</div>
		)
	}
})

var PrintScroll = React.createClass({

	_printMyNotesJsx: function(resultsArr) {
		//console.log(resultsArr)
		var jsxArr = []
    		resultsArr.forEach(function(resultMod, i) {
    			var component = <PrintNote key={i} note={resultMod}/>
    			jsxArr.push(component)
    		})
    		return jsxArr
	},

	render: function() {
		return(
			<div className="scroll">
				{this._printMyNotesJsx(this.props.notesArr)}
			</div>
		)
	}
})

var PrintNote = React.createClass({

	render: function() {
		var noteModel = this.props.note
		//console.log(noteModel)
		var styleObject = {display:'block'}

		if (!noteModel.get('id')) {
			styleObject.display = "none"
		}
		return (
			<div style={styleObject} className="printNoteView">
				<p>{noteModel.get("position")}, {noteModel.get("area")}, <b>Voting for: </b>{noteModel.get("first_name")} {noteModel.get("last_name")}</p>
			</div>
		)
	}
})


export {MyNotesContainer, MyNotesView, PrintView}

