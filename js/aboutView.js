import React, {Component} from 'react'
import Header from "./header.js"
import HowView from './howView.js'
import Footer from './footer.js'

var AboutContainer = React.createClass({

	render: function() {
		//console.log(this)
		return(
			<div className="aboutView"> 
				<Header email={this.props.email}/>	
				<div className="aboutSmallView">
						<AboutView />
				</div>
				<Footer />
			</div>
		)
	}
})

var AboutView = React.createClass({
	render: function() {
		return (
			<div className="aboutLittleView">
				<p className="mission">Mission statement goes here</p>
				<p className="mission">Contact info goes here</p>
			</div>
		)
	}
})

export default AboutContainer
