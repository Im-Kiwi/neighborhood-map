import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import Canvas from './Canvas.js'

class App extends Component {

  state= {
    locations:[], //this is the empty array for the locations
    markers:[],   // this empty array is for the markers of the locations
    novenues:false
  }

// script tag is created
  createMapScript= (apikey) => {
    const script= document.createElement('script')
    script.src= `https://maps.googleapis.com/maps/api/js?key=${apikey}&callback=initMap`
    script.async= true
    script.defer= true
    script.onerror=this.errorMap
    return script
  }

  //if map fails to load then this function will call
  errorMap= () => {
      const noMapDisplay= document.createElement('p')
      noMapDisplay.textContent="Sorry the map is not displaying currently, check the internet connection"
      var mapContainer= document.querySelector('#map')
      mapContainer.appendChild(noMapDisplay)

  }

//script tag is added inside the body element
  addMapScript= () => {
    const newScript= this.createMapScript('AIzaSyDKaP4ko84Dh2hzuBC6cqgmvXS-Y3p7P3U')
    const existingChild= document.getElementsByTagName('script')[0]
    existingChild.parentNode.insertBefore(newScript, existingChild)

  }

//function for displaying the map
  displayMap= () => {
    this.addMapScript()
    window.initMap= this.initMap
  }

// it will called immediately after the components is inserted into the DOM
  componentDidMount() {
    this.fetchUrl()
  }

//here the map is created
  initMap=()=> {
    var map=new window.google.maps.Map(document.getElementById('map'),
        {
          center:{lat:40.741359, lng: -73.9980244},
          zoom:12
        }
      );
      window.globalMap=map
      this.createMarkers(this.state.locations)
  }


// this is the function for creating markers
  createMarkers= (location) => {
    var markers= []
    var locations=location
    var infowindow=new window.google.maps.InfoWindow()
      window.infowindows=infowindow   //converting the variable 'infowindow' frpm local variable to global variable
      for (var i=0;i<locations.length;i++) {
        var marker = new window.google.maps.Marker({
          position: {lat:locations[i].venue.location.lat, lng:locations[i].venue.location.lng},
          map: window.globalMap,
          title:locations[i].venue.name,
          id:locations[i].venue.id,
          animation: window.google.maps.Animation.DROP,
          address:locations[i].venue.location.address
        });
        markers.push(marker)  //pushing each marker in markers array
      }



      //here infowindow will appear on clicking the marker
    markers.forEach(function(marker) {
      marker.addListener('click',function() {
        infowindow.setContent(`<div>
          <p className="title3">
          Name: ${marker.title}
          </p>
          <p>Address: ${marker.address}</p>
          </div>`)
        infowindow.open(window.globalMap,marker)
      })
    })

    this.setState({   //the state of markers are updated
      markers:markers
    })
  }

 //its a funtion to fetch the venues from a third party API called foursquare
  fetchUrl= () => {
    var grab= {
      query:'coffee',
      near:'New York',
      limit:5,
      client_id:'MAFQKCVA1MGSKQXN1N1E1CHL3AAJGVY2SSOCH0Z5LZQBZA4A',
      client_secret:'EUE2CB2Z1JCONJKGYLTNZ3SP3MH5HCPPUFPKVDDI4TTGKLBA',
      v:'20180512'
    }
    var url= new URL('https://api.foursquare.com/v2/venues/explore?')
    var params= new URLSearchParams(grab)
    var completeUrl= url+params
    fetch(completeUrl)
    .then(response => response.json())
    .then(output => {
        this.setState({
          locations:output.response.groups[0].items,
          novenues:true

        })

        this.displayMap()
      }).catch(() => {
        var list= document.querySelector('.title2')
        var novenues= document.createElement('p')
        novenues.textContent='sorry! unable to fetch the list'
        var canvas= document.querySelector('#canvas')
        canvas.appendChild(novenues)
        console.log(novenues)
        this.displayMap()

      })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Canvas
          list={this.state.locations}
          markers={this.state.markers}
          createMarkers={this.createMarkers} />
        <div id='map' tabIndex='0' aria-label='google map' role= 'application'>

        </div>
      </div>
    );
  }
}


export default App;
