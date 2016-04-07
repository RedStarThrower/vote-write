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
import Header from './header.js'
import SearchView from './searchView.js'
import HomeView from './homeView.js'
import BallotView from './ballotView.js'


function app() {
    // start app
    // new Router()
  
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
    		"home": "showHomeView",
    		'search': "showSearchView",
    		"search/:query": "searchFor",
    		"ballot": "showBallotView",
    		"*default": "showHomeView"
    	},

    	showHomeView: function() {
    		var sc = new SearchCollection()
    		DOM.render(<HomeView />, document.querySelector('.container'))
    	},

    	showSearchView: function() {
    		var sc = new SearchCollection()
    		DOM.render(<SearchView searchColl={sc}/>, document.querySelector('.container'))
    	},

    	searchFor: function(query) {
    		var sc = new SearchCollection()
    		sc.fetch({
    			data: {
       				output: "json",
 					cx: "015739195413953031624:f7gnodx282i",
  					q: query,
  					searchType: "image",
   					key: sc._apiKey

    			}
    		}).then(function(){
    			DOM.render(<SearchView searchColl={sc}/>, document.querySelector('.container'))
    		})    		
    	},

    	showBallotView: function() {
    		DOM.render(<BallotView />, document.querySelector('.container'))
    	},

    	initialize: function() {
       		Backbone.history.start()
    	}
    })

    var rtr = new AppRouter()
}

app()
