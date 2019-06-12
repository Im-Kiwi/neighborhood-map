import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class Canvas extends Component {

  state= {
    query:''  //state for query ... here query will be updated when typing some query in search bar

  }


 //set the time for animation of markers when one of the item in the list is clicked
  setTimeForAnime= (marker) => {
    window.setTimeout(function() {
      marker.setAnimation(null)
    },1000)
  }

//function which will be called once the item in the list is clicked or 'enter' key is pressed
  clickList= (venue) => {

    var markers= this.props.markers

    //animation is set for each marker
    for(var i=0; i<markers.length; i++) {
      if(venue.venue.id===markers[i].id) {
        markers[i].setAnimation(window.google.maps.Animation.BOUNCE)
        var a=markers[i]
        this.setTimeForAnime(a) //this function will stop the animation of the markers

      //the infowindow will be displayed once the item in the list is clicked
        window.infowindows.setContent(`
          <p className="title3">
          Name: ${markers[i].title}
          </p>
          <p>Address: ${markers[i].address}</p>`)
        window.infowindows.open(window.globalMap,markers[i])
      }
    }
  }

//its a function to update the query
  updateQuery= (query) => {
    this.setState({query:query.trim()})
  }


  render() {
    let showingList
    let markers=this.props.markers
    if(this.state.query) {
      const matchQuery= new RegExp(escapeRegExp(this.state.query),'i')

      //the list is filtered when it matches the query
      showingList= this.props.list.filter((venue) => matchQuery.test(venue.venue.name) )

      //when the query update then the all markers will be hidden initially
      for(var i=0;i<markers.length;i++){
        markers[i].setMap(null)
      }

      //then the markers will be filtered according to the filtered list
      for(var i=0;i<showingList.length;i++) {
        for(var j=0;j<markers.length;j++) {
          if(showingList[i].venue.id===markers[j].id){
            markers[j].setMap(window.globalMap)
          }
        }
      }

    } else {
      showingList= this.props.list
      for(var i=0;i<markers.length;i++) {
        markers[i].setMap(window.globalMap)
      }
    }

    return(
      <div id='canvas'>
        <h2>Locations</h2>
        <p>used FOURSQUARE api to get venues</p>

        <input
          className='searchList'
          type='text'
          placeholder='search list'
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}/>
        <h3>Coffee shops</h3>
        <ul className= 'list' aria-label= 'list of venues'>
          {showingList.map(venue => {
            return(
              <li className='item' key={venue.venue.id} onKeyPress={()=> this.clickList(venue)} tabIndex='0' role='button' >
                <p  className='title2' onClick={() => this.clickList(venue)} role='button' >
                  {venue.venue.name}
                </p>
              </li>
            )
          })}
          </ul>
      </div>
    )
  }
}
export default Canvas;
