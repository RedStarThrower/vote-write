import Backbone from 'bbfire'
import React, {Component} from 'react'
import Header from "./header.js"
import {BallotContainer, BallotView} from './ballotView.js'
import InteractView from './interactView.js'
import Footer from './footer.js'

var NotepadContainer = React.createClass ({

	render: function() {
		//console.log(this)
		return(
			<div className="homeView"> 
				<Header email={this.props.email}/>		
					<div className="leftCol">
						<BallotView ballot={this.props.ballot}/>
					</div>
					<div className="rightCol">
						<InteractView ballot={this.props.ballot}/>
						<NotepadView email={this.props.email} noteColl={this.props.noteColl} ballot={this.props.ballot}/>
					</div>
				<Footer />
			</div>
		)
	}
})

var NotepadView = React.createClass({

	date: '',
	party: '',
	position: '',
	area: '',
	first_name: '',
	last_name: '',
	proposition: '',
	note_content: '',

	_setDate: function(e) {
		this.date = e.target.value
	},

	_setParty: function(e) {
		this.party = e.target.value
	},

	_setPosition: function(e) {
		this.position = e.target.value
	},

	_setArea: function(e) {
		this.area = e.target.value
	},

	_setFirstName: function(e) {
		this.first_name = e.target.value
	},

	_setLastName: function(e) {
		this.last_name = e.target.value
	},

	_setProposition: function(e) {
		this.proposition = e.target.value
	},

	_setNoteContent: function(e) {
		this.note_content = e.target.value
	},

	_saveNote: function() {
		var noteObj = {
			date: this.refs.elecDate.value,
			party: this.party,
			position: this.position,
			area: this.area,
			first_name: this.first_name,
			last_name: this.last_name,
			proposition: this.proposition,
			note_content: this.note_content,
			email: this.props.email,
			is_shared: false,
		}
		this.props.noteColl.create(noteObj)
		window.location.reload()
	},

	render: function() {
		//console.log(this)
		var date = this.props.ballot
		if (date === "05-07-16") {
			date = "May 7, 2016"
		}
		if (date === "05-24-16D") {
			date = "May 24, 2016"
		}
		if (date === "05-24-16R") {
			date = "May 24, 2016"
		}
		return(
			<div className="notepadView">
				<p className="notepadBlurb">NOTEPAD | Jot down your selections, opinions, and experiences. You can view and print them in "My Notes", or publish them for other users to see in "Public Notes":</p>
				<hr></hr>
				<div className="noteForm">
					<label>Election Date: <input required defaultValue={date} onChange={this._setDate} ref="elecDate" /></label>
					<label>Party: <input placeholder='ex: "Dem", "Rep", "Mun"' onChange={this._setParty}/></label>
					<label>Position: <input placeholder='ex: "Justice of the Peace"' onChange={this._setPosition}/></label>			
					<label>Area: <input placeholder='ex: "Precinct 5, Place 1"'onChange={this._setArea}/></label>	
					<label>First Name: <input className="toClear" placeholder="Candidate's first name" onChange={this._setFirstName}/></label>			
					<label>Last Name: <input className="toClear" placeholder="Candidate's last name"onChange={this._setLastName}/></label>
					<label>Proposition: <input className="toClear" placeholder='ex: "3"'onChange={this._setProposition}/></label>		
					<hr></hr>
					<div className="noteCont">	
						<label>Note: <textarea className="toClear" required rows="5" maxLength="500" placeholder='ex: "I would/would not vote for this candidate/proposition, because..." (max character length: 500)'onChange={this._setNoteContent}/></label>	
					</div>		
					<button onClick={this._saveNote}>Save Note</button>
				</div>
			</div>
		)
	}
})

export {NotepadContainer, NotepadView}

