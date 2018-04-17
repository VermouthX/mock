import React from 'react';
import { Card, Col, Row,Button,Tabs,List,Icon} from 'antd';
import HomeLayout from '../components/Header/HomeLayout';
import SearchInput from '../components/Movie/SearchInput';
import ShowMovie from '../components/Movie/ShowMovie';
import styles from './Movie.css';
const TabPane = Tabs.TabPane;
const { Meta } = Card;

const listData=[];
let mlist=[];
listData.push({
	src:require('../assets/thwj.jpg'),
	title:"头号玩家",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/prxd.jpg'),
	title:"怦然心动",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/cs.jpg'),
	title:"城市之光",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/jy.jpg'),
	title:"解忧杂货店",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/qr.jpg'),
	title:"前任三",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/thwj.jpg'),
	title:"头号玩家",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/prxd.jpg'),
	title:"怦然心动",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/cs.jpg'),
	title:"城市之光",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/jy.jpg'),
	title:"解忧杂货店",
	date:"四月二十号即将上映"
});
listData.push({
	src:require('../assets/qr.jpg'),
	title:"前任三",
	date:"四月二十号即将上映"
});
class Movie extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	data:[],
    	list:[],
    	mainMovie:[],
    	Wnum:listData.length,
    	value:"更多",
    	choice:false,
    	icon:"down-circle"
    }
  }
  onClick=()=>{
  	if(this.state.choice){
  		this.setState({
  			value:"更多",
    		choice:false,
    		icon:"down-circle"
  		});
  	}else{
  		this.setState({
  			value:"收起",
  			choice:true,
  			icon:"up-circle"  			
  		});
  	}
  }
  getMovieList(){
  	fetch('http://localhost:3000/movieshow')
      .then(res => res.json())
      .then(res => {
        this.setState({
         data: res
        });
        mlist.push(this.state.data[0]);
        let moviedata=[];
    	for(let i=1;i<=6;i++){
    		moviedata.push(this.state.data[i]);
    	}
    	this.setState({
    		movielist:moviedata
   		}); 
   		let getlist=[];
   		for(let i=7;i<this.state.data.length;i++){
   			getlist.push(this.state.data[i]);
   		}
   		this.setState({
    		list:getlist
   		});
    });
  }
  componentWillMount(){
    this.getMovieList();
    
    console.log(this.state.movielist)
  }
  getNum=(e)=>{
  	this.state.Znum+=e;
  }
	render(){
		let listButton= listData.map(i=>
			<TabPane tab={
				<Card style={{ width: 180,height:350 }} cover={<img alt="" src={i.src} className={styles.img}/>}>
					<Meta title={i.title} description={i.date}/>
				</Card>}
			/>
		);
		let mainButton=mlist.map(i=>
			<div>
			<img src={i.poster} style={{height:'350px',width:'250px'}}/>
				<div className={styles.setFlex}>
					<div style={{fontWeight:'600',fontSize:'18px'}}>{i.name}</div>								
					<div>评分：{i.score}</div>
				</div>
				<div className={styles.setFlex}>
					<div style={{fontSize:'16px',paddingTop:'10px'}}>{i.time}-{i.kind}</div>
					<Button type="primary">选座购票</Button>
				</div>	
			</div>
		);
		return(
			<HomeLayout>
				<div style={{padding:'30px 60px'}}>
					<div style={{background:'white',paddingBottom:'30px'}}>
						<div className={styles.setHead}>
							<h3 className={styles.setTitle}>正在热映{this.state.data.length}部</h3>
							<SearchInput placeholder="请输入影片名称" style={{ width: 250 ,paddingTop:'30px' }} />
						</div>
						<div style={{paddingLeft:'30px',paddingRight:'15px'}}>
							<Row>
								<Col span={6}>
								{mainButton}								
								</Col>
								<div style={{paddingTop:'10px'}}>
									<List 
										grid={{column:4}}
										dataSource={this.state.movielist}
										renderItem={item=>(
											<List.Item>
												<Row>
													<Col span={12}>
														<img src={item.poster} style={{height:'180px',width:'130px'}}/>
													</Col>
													<Col>
														<div style={{paddingTop:'30px',paddingLeft:'-2%'}}>
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
								</div>
							</Row>
						</div>
						<ShowMovie choice={this.state.choice} getNum={this.getNum} data={this.state.list}/>
						<div style={{textAlign:'center',paddingTop:'20px'}}>
							<div onClick={this.onClick} style={{fontSize:'20px'}}><Icon type={this.state.icon} style={{color:'#1E90FF'}}/>{this.state.value}</div>
						</div>
					</div>
				</div>
				<div style={{padding:'20px 60px'}}>
					<div className={styles.will}>
						<div className={styles.setHead}>
							<h3 className={styles.setTitle}>即将上映{this.state.Wnum}部</h3>
						</div>
						<Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 400 }}>
							{listButton}
						</Tabs>
					</div>
				</div>
			</HomeLayout>
		);
	}
}

Movie.propTypes = {

};

export default Movie;