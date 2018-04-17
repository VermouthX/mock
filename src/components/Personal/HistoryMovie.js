import React from 'react';
import {Table, Avatar} from 'antd';
import { Pagination } from 'antd';
import Comment from './Comment';
import styles from './HistoryMovie.css';
const { Column, ColumnGroup } = Table;

const listData=[];
var cnt=0;
for(let i=0;i<5;i++){
	cnt++;
	listData.push({
		title:`怦然心动`,
		avatar:require('../../assets/prxd.jpg'),
		date:'2017-11-25 11:25 ',
		cinema:'地中海影城',
		content:'人性的美具有纷繁的多面性，无论是男女之爱还是亲人之情，所有的美都会令人向往和感动。爱情是花，就好像朱莉第一次看见布莱斯闪亮的眼睛，便怦然心动，乱花渐欲迷人眼，自此深陷其中，再也看不见其他人。爱情是树，就好像布莱斯一直觉得朱莉只是一个平凡的甚至有些惹人讨厌的女孩，她就像一棵不起眼的小树。 爱情是树不是花。',
	});
}
const pagination={
	pageSize:3,
	total:listData.length,
	onChange: (() => {}),
};
class HistoryMovie extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Table pagination={pagination} dataSource={listData} style={{background:'white'}}>
				<Column 
					dataIndex="avatar"
					render={(text,record)=>(
						<div style={{padding:'10px 20px'}}>
							<img width={150} height={220} alt="" src={record.avatar} />
						</div>						
					)}
				/>
				<Column 
					render={(text,record)=>(
						<div style={{paddingRight:'100px'}}>
							<div className={styles.lay}>
				  				<div className={styles.setAss}>
				  					<h2>{record.title}</h2>
				  					<h4><Comment/></h4>
				  				</div>	
				  				<div>观影时间：{record.date}</div>
				  				<div>观影地点：{record.cinema}</div>
				  				<div className={styles.setPos}>影片介绍：{record.content}</div>
				  			</div>
						</div>
					)}
				/>				
		    </Table>
		);
	}
}

export default HistoryMovie;