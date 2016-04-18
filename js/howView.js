import React, {Component} from 'react'
import Header from "./header.js"
import {BallotContainer, BallotView} from './ballotView.js'
import InteractView from './interactView.js'
import Footer from './footer.js'


var HowView = React.createClass ({

	render: function() {
		return (
			<div className="howView">
				<p className="howBlurb">HOW THIS WORKS | To get fully prepared for the upcoming elections, follow these simple steps:</p>
				<hr></hr>
				<p className="howStep">{"\u2605"}<b>Step 1.</b> Use the links at the bottom to confirm your eligibility to vote in Harris County, your district, and polling location.</p>
				<p className="howStep">{"\u2605"}<b>Step 2.</b> In "My Workspace" preview sample ballots for the upcoming election (Use + and - buttons for zoom).</p>
				<p className="howStep">{"\u2605"}<b>Step 3.</b> Research each candidate/issue using the custom “Search” tool. Wonder what recommendations local education groups and political caucuses have to make? Check out the “Community Leaders” tab.</p>
				<p className="howStep">{"\u2605"}<b>Step 4.</b> As you research, jot down your selections, opinions and experiences in your custom “Notepad”.</p>
				<p className="howStep">{"\u2605"}<b>Step 5.</b> View all your notes in "My Notes", then select and print the notes you’d like to take to the booth with you on elections day.</p>
				<p className="howStep">{"\u2605"}<b>Step 6 (optional).</b> Want to share your notes with other users? Click “share", and they will appear in the “Public Notes” section, where you can read what voters just like you had to say about their ballots.</p>
				<hr></hr>
				<p className="howBlurb">In a hurry? Use this app your phone or tablet!</p>
			</div>
		)
	}
})

export default HowView