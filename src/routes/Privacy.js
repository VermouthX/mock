import React from 'react';
import { Layout, Menu,Icon} from 'antd';
import HomeLayout from '../components/Header/HomeLayout';
import Select from '../components/Personal/Select';
import styles from './Privacy.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content,Sider} = Layout;

class Privacy extends React.Component {
	constructor(props){
    super(props);
    this.state={
    	pid:1,
    	PUrl:require('../assets/2.jpg'),
    	Ptext:'Osmanthus',
    	Ptelenumber:'15888888888',
    	Pmail:'1888888888@qq.com',
    	Ppassword:'11111111'
    }
  }
  getTele=(e)=>{
  	this.setState({
      Ptelenumber:e
    });
  }
  getPW=(e)=>{
  	this.state.Ppassword=e;
  }
  handleChange=(val,va)=>{
  	this.setState({
  		PUrl:val
  	});
  	if(va!==""){
  		//this.state.PUrl=val;
  		this.state.Ptext=va;
  	}  
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      pid: e.key,
    });
  }
	render(){
		return(
			<HomeLayout>
				<Layout>
					<Sider width={240} style={{background:'#fff'}} className={styles.sider}>
						<div className={styles.setPos}>
							<img alt=" " src={this.state.PUrl} className={styles.setCircle}/>
						</div>
						<Menu onClick={this.handleClick} mode="inline" style={{height: '100%', borderRight: 0}}>
							<SubMenu key="1" title={<span><Icon type="setting" className={styles.list}/>账号设置</span>}>
								<Menu.Item key="11"><div style={{paddingLeft:'50px'}}>账号信息</div></Menu.Item>
								<Menu.Item key="12"><div style={{paddingLeft:'50px'}}>账号绑定</div></Menu.Item>
								<Menu.Item key="13"><div style={{paddingLeft:'50px'}}>修改密码</div></Menu.Item>
							</SubMenu>				
							<Menu.Item key="2"><Icon type="wallet"className={styles.list}/>我的账户</Menu.Item>
							<Menu.Item key="3" ><Icon type="barcode" className={styles.list}/>我看过的电影</Menu.Item>
						</Menu>
					</Sider>
					<Layout style={{padding: '40px'}}>
						<Content style={{background: '#fff', padding:24, margin:0, minHeight:480}}>
						<Select pid={this.state.pid} onChange={this.handleChange} url={this.state.PUrl} text={this.state.Ptext} telenumber={this.state.Ptelenumber} mail={this.state.Pmail} password={this.state.Ppassword} getPW={this.getPW} getTele={this.getTele}/>
						</Content>
					</Layout>
				</Layout>
			</HomeLayout>
		);
	}
}

Privacy.propTypes = {
};

export default Privacy;