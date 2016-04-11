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
				<p className="groupName">League of Women Voters</p>	
				<p className="groupBlurb">The League of Women Voters, a nonpartisan political organization, has fought since 1920 to improve U.S. systems of government and impact public policies through education and advocacy.</p>	
				<a target="_blank" href="http://www.vote411.org/ballot">Get your voting guide!</a> 
				<hr></hr>
				<p className="groupName">Houston Chronicle</p>
				<p className="groupBlurb">The Chronicle has made dozens of recommendations in parstisan and municipal elections. The endorsements are listed roughly in the order they appear on the ballot.</p>	
				<a target="_blank" href="http://www.houstonchronicle.com/opinion/endorsements/">View endorsements</a>
				<hr></hr>
				<p className="groupName">Houston Stonewall Young Democrats</p>
				<p className="groupBlurb">The Houston Stonewall Young Democrats is a group of progressive young people between the ages of 14-40 working to elect pro-equality candidates. Endorsement process is member-driven via questionnairs and in-preson interviews.</p>
				<a target="_blank" href="http://www.houstonstonewallyd.com/endorsements">View endorsements</a>
				<hr></hr>
				<p className="groupName">Houston LGBT Political Caucus</p>
				<p className="groupBlurb">The Caucus is nonpartisan, and continues to mobilize the city's GLBT and GLBT-friendly voters, elect pro-equality candidates, influence local, state, and national elections, and works towards the implementation of pro-equality public policy. </p>
				<a target="_blank" href="http://www.thecaucuspac.com/endorsed_candidates">View endorsements</a>
				<hr></hr>
				<p className="groupName">C Club of Houston</p>
				<p className="groupBlurb">The “C” Club's non-partisan support of political candidates is heavily based upon, but not limited to, the candidate's support of conservative fiscal policies; and, the preservation of our communities and the promotion of a strong economy. Founded in 1964, the “C” Club PAC is composed of 100 fiscally conservative Houston business and professional members who make a continuous study of local, Texas government.</p>
				<a target="_blank" href="http://www.cclub.org">View endorsements</a>			
			</div>
		)
	}
})

export default LeaderContainer