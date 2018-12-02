import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCardex} from "../redux/actions/cardex";
import {Table, Icon} from 'antd';
import {filterColumn, query, getPaginationData} from "../tools/Table";
import cardex from '../cardex.json'

class Cardex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRows: []
        };

        this.props.getCardex();
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props.getCardex({ ...query(pagination, filters, sorter)});
    };

    render() {

        const columns = [ {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'lastname',
            dataIndex: 'creator.lastname',
            key: 'creator.lastname',
        }];

        return (
            <div className="cardex-list">

                <Table dataSource={cardex.data}
                       columns={columns}
                       // loading={this.props.isLoading}
                       rowKey="id"
                       // pagination={getPaginationData(this.props.cardex)}
                       onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cardex: state.cardex,
        isLoading: state.cardexIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCardex: (data) => dispatch(getCardex(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardex);