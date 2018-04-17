import React from 'react';
import { Table,Button,Row,Col,Input,Popconfirm,Dropdown,Menu,message} from 'antd';
import SearchUser from './SearchUser';
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
class UserTable extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      user_list:[],
      selectedRowKeys: [],
      loading: false,
      kind:'昵称'
    };
    this.columns = [
  {
    title: '编号',
    dataIndex: 'id',
    width:'10%'
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    render:(text,record)=>this.renderColumns(text,record,'nickname')
  },{
    title: '密码',
    dataIndex: 'password',
    render:(text,record)=>this.renderColumns(text,record,'password')
  }, {
    title: '邮箱',
    dataIndex: 'email',
    render:(text,record)=>this.renderColumns(text,record,'email')
  },{
    title: '手机号',
    dataIndex: 'phone',
    render:(text,record)=>this.renderColumns(text,record,'phone')
  },{
    title:'操作',
    render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.id)}>保存</a>
                  <Popconfirm title="确定取消？" okText="确定" cancelText="取消" onConfirm={() => this.cancel(record.id)}>
                    <a style={{paddingLeft:'5px'}}>取消</a>
                  </Popconfirm>
                </span>
                : <Button type="primary" onClick={() => this.edit(record.id)}>编辑</Button>
            }
          </div>
        );
    }
  }
];
}
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.id, column)}
      />
    );
  }
  getUserList(){
    fetch('http://localhost:3000/user')
      .then(res => res.json())
      .then(res => {
        this.setState({
         user_list: res
        });
      });
  }
  componentWillMount(){
    this.getUserList();
  }
  handleChange(value, id, column) {
    const newData = [...this.state.user_list];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ user_list: newData });
    }
  }
  edit(id) {
    const newData = [...this.state.user_list];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ user_list: newData });
    }
  }
  save(id) {
    const newData = [...this.state.user_list];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      delete target.editable;
      this.setState({ user_list: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
    fetch('http://localhost:3000/user',{
      method:'post',
      body: JSON.stringify(target),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>res.json())
    .then((res)=>{
      if(res.id){
        message.success("保存成功！");
      }else{
        message.error("保存失败！");
      }
    })
    .catch((err)=>console.error(err));
  }
  cancel(id) {
    const newData = [...this.state.user_list];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
      delete target.editable;
      this.setState({ user_list: newData });
    }
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handleMenuClick=(e)=>{
    if(e.key==="1"){
      this.setState({
        kind:"昵称"
      });
    }else if(e.key==="2"){
      this.setState({
        kind:"邮箱"
      });
    }else{
      this.setState({
        kind:"手机"
      });
    }
  }
  addUser=()=>{
    this.state.user_list.push({
      id:this.state.user_list[this.state.user_list.length-1].id+1,
      nickname:'',
      email:'',
      phone:''
    });
    this.edit(this.state.user_list[this.state.user_list.length-1].id);
  }
  delUser=()=>{
      const keys=this.state.selectedRowKeys;
      for(let k in keys){
        fetch('http://localhost:3000/user/' + keys[k],{
          method:'delete'
        })
        .then(res=>res.json())
        .then(res=>{
          this.setState({
            user_list:this.state.user_list.filter(item=>item.id!==keys[k])
          });
        })
        .catch(err=>{
          console.error(err);
          message.error("删除失败！");
        });
      }
      message.success("删除成功！");
  }
  selectUser=(e)=>{
    let list=this.state.user_list;
    if(this.state.kind==="昵称"){
      list=list.filter(item=>item.nickname===e);
    }else if(this.state.kind==="邮箱"){
      list=list.filter(item=>item.email===e);
    }else{
      list=list.filter(item=>item.phone===e);
    }
    this.setState({user_list:list});
  }
  render(){
    const { loading, selectedRowKeys,user_list } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">昵称</Menu.Item>
        <Menu.Item key="2">邮箱</Menu.Item>
        <Menu.Item key="3">手机</Menu.Item>
      </Menu>
    );
    return(
      <div style={{width:800,height:600,margin:40}}>
        <div style={{ marginBottom: 16}}>
          <Row>
            <Col span={2}>
              <Button type="primary"  disabled={!hasSelected} loading={loading} onClick={this.delUser}>
                删除
              </Button>
            </Col>
            <Col span={4}>
              <Button onClick={this.addUser}>添加</Button>
            </Col>
            <Col span={3}>
              <Dropdown.Button overlay={menu}>{this.state.kind}</Dropdown.Button>             
            </Col>
            <Col span={8}>
              <SearchUser handleSelect={this.selectUser} getAll={this.getUserList.bind(this)} kind={this.state.kind} style={{width:150}}/>
            </Col>
          </Row>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选中 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>

        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={this.columns}
               dataSource={user_list}  pagination={{pageSize:5}}/>

      </div>
    );
  }
}
export default UserTable;
