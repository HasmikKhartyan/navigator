import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleApiWrapper from './GoogleMaps';
import User from './User';

import {FilterableMarkerTable} from './Marker';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            markers: [],
            initialCenter:{},
        }
    }
    async deleteMarker(marker){
        if(confirm('Delete the item?')) {
            if(!marker.add){
                await fetch(`api/users/${User}/markers/{this.state.marker.id}`, {method: 'delete'});
            }
            this.state.markers.splice(this.state.markers.indexOf(marker),1);
            this.setState({markers: this.state.markers});
        }
    }
    async addMarker(marker){
        const response = await fetch( `/api/users/${User}/markers`, {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marker)

        });

        const data = await response.json();
        //data.pivot = {'visited':0};
        this.state.markers[this.state.markers.indexOf(marker)] = data ;
        this.setState({markers:this.state.markers});

    }
    navigate(initialCenter,name = false){
        this.setState({initialCenter:initialCenter});
        if(name){
            console.log("hasa",initialCenter);
            this.state.markers.push({name,position:initialCenter,add:true});
            this.setState({initialCenter:JSON.parse(initialCenter),markers:this.state.markers});
        }
    }

    async visited(marker){
        // console.log(`/api/users/${User}/markers/${marker.id}`);
        const response = await fetch( `/api/users/${User}/markers/${marker.id}`, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({visited:marker.visited == 1 ? 0 :1})

        });
        const ind = this.state.markers.indexOf(marker);
        console.log(marker,1);
        marker.visited = marker.visited ==1 ? 0 :1;
        this.state.markers[ind] = marker ;
        this.setState({markers:this.state.markers});

    }

    componentDidMount() {
        // const markers = [{name:'test1',position:{ lat: 40.177200, lng: 44.503490 },id:1},
        //     {name:'test2',position:{ lat: 40.807400, lng:  44.497028 },id:2}];
        //  this.setState({markers});

        fetch(`/api/users/${User}/markers`)
            .then(response => {
                //console.log(response);
                return response.json();
            })
            .then(markers => {
               // console.log(markers,9999999);
                // const visited =
                const initialCenter = JSON.parse(markers[0] ? markers[0].position : '{ "lat": 40.177200, "lng": 44.503490 }');
                //console.log(markers.visited);
                //console.log(initialCenter);
                this.setState({ markers ,initialCenter});
            });
    }
    render() {
        return (
            <div>
                <GoogleApiWrapper  className="map" markers ={this.state.markers} initialCenter = {this.state.initialCenter}  />
                <FilterableMarkerTable markers={this.state.markers} className="marker_content" navigate={this.navigate.bind(this)}
                                       addMarker={this.addMarker.bind(this)} deleteMarker={this.deleteMarker.bind(this)}
                                       visited={this.visited.bind(this)}/>
            </div>
        )
    }
}
if (document.getElementById('map_container')) {
    ReactDOM.render(<Main  />, document.getElementById('map_container'));
}
