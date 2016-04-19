import React, {Component} from 'react'
import Footer from './footer.js'

var SplashPage = React.createClass({

	email: "",
	password: "",

	_updateEmail: function(event) {
        this.email = event.target.value
    },

    _updatePassword: function(event) {
        this.password = event.target.value
    },

    _handleSignUp: function() {
		this.props.signerUpper(this.email, this.password)
	},

	_handleLogIn: function() {
		this.props.loggerInner(this.email, this.password)
	},

	render: function() {
		//console.log(this)
		var errorMsg = ""
		if (this.props.error !== null)
			errorMsg = "There was a problem with your email or password. Please try again."

		return(
			<div className="splashView">
				<div className="splashHeader">
					<div className="appTitle">
						<h3>Write|<i>Vote.</i></h3>
					</div>	
				</div>
				<div className="splashLeftCol">
					<div className="leftBlurb">
						<p className="appDescr">Description of the app goes here: 
						1) Target audience (why Harris county voters should be excited to use this app.)
						2) Explain problem the app solves with its main features (search, notepad) 
						#) There needs to be quite a lot more text here in order
						</p> 
					</div>
				</div>
				<div className="splashMidCol">
					<div className="midBlurb">
						<p className="appBlurb">Blurb about big picture, goal of this app, and quotes about patriotism and such can go here. This app is super important and useful and will engage voters and get them out to vote and democracy will prevail forever</p>
					</div>
					<div className="loginContainer">	
						<p className="error">{errorMsg}</p>
						<input placeholder="Enter your e-mail" onChange={this._updateEmail} />
		                <input placeholder="Enter your password" onChange={this._updatePassword} type="password" />
		                 <button className="logInBtn" onClick={this._handleLogIn} >Log In</button>
		                 <button className="signUpBtn" onClick={this._handleSignUp}>Sign Up</button>
		             </div> 
				</div>
				<div className="splashRightCol">
					<div className="rightBlurb">
						<p className="appDescr">Description of the app's social features  goes here: engagement, education, participation, all of those things are super rad and will help users stay in touch with the community tra-lala.
						 	There needs to be quite a lot more text here in order to make the layodgdfut look good enough.	
						</p> 
					</div>	
				</div>				   
                 <Footer />
			</div>
		)
	}
})

export default SplashPage