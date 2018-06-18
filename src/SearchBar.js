import React, { Component } from 'react';
import Geocode from "react-geocode";

export class SearchBar extends Component {
    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
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
            this.props.navigate(JSON.stringify({ "lat":lat, "lng": lng }),name);
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

    render() {
        return (
            <form>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    onChange={this.handleFilterTextInputChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
            </form>
        );
    }
}
