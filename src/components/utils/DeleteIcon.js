import React, {Component} from 'react';
import {Popconfirm, Icon} from 'antd';

class DeleteIcon extends Component {

    render() {
        let {title, onConfirm, icon, okText, cancelText} = this.props;
        return (
            <Popconfirm title={title} onConfirm={onConfirm} okText={okText} cancelText={cancelText}>
                <Icon className="action" type={icon}/>
            </Popconfirm>
        );
    }
}

DeleteIcon.defaultProps = {
    title: "آیا از حذف این رکورد مطمئن هستید؟",
    icon: "delete",
    okText: "بله",
    cancelText: "لغو",
};

export default DeleteIcon;