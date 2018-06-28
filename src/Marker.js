import React, { Component } from 'react';
import {SearchBar} from './SearchBar';
import User from './User';
import MainContext from './contexts/MainContext';
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
    renderRows(contaxt){
        var rows = [];
        contaxt.state.markers.map((marker) => {
            if (marker.name.indexOf(this.props.filterText) === -1)
            {
                return;
            }
            rows.push(<MarkerRow key={marker['_id']} marker={marker} navigate={contaxt.func.navigate}
                                 addMarker={contaxt.func.addMarker} deleteMarker={contaxt.func.deleteMarker}
                                 visited={contaxt.func.visited} />);
        })
        return rows;
    }
    render() {
        return (
            <table className='table table-hover'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                <MainContext.Consumer>
                {(contaxt)=>this.renderRows(contaxt)}
                </MainContext.Consumer>
                </tbody>
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
                />
                <MarkerTable
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}
