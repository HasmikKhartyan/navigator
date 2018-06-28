import React, { Component, Fragment} from 'react';
import GoogleApiWrapper from './GoogleMaps';
import {FilterableMarkerTable} from './Marker';

const  Main = () => (
    <Fragment>
        <GoogleApiWrapper  className="map"   />
        <FilterableMarkerTable  className="marker_content"/>
    </Fragment>

);
export default Main;

