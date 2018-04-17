import React from 'react';
import { Card, Col, Row,Button,Tabs,List,Icon} from 'antd';

class Showmovie extends React.Component{
	constructor(props){
    	super(props);
    	this.state={
    		num:this.props.data.length
    	}
    	this.props.getNum(this.state.num);
	}
	render(){
		if(this.props.choice){
			return <div style={{paddingTop:'10px',paddingLeft:'30px'}}>
						<List 
							grid={{column:4}}
							dataSource={this.props.data}
							renderItem={item=>(
								<List.Item>
									<Row>
										<Col span={12}>
											<img src={item.poster} style={{height:'180px',width:'130px'}}/>
										</Col>
										<Col>
											<div style={{paddingTop:'30px'}}>
												<p style={{fontSize:'18px'}}>{item.name}</p>
													<p>评分：{item.score}</p>
													<p>{item.time}-{item.kind}</p>
													<Button type="primary">选座购票</Button>
											</div>
										</Col>
									</Row>
								</List.Item>	
							)}
						/>
					</div>;
		}else{
			return <div></div>;
		}
	}
}
export default Showmovie;