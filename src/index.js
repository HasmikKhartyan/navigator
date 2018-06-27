import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';




// /        <Provider  >
//     <Main  />
// </Provider>

if (document.getElementById('map_container')) {
    ReactDOM.render(
        <Main  />
        , document.getElementById('map_container'));
}
