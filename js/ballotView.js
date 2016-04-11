import React, {Component} from 'react'

var BallotView = React.createClass({

	render: function() {
		return (
			<div className="ballotView">
			<p>Step 1: View the ballot for the upcoming election</p>		
				<iframe src="http://www.harrisvotes.com/SampleBallot/SampleBallot.pdf"title="sample_ballot" scrolling="auto"></iframe>
			</div>
		)
	}
})

export default BallotView