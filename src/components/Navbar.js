import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Navbar extends Component {
  render() {
    return (
        <div style={{display : 'flex', padding : '0.5rem'}}>
          {/* Link has advantage : 1 it doesnt refresh the page , <a does so our state of components are saved */}
            <Link to='/' style={{textDecoration : 'none'}}><h1 style={{marginTop : '1rem' , marginLeft : '1rem'}}>Movies App</h1></Link>
            <Link to='/favourites' style={{textDecoration : 'none'}}><h2 style={{marginTop : '1.5rem' , marginLeft : '2rem'}}>Favourites</h2></Link>
            {/* <h1>Movies App</h1> */}
            {/* <h2 style={{marginLeft : '2rem' , marginTop : '1.5rem'}}>Favourites</h2> */}
        </div>
    )
  }
}

export default Navbar