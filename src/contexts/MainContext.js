import React, {Component} from 'react';
import User from '../User';
import Geocode from "react-geocode";
const MainContext = React.createContext();
export default MainContext;
export class MainProvider extends Component{
    constructor() {
        super();
        this.state = {
            markers: [],
            initialCenter:{},
        }
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
    async deleteMarker(marker){
        if(confirm('Delete the item?')) {
            if(!marker.add){

                await fetch(`api/users/${User}/markers/${marker._id}`, {method: 'delete'});
            }
            this.state.markers.splice(this.state.markers.indexOf(marker),1);
            this.setState({markers: this.state.markers});
        }
    }

    async handleKeyPress(e){
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            const name= e.target.value;
            // this.props.navigate('{"lat":40.831828, "lng":44.279788 }',e.target.value);
            Geocode.setApiKey('AIzaSyBMyBsg8bKUJAC3xt_dXg5E30X9tR-vUn4');
            Geocode.enableDebug();

            const response = await Geocode.fromAddress(name);
            const { lat, lng } = response.results[0].geometry.location;
            this.navigate(JSON.stringify({ "lat":lat, "lng": lng }),name);
            //     .then(
            //     response => {
            //         const { lat, lng } = response.results[0].geometry.location;
            //         self.props.navigate({ lat, lng },e.target.value);
            //
            //     },
            //     error => {
            //         // this.props.navigate({ lat: 40.807400, lng:  44.497028 });
            //         console.log("limited",error);
            //     }
            // );

        }
    }


    async visited(marker){
        const response = await fetch( `/api/users/${User}/markers/${marker._id}`, {
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
    render() {
        const func = {
            addMarker:this.addMarker.bind(this),
            navigate:this.navigate.bind(this),
            deleteMarker:this.deleteMarker.bind(this),
            visited:this.visited.bind(this),
            handleKeyPress:this.handleKeyPress.bind(this)
        };
        return (
            <MainContext.Provider value={{state:this.state,func}}>
                {this.props.children}
            </MainContext.Provider>

        )
    }
}

