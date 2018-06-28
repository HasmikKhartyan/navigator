import React, { Component } from 'react';

import MainContext from './contexts/MainContext';
export class SearchBar extends Component {
    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    render() {
        return (
            <form>
                <MainContext.Consumer>
                    {(contaxt)=>(
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search..."
                            onChange={this.handleFilterTextInputChange.bind(this)}
                            onKeyPress={contaxt.func.handleKeyPress}
                        />)
                    }
                </MainContext.Consumer>
            </form>
        );
    }
}
