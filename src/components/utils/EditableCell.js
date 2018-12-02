import React, {Component} from 'react';
import {Icon, Input} from 'antd';

const { TextArea } = Input;

class EditableCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };

    check = () => {
        this.setState({ editable: false });
        if (this.state.value === '') {
            this.props.onChange(this.props.value);
            this.setState({ value: this.props.value });
            return;
        }

        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };

    edit = () => {
        this.setState({ editable: true });
    };

    render() {
        const { value, editable } = this.state;
        let cell;

        switch (this.props.type) {
            case 'textarea':
                cell = <TextArea
                    value={value}
                    onChange={this.handleChange}
                />;
                break;

            default:
                cell = <Input
                    value={value}
                    onChange={this.handleChange}
                    onPressEnter={this.check}
                />;
        }

        return super.render(
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            {cell}
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default EditableCell;