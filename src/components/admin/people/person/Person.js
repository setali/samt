import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPersons, deletePersons} from "../../../../redux/actions/person";
import {Table, Icon} from 'antd';
import DeleteIcon from "../../../utils/DeleteIcon";
import {filterColumn, query, getPaginationData} from "../../../../tools/Table";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRows: []
        };

        this.props.getPersons();
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props.getPersons({ ...query(pagination, filters, sorter)});
    };

    render() {

        const columns = [ {
            title: 'نام',
            dataIndex: 'username',
            key: 'username',
            sorter: true,
            // ...filterColumn,
        }, {
            title: 'ایمیل',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
            // ...filterColumn,
        }, {
            title: ' ',
            key: 'action',
            render: (text, record) => (
                <div className="actions">
                    <Link to={"/admin/people/" + record._id + "/edit"} className="action"><Icon type="edit"/></Link>
                    <DeleteIcon onConfirm={() => this.props.delete([record._id])}
                                icon={this.props.deleteIdsLoading.includes(record._id) ? "loading" : "delete"}/>
                </div>
            ),
        }];

        return (
            <div className="person-list">

                <Table dataSource={this.props.persons.results}
                       columns={columns}
                       loading={this.props.isLoading}
                       rowKey="name"
                       pagination={getPaginationData(this.props.persons)}
                       onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons,
        isLoading: state.personsIsLoading,
        deleteIdsLoading: state.deletePersonIdsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPersons: (data) => dispatch(getPersons(data)),
        delete: (ids) => dispatch(deletePersons(ids)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);