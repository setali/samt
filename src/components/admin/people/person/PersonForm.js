import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Input, message, Tooltip, Icon, Checkbox, Radio} from 'antd';
import {createPerson} from '../../../../redux/actions/person'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export function getRolesOptions(roles) {
    let result = [];
    roles.forEach(function (el, i) {
        if (el.name !== 'anonymous') {
            if (el.name === 'authenticated') {
                result.push({label: el.title, value: el._id, disabled: true})
            }
            else {
                result.push({label: el.title, value: el._id})
            }
        }
    });

    return result;
}

export function getAuthenticatedId(roles) {
    let i = roles.find(el => {return el.name === 'authenticated'});
    if (i) return [i._id];
    return [];
}

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            authenticated_id: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.create(values);
                this.handleReset();
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('رمز های وارد شده یکسان نمی باشند!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {

        if (this.props.success) {
            message.success('رکورد با موفقیت ساخته شد.')
        }

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };

        return (
            <div className="person-form">
                <h2>
                    ساخت کاربر جدید
                </h2>
                <Form className="has-background-form" onSubmit={this.handleSubmit}>
                    <div className="form-item-wrapper">
                        <FormItem
                            {...formItemLayout}
                            label="ایمیل"
                            hasFeedback
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'ورودی معتبر نمی باشد!',
                                }, {
                                    required: true, message: 'لطفا ایمیل خود را وارد کنید!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="رمز عبور"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'لطفا رمز عبور مورد نظرتان را وارد کنید!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="تایید رمز عبور"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'رمز عبور را دوباره وارد کنید!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(<span>نام مستعار&nbsp;
                                    <Tooltip title="این نام به دیگران نشان داده خواهد شد.">
                                            <Icon type="question-circle-o" />
                                        </Tooltip></span>
                            )}
                            hasFeedback
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'لطفا نام مستعار مورد نظرتان را وارد کنید!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="شماره همراه"
                            className="phone-number has-prefix left-align"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'لطفا شماره تلفن همراهتان را وارد کنید!' }],
                            })(
                                <Input prefix="+98" />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="نقش‌ها"
                            key="roles"
                            className="roles-form-item">
                            {getFieldDecorator('roles', {
                                initialValue: getAuthenticatedId(this.props.roles),
                            })(
                                <CheckboxGroup options={getRolesOptions(this.props.roles)}/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="وضعیت"
                            key="status"
                            className="status-form-item">
                            {getFieldDecorator('status', {
                                initialValue: '1',
                            })(
                                <RadioGroup>
                                    <RadioButton value="1">فعال</RadioButton>
                                    <RadioButton value="0">غیرفعال</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>


                        <FormItem>
                            <Button type="primary" htmlType="submit" loading={this.props.isLoading}
                                    disabled={this.props.isLoading}>
                                ثبت
                            </Button>
                        </FormItem>

                    </div>
                </Form>
            </div>
        );
    }
}

const PersonForm = Form.create()(Person);


const mapStateToProps = (state) => {
    return {
        isLoading: state.createPersonIsLoading,
        success: state.createPersonSuccess,
        roles: state.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: (data) => dispatch(createPerson(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);
