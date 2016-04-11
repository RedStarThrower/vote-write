import React, {Component} from 'react'

var InteractView = React.createClass ({

	_handleSearchClick: function() {
		location.hash = "#home/search"
	},

	_handleLeaderClick: function() {
		location.hash = "#home/leaders"
	},

	render: function() {
		return(
			<div className="interactView">
				<p className="interBlurb">Step 2. Run a custom search or view endorsements from prominent groups:</p>
				<button onClick={this._handleSearchClick}>Search</button>
				<button onClick={this._handleLeaderClick}>Community Leaders</button>
				<div className="interactContent">
				</div>
			</div>
		)
	}
})

export default InteractView