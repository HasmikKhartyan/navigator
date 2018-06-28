import React, { Component } from 'react';
import {Map,  InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MainContext from './contexts/MainContext';
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
    renderMarkers(context){
        var markers = [];
        context.state.markers.map((marker) => {
            markers.push(<Marker onClick = { this.onMarkerClick } key={marker._id}
                                 name = { marker.name }
                                 position = {JSON.parse(marker.position)}
                                 icon= {marker.add ? 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ddd' :
                                     !marker.visited ? 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|51e25d':''
                                 }
            />);
        });
        return markers;
    }
    render() {
        return (
            <MainContext.Consumer>
                {
                    (contaxt)=>(
                    <Map google={this.props.google} className="map_content"
                         onScroll={'true'}
                         onScrollPassive={'true'}
                         zoom={ this.props.zoom }
                         style={ this.config.style }
                         initialCenter={ contaxt.state.initialCenter }
                         center={ contaxt.state.initialCenter}>

                        {this.renderMarkers(contaxt)}

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
            </MainContext.Consumer>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBMyBsg8bKUJAC3xt_dXg5E30X9tR-vUn4',
})(MapContainer)