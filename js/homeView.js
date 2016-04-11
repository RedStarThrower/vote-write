import React, {Component} from 'react'
import Header from './header.js'
import Footer from './footer.js'
import BallotView from './ballotView.js'
import InteractView from './interactView.js'
import SearchView from './searchView.js'



var HomeView = React.createClass({

	render: function() {

		return(
			<div className="homeView"> 
				<Header />				
				<div className="column">
					<div className="leftCol">
						<BallotView/>
					</div>
					<div className="rightCol">
						<InteractView />
					</div>
				</div>
				<Footer />
			</div>
		)
	}
})

export default HomeView