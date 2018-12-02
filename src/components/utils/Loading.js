import React, {Component} from 'react';
import {Spin} from 'antd';

class Loading extends Component {

    render() {
        return super.render(
            <Spin/>
        );
    }
}

export default Loading;
