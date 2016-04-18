import React, {Component} from 'react'
import BBFire from 'bbfire'
import Header from "./header.js"
import Footer from './footer.js'

var MyNotesContainer = React.createClass ({

	componentWillMount: function() {
		var self = this
        this.props.noteColl.on('sync',function() {
            self.forceUpdate()
        })
        this.props.printColl.on('sync',function() {
            self.forceUpdate()
        })
	},

	render: function() {
	 	//console.log(this)
		return (
			<div className="homeView"> 
				<Header email={this.props.email}/>		
					<div className="leftCol">
						<MyNotesView  noteColl={this.props.noteColl}/>
					</div>
					<div className="rightCol">
						<PrintView printColl={this.props.printColl}/>
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
		//console.log(event.target.checked)
		var noteModel = this.props.note
		var PrintCollection = BBFire.Firebase.Collection.extend({

    		url: "https://vote-write.firebaseio.com/users",

    		initialize: function(uid) {
    		this.url = `https://vote-write.firebaseio.com/users/${uid}/printMyNotes`
    	}
    })
		var pc = new PrintCollection(this.ref.getAuth().uid)
		
		if (event.target.checked) {
			pc.create(noteModel.attributes)	
		}
		else {
			pc.remove(noteModel.attributes)	
		}
		
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
		//console.log(this)
		return(
			<div className="printView">
				<p className="printBlurb">PRINT: </p>
				<hr></hr>
				<PrintScroll printColl={this.props.printColl} />
			</div>
		)
	}
})

var PrintScroll = React.createClass({

	_getPubNotesJsx: function(resultsArr) {
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
				{this._getPubNotesJsx(this.props.printColl.models)}
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

