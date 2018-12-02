import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Admin from './admin/Admin';
import Cardex from './Cardex';

class App extends Component {
    render() {
        return (
            <div className="App">
                ss
                <Cardex/>
                <Route name="admin" path="/admin" render={(props) => <Admin {...props} access="admin"/>}/>
            </div>
        );
    }
}

export default App;