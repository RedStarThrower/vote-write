import React, {Component} from 'react'
import Header from "./header.js"
import Footer from './footer.js'

var AboutContainer = React.createClass({

	render: function() {
		//console.log(this)
		return(
			<div className="aboutView"> 
				<Header email={this.props.email}/>	
				<div className="aboutCol">
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
			<div className="aboutText">
				<p className="title">Mission title goes here</p>
				<p className="text">lsdkfsklslfhsdklfhdklfghlsdjkghklfjgbdfskjlghbdfkj.gdskgjbdhsfk;ghdsfgjkbdf.jkgbdkjfgkdsjfghkdjsghkldsjfghlskdfjghdljkfgh</p>
				<hr></hr>
				<p className="title">Contact info goes here</p>
				<p className="contact">lsdkfsklslfhsdklfhdklfghlsdjkghklfjgbdfskjlghbdfkj.gdskgjbdhsfk;ghdsfgjkbdf.jkgbdkjfgkdsjfghkdjsghkldsjfghlskdfjghdljkfgh</p>
			</div>
		)
	}
})

export default AboutContainer
