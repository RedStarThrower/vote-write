import React, {Component} from 'react'

var Header = React.createClass({

	render: function(){
		return(
			<div className="header">
				<h3>Welcome to my Final Project App!</h3>
    			<p>Find all the info you need for local municipal elections in Harris County</p>  
    			<a href="#home">Home</a>
    			<hr></hr> 		
			</div>
		)
	}
})

export default Header 