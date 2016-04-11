import React, {Component} from 'react'

var BallotView = React.createClass({

	_handleMay7: function() {
		this.setState ({
			source: "http://www.harrisvotes.com/SampleBallot/SampleBallot.pdf"
		})
	},

	_handleMay24D: function() {
		this.setState ({
			source: "http://www.harrisvotes.com/SampleBallot/SampleBallotD.pdf",
		})
	},

	_handleMay24R: function() {
		this.setState ({
			source: "http://www.harrisvotes.com/SampleBallot/SampleBallotR.pdf",
		})
	},

	getInitialState: function() {
		return {
			source: "http://www.harrisvotes.com/SampleBallot/SampleBallot.pdf",
		}
	},

	render: function() {
		//console.log(this)
		return (
			<div className="ballotView">
				<p>Step 1. View the ballot for the upcoming election:</p>	
				<button onClick={this._handleMay7}>Sample Ballot May 7 (municipal)</button>
				<button onClick={this._handleMay24D}>Sample Ballot May 24 (D)</button>
				<button onClick={this._handleMay24R}>Sample Ballot May 24 (R)</button>		
				<iframe src={this.state.source} title="sample_ballot" scrolling="auto"></iframe>
			</div>
		)
	}
})

export default BallotView