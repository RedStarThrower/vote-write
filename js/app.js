// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'bbfire'
import Firebase from 'firebase'
import SplashPage from './splashPage.js'
import jsPDF from 'jspdf'
import Header from './header.js'
import {SearchContainer, SearchView} from './searchView.js'
import {BallotContainer, BallotView} from './ballotView.js'
import InteractView from './interactView.js'
import LeaderContainer from './leaderView.js'
import  HowView from './howView.js'
import {NotepadContainer, NotepadView} from './notepadView.js'
import {MyNotesContainer, MyNotesView, PrintView} from './myNotesView.js'
import {AllNotesContainer, AllUserNotes} from './allUserNotes.js'
import AboutContainer from './aboutView.js'
import Footer from './footer.js'

function app() {
    // start app
    // new Router()
    var ref = new Firebase("https://vote-write.firebaseio.com/")

    var PublicCollection = Backbone.Firebase.Collection.extend({
    	url: "https://vote-write.firebaseio.com/publicNotes"
    })

    var NoteCollection = Backbone.Firebase.Collection.extend({

    	url: "https://vote-write.firebaseio.com/users",

    	initialize: function(uid) {
    		this.url = `https://vote-write.firebaseio.com/users/${uid}/notes`
    	}
    })
  
    var SearchCollection = Backbone.Collection.extend ({
    	_apiKey: "AIzaSyAbOYKwsLQ-qU8SI2A7MFKMY7bCZ4cK7m4",
    	url: "https://www.googleapis.com/customsearch/v1?",

    	parse: function(rawJSON) {
    		//console.log(rawJSON)
    		return rawJSON.items
    		
    	}
    })    

    var AppRouter = Backbone.Router.extend ({

    	routes: {
    		"splash": "showSplashPage",
    		"logout": "handleLogOut",
    		"workspace/ballot/:ballot": "showBallotView1", 
    		"workspace/ballot/:ballot": "showBallotView2",
    		"workspace/ballot/:ballot": "showBallotView3",  
    		"workspace/ballot/:ballot/search": "showSearchView",
    		"workspace/ballot/:ballot/search/:query": "searchFor",
    		"workspace/ballot/:ballot/leaders": "showLeaderView",
    		"workspace/ballot/:ballot/how": "showHowView",
    		"workspace/ballot/:ballot/notepad": "showNotepadView",
    		"mynotes": "showMyNotesView",
    		"allnotes": "showAllNotesView",
    		"allnotes/ballot/:ballot": "showAllNotesView",
    		"about": "showAboutView",
       		"*default": "showSplashPage"
    	},

    	initialize: function() {
       		this.ref = new Firebase("https://vote-write.firebaseio.com")
       		var auth = this.ref.getAuth()
    		
    		if (!auth) location.hash = "splash"
			
			this.on("all", function() {
				if (!this.ref.getAuth()) location.hash = "splash"
			}, this)
    	},

    	showSplashPage: function() {
    		var boundSignerUpper = this._signUserUp.bind(this)
    		var boundLoggerInner = this._logUserIn.bind(this)
    		DOM.render(<SplashPage error={null} loggerInner={boundLoggerInner} signerUpper={boundSignerUpper}/>, document.querySelector('.container'))
    	},

    	handleLogOut: function() {
    		this.ref.unauth()
    		location.hash = "splash"
    	},

		
    	showBallotView1: function(date) {
    		var sc = new SearchCollection()
   			DOM.render(<BallotContainer email={this.ref.getAuth().password.email} ballot={date} searchColl={sc}/>, document.querySelector('.container'))
    	},

    	showBallotView2: function(date) { 
    		var sc = new SearchCollection()
    		DOM.render(<BallotContainer email={this.ref.getAuth().password.email} ballot={date} searchColl={sc}/>, document.querySelector('.container'))
    	},

    	showBallotView3: function(date) { 
    		var sc = new SearchCollection()
    		DOM.render(<BallotContainer email={this.ref.getAuth().password.email} ballot={date} searchColl={sc}/>, document.querySelector('.container'))
    	},

    	showSearchView: function(date) {
    		var sc = new SearchCollection()
    		DOM.render(<SearchContainer email={this.ref.getAuth().password.email} ballot={date} searchColl={sc}/>, document.querySelector('.container'))
    	},

    	searchFor: function(date,query) {
    		var ref = this.ref
    		var sc = new SearchCollection()
    		sc.fetch({
    			data: {
       				output: "json",
 					cx: "015739195413953031624:f7gnodx282i",
  					q: query,
     				key: sc._apiKey
    			}
    		}).then(function(){
    			DOM.render(<SearchContainer email={ref.getAuth().password.email} ballot={date} searchColl={sc}/>, document.querySelector('.container'))
    		})    		
    	},

    	showLeaderView: function(date) {
    		DOM.render(<LeaderContainer email={this.ref.getAuth().password.email} ballot={date}/>, document.querySelector('.container'))
    	},

    	showHowView: function(date) {
    		DOM.render(<HowContainer email={this.ref.getAuth().password.email} ballot={date}/>, document.querySelector('.container'))
    	},

    	showNotepadView: function(date) {
    		var nc = new NoteCollection(this.ref.getAuth().uid)

    		DOM.render(<NotepadContainer noteColl={nc} email={this.ref.getAuth().password.email} ballot={date}/>, document.querySelector('.container'))
    	},

    	showMyNotesView: function() {
    		var nc = new NoteCollection(this.ref.getAuth().uid)
			DOM.render(<MyNotesContainer noteColl={nc} email={this.ref.getAuth().password.email} />, document.querySelector('.container'))
    	},

    	showAllNotesView: function(date) {
    		var pubColl = new PublicCollection()
    		DOM.render(<AllNotesContainer ballot={date} pubColl={pubColl} email={this.ref.getAuth().password.email}/>, document.querySelector('.container'))
    	},

    	showAboutView: function() {
    		DOM.render(<AboutContainer email={this.ref.getAuth().password.email}/>, document.querySelector('.container'))
    	},

    	_signUserUp: function(submittedEmail, submittedPassword) {
			//console.log(this)
			var ref = this.ref
			var boundLoggerInner = this._logUserIn.bind(this)
			var boundSignerUpper = this._signUserUp.bind(this)

			var storeUser = function(userData) {
    			ref.child('users').child(userData.uid).set({email: submittedEmail})
    		}

    		var handler = function(error, userData) {
    			if (error) {
    				console.log("Error creating user:", error)
    				DOM.render(<SplashPage error={error} loggerInner={boundLoggerInner}signerUpper={boundSignerUpper} />,document.querySelector('.container'))
    			}
    			else {
    				console.log("Successfully created user account with uid:", userData.uid); 
    				storeUser(userData)
    				boundLoggerInner(submittedEmail, submittedPassword, function() {
    						location.hash = "about"})
       			}
       		}

       		ref.createUser({
    			email: submittedEmail,
    			password: submittedPassword,
    		}, handler)

        }, 

        _logUserIn: function (submittedEmail, submittedPassword) {
    		var ref = this.ref
    		var boundSignerUpper = this._signUserUp.bind(this)
          	var boundLoggerInner = this._logUserIn.bind(this)
    		var handler = function(error, authData) {
          		if (error) {
            		console.log("Login Failed!", error);
            		DOM.render(<SplashPage error={error} signerUpper={boundSignerUpper} loggerInner={boundLoggerInner}/>,document.querySelector('.container'))
          		} else {
            		console.log("Authenticated successfully with payload:")
            		console.log(authData)
            		location.hash = "workspace/ballot/05-07-16"
          		}
        	}
        
	        ref.authWithPassword({
	          email    : submittedEmail,
	          password : submittedPassword
	        }, handler);
    	}    	 

    })

    var rtr = new AppRouter()
    Backbone.history.start()
}

app()
