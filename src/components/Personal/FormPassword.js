import React from 'react';
import PropTypes from "prop-types";
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class FormPassword extends React.Component{
state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const form = this.props.form;
        this.props.getPW(form.getFieldValue('password'));
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  validatePassword=(rule,value,callback)=>{
    const form=this.props.form;    
    if(value&&value!==this.props.pw){
      callback('原始密码不正确！');
    }
    callback();
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 6,
          offset: 0,
        },
        sm: {
          span: 6,
          offset: 8,
        },
      },
    };
	return (
      <Form onSubmit={this.handleSubmit} style={{padding:'60px'}} hideRequiredMark={true}>
        <FormItem
          {...formItemLayout}
          label="请输入原始密码"
        >
          {getFieldDecorator('pw', {
            rules: [{
              validator: this.validatePassword,
            }],
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请输入新密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,min:8, message: '请输入密码（至少8位）！',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请确认新密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码！',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
	}
}
FormPassword.contextTypes = {
  router:PropTypes.object.isRequired
};
FormPassword = Form.create()(FormPassword);
export default FormPassword;