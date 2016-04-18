import React, {Component} from 'react'

var InteractView = React.createClass ({

	_handleSearchClick: function() {
		location.hash = `workspace/ballot/${this.props.ballot}/search`
	},

	_handleLeaderClick: function() {
		location.hash = `workspace/ballot/${this.props.ballot}/leaders`
	},

	_handleNotepadClick: function() {
		location.hash = `workspace/ballot/${this.props.ballot}/notepad`
	},

	render: function() {
		//console.log(this.props)
		return(
			<div className="interactView">
				<button className="searchBtn" onClick={this._handleSearchClick}>Search</button>
				<button className="leaderBtn" onClick={this._handleLeaderClick}>Community Leaders</button>
				<button className="notepadBtn" onClick={this._handleNotepadClick}>Notepad</button>
			</div>
		)
	}
})

export default InteractView