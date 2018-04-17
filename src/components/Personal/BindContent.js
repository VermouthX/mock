import React from 'react';
import PropTypes from "prop-types";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class BindContent extends React.Component{
	state = {
    	confirmDirty: false,
    	autoCompleteResult: [],
  	};
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const form = this.props.form;
        this.props.getTele(form.getFieldValue('phone'));
        this.props.hideModal();
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
	render(){
		const { getFieldDecorator } = this.props.form;
    	const { autoCompleteResult } = this.state;
    	const formItemLayout = {
      		labelCol: {
       		 xs: { span: 12 },
       		 sm: { span: 6 },
      		},
      		wrapperCol: {
       		 xs: { span: 24},
       		 sm: { span: 16 },
      		},
    		};
    		const tailFormItemLayout = {
      			wrapperCol: {
        			xs: {
          				span: 24,
          				offset: 0,
        			},
        			sm: {
          				span: 16,
          				offset: 8,
        			},
      			},
    		};
		return(
			<Form onSubmit={this.handleSubmit}>
				<FormItem
          			{...formItemLayout}
          			label="手机"
        		>
          			{getFieldDecorator('phone', {
            		rules: [{ required: true,len:11, message: '请输入你的手机号（11位数字）！' }],
          		})(
            	<Input style={{ width: '100%' }} />
          		)}
        		</FormItem>
        		<FormItem
          			{...formItemLayout}
          			label="密码"
        		>
          		{getFieldDecorator('password', {
            	rules: [{
              	required: true, message: '请输入你的密码！',
            	}, {
             	 validator: this.validatePassword,
           		 }],
          		})(
            	<Input type="password" />
          		)}
        		</FormItem>
        		<FormItem {...tailFormItemLayout}>
          			<Button type="primary" htmlType="submit">确定</Button>
        		</FormItem>
        	</Form>
		);
	}
}
BindContent.contextTypes = {
  router:PropTypes.object.isRequired
};
BindContent = Form.create()(BindContent);
export default BindContent;