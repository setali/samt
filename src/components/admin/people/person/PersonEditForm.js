import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Form, Button, Input, message, Tooltip, Icon, Checkbox, Radio} from 'antd';
import {createPerson, getPerson} from '../../../../redux/actions/person'
import {getRolesOptions, getAuthenticatedId} from './PersonForm';
import Loading from "../../../utils/Loading";

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };

        this.props.getPerson(this.props.match.params.person_id);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values._id = this.props.person._id;
                this.props.update(values);
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

        if (_.isEmpty(this.props.person)) {
            return <Loading/>;
        }

        if (this.props.success) {
            message.success('کاربر با موفقیت بروز شد.')
        }

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };

        return (
            <div className="person-form">
                <h2>
                    ویرایش کاربر
                </h2>
                <Form className="has-background-form" onSubmit={this.handleSubmit}>
                    <div className="form-item-wrapper">
                        <FormItem
                            {...formItemLayout}
                            label="ایمیل"
                            hasFeedback
                        >
                            {getFieldDecorator('email', {
                                initialValue: this.props.person.email,
                                rules: [{
                                    type: 'email', message: 'ورودی معتبر نمی باشد!',
                                }, {
                                    required: true, message: 'لطفا ایمیل را وارد کنید!',
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
                                rules: [ {
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
                                initialValue: this.props.person.name,
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
                                initialValue: this.props.person.phone,
                                rules: [{ required: true, message: 'لطفا شماره تلفن همراه را وارد کنید!' }],
                            })(
                                <Input prefix="+98" />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="نقش‌ها"
                            key="roles"
                            className="roles-form-item">
                            {
                                getFieldDecorator('roles', {
                                initialValue: [...this.props.person.roles, ...getAuthenticatedId(this.props.roles)],
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
                                initialValue: this.props.person.status,
                            })(
                                <RadioGroup>
                                    <RadioButton value={1}>فعال</RadioButton>
                                    <RadioButton value={0}>غیرفعال</RadioButton>
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
        hasError: state.createPersonHasError,
        isLoading: state.createPersonIsLoading,
        success: state.createPersonSuccess,
        roles: state.roles,
        person: state.person
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (data) => dispatch(createPerson(data, 'PUT')),
        getPerson: (data) => dispatch(getPerson(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);
