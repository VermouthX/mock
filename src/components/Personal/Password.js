import React from 'react';
import FormPassword from './FormPassword';
import styles from './Setting.css';

class Password extends React.Component{
	render(){
		return(
			<div className={styles.setPos}>
				<FormPassword pw={this.props.password} getPW={this.props.getPW}/>
			</div>
		);
	}

}
export default Password;