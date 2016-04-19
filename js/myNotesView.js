import React, {Component} from 'react'
import BBFire from 'bbfire'
import Header from "./header.js"
import Footer from './footer.js'

var MyNotesContainer = React.createClass ({

	_updateToPrint: function(noteMod) {
		// push noteMod onto the array on state
		//console.log(this.state)
		// this.setState({
		// 	toPrint: // tautologically update state
		// })
	},

	componentWillMount: function() {
		var self = this
        this.props.noteColl.on('sync',function() {
            self.forceUpdate()
        })
        BBFire.Events.on("modifyPrintList", function(noteModel, checkStatus) {
        	console.log("triggered:", noteModel, checkStatus)

        	if (checkStatus) {
        		var toPrintCopyArr = self.state.toPrint.filter(function(x){return x})
        		toPrintCopyArr.push(noteModel)
        		self.setState({
        			toPrint: toPrintCopyArr
        		})
        	}
        	else {
        		var toPrintCopyArr = self.state.toPrint.filter(function(x){return false})
        		toPrintCopyArr.push(noteModel)
        		self.setState({
        			toPrint: toPrintCopyArr
        		})
        	}

        })
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

	render: function() {
		return(
			<div className="myNotesView">
				<p className="noteBlurb">MY NOTES:</p>
				<hr></hr>
					<MyNotesScroll noteColl={this.props.noteColl} />
			</div>
		)
	}
})

var MyNotesScroll = React.createClass({

	_getMyNotesJsx: function(resultsArr) {
		//console.log(resultsArr)
		var jsxArr = []
    		resultsArr.forEach(function(resultMod, i) {
    			var component = <MyNote key={i} note={resultMod}/>
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
		//create trigger for a custom event
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
			pc.create(noteModel.attributes)	
		}
		else {
			pc.remove(noteModel.attributes)	
		}
		
	},

	render: function() {
		var noteModel = this.props.note
		//console.log(noteModel)
		var styleObject = {display:'block'}

		if (!noteModel.get('id')) {
			styleObject.display = "none"
		}
		return (
			<div style={styleObject} className="myNoteView">
				<p><b>Date:</b> {noteModel.get("date")}</p>
				<p><b>Party:</b> {noteModel.get("party")}</p>
				<p><b>Area:</b> {noteModel.get("area")}</p>
				<p><b>Position:</b> {noteModel.get("position")}</p>
				<p><b>Name:</b> {noteModel.get("first_name")} {noteModel.get("last_name")}</p>
				<p><b>Note:</b> {noteModel.get("note_content")}</p>
				<label className="share">Share<input type="checkbox" onChange={this._shareMyNote}/></label>
				<label className="print">Print<input type="checkbox" onChange={this._printMyNote}/></label>
			</div>
		)
	}
})

var PrintView = React.createClass({

	render: function() {
		//console.log(this.props.notesToPrint)
		return(
			<div className="printView">
				<p className="printBlurb">PRINT: </p>
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
				<p><b>Date:</b> {noteModel.get("date")}</p>
				<p><b>Party:</b> {noteModel.get("party")}</p>
				<p><b>Area:</b> {noteModel.get("area")}</p>
				<p><b>Position:</b> {noteModel.get("position")}</p>
				<p><b>Name:</b> {noteModel.get("first_name")} {noteModel.get("last_name")}</p>
				<p><b>Note:</b> {noteModel.get("note_content")}</p>
			</div>
		)
	}
})


export {MyNotesContainer, MyNotesView, PrintView}

