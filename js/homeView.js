import React, {Component} from 'react'
import Header from './header.js'
import SearchView from './searchView.js'

var HomeView = React.createClass({

	render: function() {

		return(
			<div className="homeView">
				<Header />
				<p>Displaying Home view: Will have dashboard here</p>
				<a href="#search">Go Search Stuff</a>
			</div>
		)
	}
})

export default HomeView