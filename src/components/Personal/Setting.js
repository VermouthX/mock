import React from 'react';
import {Button,message} from 'antd';
import UploadAvatar from './UploadAvatar.js';
import styles from './Setting.css';

class Setting extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	url:this.props.url,
    	text:this.props.text,
    	record:''
    }
  }
	handleVal=(val)=>{
		if(this.state.url!==val){
			this.setState({
				url:val
			});		
		}
	}
	textChange=(event)=>{
		this.setState({
			record:event.target.value
		});
	}
	handleClick=()=>{
		this.state.text=this.state.record;
		this.props.handleC(this.state.url,this.state.text);
		message.success('保存成功！');
	}
	render(){
		return(
			<div className={styles.setPos}>
				<div className={styles.setAvatar}>
					<img alt=" " src={this.state.url} className={styles.setCircle}/>
					<span className={styles.change}><UploadAvatar handle={this.handleVal}/></span>
				</div>
				<div className={styles.setInput}>
					<span>昵称：</span>
					<input defaultValue={this.state.text} onChange={this.textChange} style={{width:350}}/>
				</div>
				<div className={styles.setButton}>
					<Button type="primary" onClick={this.handleClick} style={{width:100}}>保存</Button>
				</div>
			</div>
				
		);
	}
}
export default Setting;