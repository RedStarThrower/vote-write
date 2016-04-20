import React, {Component} from 'react'

var Header = React.createClass({

	render: function(){
		//console.log(this)
		return(
			<div className="header">
				<a className="appTitle" href="#workspace/ballot/05-07-16"><h3><p className="write">Write</p><p className="vote">Vote</p></h3></a>
				<p className="greeting">Welcome, {this.props.email}</p>
				<div className="navBar">	
					<ul>			
					<a href="#workspace/ballot/05-07-16"><li className="tab">{"\u2605"}My Workspace</li></a>
					<a href="#mynotes"><li className="tab">{"\u2605"}My Notes</li></a>
					<a href="#allnotes"><li className="tab">{"\u2605"}Public Notes</li></a>
					<a href="#about"><li className="tab">{"\u2605"}About</li></a>
					<a href="#logout"><li className="tab">{"\u2605"}Log Out</li></a>
					</ul>
				</div>	
			</div>
		)
	}
})

export default Header 