import React, { Component } from 'react';
import {Map,  InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.config = {zoom:10,
            style :{
                width: '70%',
                height: '75vh',
                'marginLeft':'28%',
                'marginTop':'-35px',
            },
            apiKey:'AIzaSyBMyBsg8bKUJAC3xt_dXg5E30X9tR-vUn4'
        };
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            initialCenter:props.initialCenter
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick (props, marker, e)  {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }

    render() {
        var markers = [];
        this.props.markers.map((marker) => {

            markers.push(<Marker onClick = { this.onMarkerClick } key={marker.id}
                                 name = { marker.name }
                                 position = {JSON.parse(marker.position)}
                                 icon= {marker.add ? 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ddd' :
                                 !marker.visited ? 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|51e25d':''
}
                                 />);
        });

        return (
            <Map google={this.props.google} className="map_content"
                 onScroll={'true'}
                 onScrollPassive={'true'}
                 zoom = { this.props.zoom }
                 style = { this.config.style }
                 initialCenter = { this.props.initialCenter }
                 center={this.props.initialCenter}>

                {markers}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBMyBsg8bKUJAC3xt_dXg5E30X9tR-vUn4',
})(MapContainer)