import React, {Component} from 'react';
import {Form, Button, Upload, Icon} from 'antd';
import _ from 'lodash';
import {Url, getTokenObject} from '../../tools/Utils';
import {UPLOAD_PATH} from '../../tools/Constants';

const FormItem = Form.Item;

class File extends Component {

    normFile = e => Array.isArray(e) ? e : e && e.fileList;

    getFileObject(files) {
        if (!files) return [];
        let result = [];

        files.forEach((file, index) => {
            if (!file) return;

            let {_id, path, name} = file;
            let url = Url('/' + path);

            result.push({
                thumbUrl: url,
                response: _id,
                uid: index,
                url,
                name,
            })
        });

        return result;
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {operation, label, className, name, listType, accept, icon, required, required_message, count} = this.props;

        if (operation === 'edit') {

            // if (!this.props.image) return '';

            let default_image = this.getFileObject([this.props.image]);

            return (
                <FormItem
                    label={label}
                    className={className}>
                    {getFieldDecorator(name, {
                        valuePropName: name,
                        getValueFromEvent: this.normFile,
                        getValueFromLoad: this.normFile,
                        initialValue: default_image,
                        rules: [{required: required, message: required_message}],
                    })(
                        <Upload accept={accept} listType={listType} defaultFileList={default_image}
                                action={Url(UPLOAD_PATH)} headers={getTokenObject()}>
                            {_.size(getFieldValue(name)) < count ? <Button>
                                <Icon type={icon}/> بارگذاری
                            </Button> : ''}
                        </Upload>
                    )}
                </FormItem>)
        }

        return (
            <FormItem
                label={label}
                className={className}>
                {getFieldDecorator(name, {
                    valuePropName: name,
                    getValueFromEvent: this.normFile,
                    getValueFromLoad: this.normFile,
                    rules: [{required: required, message: required_message}],
                })(
                    <Upload accept={accept} listType={listType} action={Url(UPLOAD_PATH)} headers={getTokenObject()}>
                        {_.size(getFieldValue(name)) < this.props.count ? <Button>
                            <Icon type={icon}/> بارگذاری
                        </Button> : ''}
                    </Upload>
                )}
            </FormItem>
        );
    }
}

File.defaultProps = {
    operation: "create",
    label: "تصویر",
    className: "image-form-item",
    name: "image",
    listType: "picture",
    accept: "image/*",
    icon: "upload",
    required: true,
    required_message: "تصویر موردنظر را بارگذاری کنید!",
    count: 1,
};


export default File;