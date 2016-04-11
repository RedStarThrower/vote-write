import React, {Component} from 'react'
import Header from "./header.js"
import BallotView from './ballotView.js'
import InteractView from './interactView.js'
import Footer from './footer.js'


var SearchContainer = React.createClass ({

	render: function() {
		return(
			<div className="homeView"> 
				<Header />				
					<div className="leftCol">
						<BallotView/>
					</div>
					<div className="rightCol">
						<InteractView />
						<SearchView searchColl={this.props.searchColl} />
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
      			location.hash = `home/search/${query}`   			
    		}
    	},

       	render: function() {
       		return (    			
    			<div className="searchContainer">
    				<p className="searchBlurb">For a custom search, type name/issue and press "Enter"</p>
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
    		//console.log(searchModel)
    		return(
    			<div className="searchResult">
    			<hr></hr>
    				<strong><p className="searchTitle">Article Title: {searchModel.get('title')}</p></strong>
    				<p className="searchSnippet"><b>Article snippet:</b> "{searchModel.get('snippet')}..." <b>Read more:</b> <a target="_blank" href={searchModel.get('link')}>{searchModel.get('displayLink')}</a></p>
    			</div>
    		)
    	}
    })

    export default SearchContainer
