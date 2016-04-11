import React, {Component} from 'react'

var Footer = React.createClass({
	render: function() {
		return(
			<div className="footer">
				<ul>
				<a target="_blank" href="http://www.votetexas.gov/register-to-vote/register-to-vote/"><li className="tab">Voting Registration</li></a>
				<a target="_blank" href="http://www.sos.state.tx.us/elections/voter/2016-important-election-dates.shtml"><li className="tab">Elections & Important Dates</li></a>
				<a target="_blank" href="http://www.fyi.legis.state.tx.us/Home.aspx"><li className="tab">Find Your District</li></a>
				<a target="_blank" href="http://www.harrisvotes.com/VoterBallotSearch.aspx?L=E"><li className="tab">Find Your Polling Location</li></a>
				</ul>
			</div>
		)
	}
})

export default Footer