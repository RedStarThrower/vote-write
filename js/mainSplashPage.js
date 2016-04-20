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
					<div className="loginContainer">
						<input placeholder="Enter your e-mail" onChange={this._updateEmail} />
		                <input placeholder="Enter your password" onChange={this._updatePassword} type="password" />
		                 <button className="logInBtn" onClick={this._handleLogIn} >Log In</button>
		                 <button className="signUpBtn" onClick={this._handleSignUp}>Sign Up</button>
		                 <p className="error">{errorMsg}</p>	            </div> 
				</div>
				<div className="splashMidCol">
					<div className="blurb">{"\u2605"} get ready to make a difference</div>
					<div className="appTitle">
						<h3><p className="vote">Vote</p><p className="write">Write</p></h3>	
					</div>					
				</div>		   
                 <Footer />
			</div>
		)
	}
})

export default SplashPage