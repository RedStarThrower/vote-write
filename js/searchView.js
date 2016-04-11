import React, {Component} from 'react'
import Header from './header.js'

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
    				<SearchBar />
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
      			location.hash = `search/${query}`   			
    		}
    	},

       	render: function() {
       		return (    			
    			<div className="searchContainer">
    				<input onKeyDown={this._search} placeholder="Search Google..."/>	
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
    		//console.log(this.props.searchColl)
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
    		console.log(searchModel)
    		return(
    			<div className="searchResult">
    				<strong><p className="searchTitle">{searchModel.get('title')}</p></strong>
    				<p className="searchSnippet">Article snippet: {searchModel.get('snippet')}...</p>
    				{/*<img src={searchModel.get('image').thumbnailLink} />*/}
    				<a target="_blank" href={searchModel.get('link')}> {searchModel.get('displayLink')}</a>
    				<hr></hr>
    			</div>
    		)
    	}
    })

    export default SearchView
