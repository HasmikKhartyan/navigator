import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import {MainProvider} from './contexts/MainContext';

if (document.getElementById('map_container')) {
    ReactDOM.render(
        <MainProvider>
            <Main  />
        </MainProvider>
        , document.getElementById('map_container'));
}
