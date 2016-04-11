import React, {Component} from 'react'

var InteractView = React.createClass ({

	render: function() {
		return(
			<div className="interactView">
				<p>This is interactive view</p>
				<a className="intmenu" href="#home/viewType/search">Search</a>
				<a className="intmenu" href="#home/viewType/leaders">Community Leaders</a>
				<LeaderView />
			</div>
		)
	}
})

var LeaderView = React.createClass ({

	render: function() {
		return(
			<div className="leaderView">
				<h5>Community Leaders</h5>
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
				<hr></hr>
			</div>
		)
	}
})

export default InteractView