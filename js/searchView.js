import React, {Component} from 'react'
import Header from "./header.js"
import {BallotContainer, BallotView} from './ballotView.js'
import InteractView from './interactView.js'
import Footer from './footer.js'


var SearchContainer = React.createClass ({

	render: function() {
		//console.log(this)
		return(
			<div className="homeView"> 
				<Header email={this.props.email}/>				
					<div className="leftCol">
						<BallotView ballot={this.props.ballot}/>
					</div>
					<div className="rightCol">
						<InteractView ballot={this.props.ballot} />
						<SearchView ballot={this.props.ballot} searchColl={this.props.searchColl} />
					</div>
				<Footer />
			</div>
		)
	}
})


var SearchView = React.createClass({

    	componentWillMount: function(){
			var self = this
			this.props.searchColl.on('sync',function() {self.forceUpdate()})
		},

		 componentWillUnmount: function() {
            this.props.searchColl.off('sync')
        },

    	render: function() {
    		//console.log(this.props.searchColl)

    		return (
    			<div className="searchView">
    				<SearchBar ballot={this.props.ballot} />
    				<Scroll searchColl={this.props.searchColl}/>
    			</div>
    		)
    	}
    })

    var SearchBar = React.createClass({

    	_search: function(e) {
    		if (e.keyCode === 13) {
    			var query = e.target.value
    			//console.log(query) 
      			location.hash = `workspace/ballot/${this.props.ballot}/search/${query}`   			
    		}
    	},

       	render: function() {
       		return (    			
    			<div className="searchContainer">
    				<p className="searchBlurb">SEARCH | For a custom search, type name/issue and press "Enter"</p>
    				<p className="searchHint">(Try adding "news" or "Houston" to your search)</p>
    				<input onKeyDown={this._search} placeholder="Search Google..."/>
                    <hr></hr>
       			</div>
       		)
    	}
    })

    var Scroll = React.createClass({

    	_getSearchResultsJsx: function(resultsArr) {
    		//console.log(resultsArr)
    		var jsxArr = []
    		resultsArr.forEach(function(resultMod, i) {
    			var component = <SearchResult key={i} search_result={resultMod}/>
    			jsxArr.push(component)
    		})
    		return jsxArr
    	},

    	render: function(){
    		//console.log(this.props.searchColl.models)
    		return (
    			<div className="scroll">
    				{this._getSearchResultsJsx(this.props.searchColl.models)}
    			</div>
    		)
    	}
    })

    var SearchResult = React.createClass({    	

    	render: function() {    		
    		var searchModel = this.props.search_result
    		//console.log(searchModel)
    		return(
    			<div className="searchResult">
    				<strong><p className="searchTitle"><i>{searchModel.get('title')}</i></p></strong>
    				<p className="searchSnippet"><b>Article snippet:</b> "{searchModel.get('snippet')}..." <b>Read more:</b> <a target="_blank" href={searchModel.get('link')}>{searchModel.get('link')}</a></p>
                    <hr></hr>
    			</div>
    		)
    	}
    })

    export  {SearchContainer, SearchView}
