import React, { Component } from 'react';

class Header extends Component {



//function which call when the hamburger button is clicked or 'enter' key is pressed
  clickHam = (id) => {
    var ham= document.querySelector(id)
    if(ham.style.display==='none')
    ham.style.display='block'
    else{
      ham.style.display='none'
    }

  }



  render() {

    return(
      <div className='header'>
        <div
          className="hamButton"
          onClick={() => this.clickHam('#canvas')}
          tabIndex='0'
          aria-label='open list button'
          role='button'
          onKeyPress={() => this.clickHam('#canvas')}>
          {/*hamburger button*/}
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>


        <div className='title'>
          <h1 tabIndex='0'>NEIGHBORHOOD MAP</h1>
        </div>

      </div>

    )
  }
}

export default Header;
