import React, { Component } from 'react';

import {NavLink} from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div >
        <NavLink to='/'>home</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </div>
    );
  }
}

export default Nav;
