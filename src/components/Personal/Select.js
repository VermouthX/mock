import React from 'react';
import Setting from './Setting';
import Account from './Account';
import Password from './Password';
import AccountBind from './AccountBind';
import HistoryMovie from './HistoryMovie';

class Select extends React.Component{
	constructor(props){
		super(props);
	}
	setChange=(val,e)=>{
		this.props.onChange(val,e);
	}
	render(){
		if(this.props.pid==="1"||this.props.pid==="11"){
			return <Setting handleC={this.setChange} url={this.props.url} text={this.props.text}/>;
		}else if(this.props.pid==="12"){
			return <AccountBind telenumber={this.props.telenumber} mail={this.props.mail} password={this.props.password} getTele={this.props.getTele}/>;
		}else if(this.props.pid==="13"){
			return <Password password={this.props.password} getPW={this.props.getPW}/>;
		}else if(this.props.pid==="2"){
			return <Account/>;
		}else{
			return <HistoryMovie />;
		}
	}
}

export default Select;