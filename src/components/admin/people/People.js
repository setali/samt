import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Person from './person/Person';
import PersonForm from './person/PersonForm';
import PersonEditForm from './person/PersonEditForm';

class People extends Component {

    render() {
        return (
            <div className="people">
                <Route exact path="/admin/people/" component={Person}/>
                <Route exact path="/admin/people/create" component={PersonForm}/>
                <Route exact path="/admin/people/:person_id/edit" component={PersonEditForm}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(People);