import React, {Component} from 'react'
import Header from "./header.js"
import BallotView from './ballotView.js'
import InteractView from './interactView.js'
import Footer from './footer.js'

var LeaderContainer = React.createClass ({

	render: function() {
		return(
			<div className="homeView"> 
				<Header />				
					<div className="leftCol">
						<BallotView/>
					</div>
					<div className="rightCol">
						<InteractView />
						<LeaderView />
					</div>
				<Footer />
			</div>
		)
	}
})

var LeaderView = React.createClass ({

	render: function() {
		return(
			<div className="leaderView">
				<p className="leaderBlurb">See endorsements from prominent civic groups:</p>
				<hr></hr>
				<p>League of Women Voters</p>	
				<a target="_blank" href="http://www.vote411.org/ballot">Get your bipartisan voting guide!</a> 
				<hr></hr>
				<p>Houston Chronicle</p>
				<a target="_blank" href="http://www.houstonchronicle.com/opinion/endorsements/">View endorsements</a>
				<hr></hr>
				<p>Houston Stonewall Young Democrats</p>
				<a target="_blank" href="http://www.houstonstonewallyd.com/endorsements">View endorsements</a>
				<hr></hr>
				<p>Houston LGBT Caucus</p>
				<a target="_blank" href="http://www.thecaucuspac.com/endorsed_candidates">View endorsements</a>
				<hr></hr>
				<p>C Club of Houston</p>
				<a target="_blank" href="http://www.cclub.org">View endorsements</a>
				<hr></hr>
				<p>Texas Concervative View</p>
				<a target="_blank" href="http://www.texasconservativeview.com/endorsements.htm">View endorsements</a>
			</div>
		)
	}
})

export default LeaderContainer