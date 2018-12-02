import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import People from './people/People';

class Admin extends Component {

    render() {
        return (
            <div className="admin">
                <Route path="/admin/people" render={(props) => <People {...props}/>}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);