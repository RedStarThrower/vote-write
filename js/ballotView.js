import React, {Component} from 'react'
import Header from "./header.js"
import InteractView from './interactView.js'
import {SearchContainer, SearchView} from './searchView.js'
import Footer from './footer.js'

var BallotContainer = React.createClass({

	render: function() {
		//console.log(this)
		return (
			<div className="homeView"> 
				<Header email={this.props.email}/>		
					<div className="leftCol">
						<BallotView ballot={this.props.ballot} searchColl={this.props.searchColl}/>
					</div>
					<div className="rightCol">
						<InteractView ballot={this.props.ballot} />
						<SearchView searchColl={this.props.searchColl} ballot={this.props.ballot}/>
					</div>
				<Footer />
			</div>
		)
	}
})

var BallotView = React.createClass({

	_handleMay7: function() {
		location.hash = "workspace/ballot/05-07-16"
	},

	_handleMay24D: function() {
		location.hash = "workspace/ballot/05-24-16D"
	},

	_handleMay24R: function() {
		location.hash = "workspace/ballot/05-24-16R"
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

export {BallotContainer, BallotView}