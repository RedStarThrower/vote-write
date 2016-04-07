import React, {Component} from 'react'
import Header from './header.js'

var BallotView = React.createClass({

	render: function() {
		return (
			<div className="ballotView">
				<Header />
						
				<iframe src="http://www.harrisvotes.com/SampleBallot/SampleBallot.pdf"title="sample_ballot" align="left" height="300" width="70%" frameborder="0" scrolling="auto"></iframe>
			</div>
		)
	}
})

export default BallotView