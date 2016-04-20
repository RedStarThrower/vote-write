import React, {Component} from 'react'
import Header from "./header.js"
import {BallotContainer, BallotView} from './ballotView.js'
import Footer from './footer.js'

var AllNotesContainer = React.createClass({

	componentWillMount: function() {
		var self = this
        this.props.pubColl.on('sync',function() {
            self.forceUpdate()
        })

	},

	render: function() {
		//console.log(this)
		return(
			<div className="homeView"> 
				<Header email={this.props.email}/>		
					<div className="leftCol">
						<BallotView2 ballot={this.props.ballot}/>
					</div>
					<div className="rightCol">
						<AllUserNotes pubColl={this.props.pubColl} />
					</div>
				<Footer />
			</div>
		)
	}
})

var AllUserNotes = React.createClass({

	_filterPubNotes: function(event) {
		//console.log(this)
		var self = this		
		var filteredArr = self.state.pubColl.filter(function(model, searchedName){		
			var lastName = model.get('last_name').toLowerCase()
			var searchedName = event.target.value.toLowerCase()
			var filteredResults = []
			if (lastName.indexOf(searchedName) !== -1) {
				filteredResults.push(model)
				return filteredResults
			}						
		})
		//console.log(filteredArr)
		self.setState({
			pubColl: filteredArr
		})
		
		if (event.target.value === "") {
			self.setState({
			pubColl: this.props.pubColl
		})
		}
	},

	getInitialState: function() {
		return {
			pubColl: this.props.pubColl
		}
	},

	render: function() {
		//console.log(this.state)
		return (
			<div className="allNotesView">
				<p className="publicBlurb">PUBLIC NOTES | See what other voters have to say about each candidate or proposition. </p>
				<label>Filter notes by candidate's last name: <input placeholder="Enter last name" onChange={this._filterPubNotes}/></label>
				<hr></hr>
				<Scroll pubColl={this.state.pubColl} />
			</div>
		)		
	}
})

var Scroll = React.createClass({

	
	_getPubNotesJsx: function(resultsArr) {
		//console.log(resultsArr)
		var jsxArr = []
    		resultsArr.forEach(function(resultMod, i) {
    			var component = <PublicNote key={i} note={resultMod}/>
    			jsxArr.push(component)
    		})
    		return jsxArr
	},

	render: function() {
		//console.log(this.props.pubColl)
		return(
			<div className="scroll">
				{this._getPubNotesJsx(this.props.pubColl)}
			</div>
		)
	}
})

var PublicNote = React.createClass({

	render: function() {
		var noteModel = this.props.note
		//console.log(noteModel)
		var styleObject = {display:'block'}

		if (!noteModel.get('id')) {
			styleObject.display = "none"
		}
		return (
			<div style={styleObject} className="pubNoteView">
				<p><b>Written by:</b> {noteModel.get("email")}</p>
				<p><b>Election Date:</b> {noteModel.get("date")}</p>
				<p><b>Party:</b> {noteModel.get("party")}</p>
				<p><b>Area:</b> {noteModel.get("area")}</p>
				<p><b>Position:</b> {noteModel.get("position")}</p>
				<p><b>Name:</b> {noteModel.get("first_name")} {noteModel.get("last_name")}</p>
				<p><b>Note:</b> {noteModel.get("note_content")}</p>
			</div>
		)
	}
})

var BallotView2 = React.createClass({

	_handleMay7: function() {
		location.hash = "allnotes/ballot/05-07-16"
	},

	_handleMay24D: function() {
		location.hash = "allnotes/ballot/05-24-16D"
	},

	_handleMay24R: function() {
		location.hash = "allnotes/ballot/05-24-16R"
	},

	render: function() {
		//console.log(this)
		var source = "http://www.harrisvotes.com/SampleBallot/SampleBallot.pdf"
		if (this.props.ballot === "05-07-16") {
			source = "http://www.harrisvotes.com/SampleBallot/SampleBallot.pdf"
		}
		if (this.props.ballot === "05-24-16D") {
			source = "http://www.harrisvotes.com/SampleBallot/SampleBallotD.pdf"
		}
		if (this.props.ballot === "05-24-16R") {
			source = "http://www.harrisvotes.com/SampleBallot/SampleBallotR.pdf"
		}
		return (
			<div className="ballotView">
				<div className="ballotButtons">	
					<button className="ballotBtn1" onClick={this._handleMay7}>May 7 (municipal)</button>
					<button className="ballotBtn2" onClick={this._handleMay24D}>May 24 (D)</button>
					<button className="ballotBtn3" onClick={this._handleMay24R}>May 24 (R)</button>
				</div>		
				<div className="frameWrap">
				<iframe seamless src={source} title="sample_ballot" scrolling="auto" allowFullScreen></iframe>
				</div>
			</div>
		)
	}
})

export {AllNotesContainer, AllUserNotes}

