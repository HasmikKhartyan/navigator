import React, { Component } from 'react';
import {SearchBar} from './SearchBar';
import User from './User';
class MarkerRow extends Component {
    show(){
        this.props.navigate(JSON.parse(this.props.marker.position));
    }
    render() {
            if(this.props.marker == null){
                return null;
            } else{
                return (
                    <tr>
                        <td >{this.props.marker.name}</td>
                        <td >
                            <button  onClick={()=>this.props.deleteMarker(this.props.marker)} className="btn btn-danger">delete</button>
                            <button onClick={this.show.bind(this)} className="btn btn-primary">show</button>
                            {this.props.marker.add ? <button onClick={()=>this.props.addMarker(this.props.marker)} className="btn btn-primary">save</button> :
                                <button onClick={()=>this.props.visited(this.props.marker)} className="btn btn-primary">{this.props.marker.visited ? 'unvisit':'visit'}</button>}

                        </td>
                    </tr>

                );
            }
    }
}
class MarkerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers:this.props.markers
        };
    }
    render() {
        this.state.markers = this.props.markers;
        var rows = [];
        this.state.markers.map((marker) => {
            if (marker.name.indexOf(this.props.filterText) === -1)
            {
                return;
            }
            rows.push(<MarkerRow key={marker['_id']} marker={marker} navigate={this.props.navigate}
            addMarker={this.props.addMarker} deleteMarker={this.props.deleteMarker}
                                 visited={this.props.visited} />);
        });
        return (
            <table className='table table-hover'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

export class FilterableMarkerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
        };
    }
    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }
    render() {
        return (
            <div className="marker_content">
                <SearchBar
                    onFilterTextInput={this.handleFilterTextInput.bind(this)}
                    navigate = {this.props.navigate}
                />
                <MarkerTable
                    markers={this.props.markers}
                    filterText={this.state.filterText}
                    navigate = {this.props.navigate}
                    addMarker={this.props.addMarker} deleteMarker={this.props.deleteMarker}
                    visited={this.props.visited}
                />
            </div>
        );
    }
}
