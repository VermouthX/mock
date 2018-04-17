import React from 'react';
import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
const Option = Select.Option;

let timeout;
let currentValue;
let kind;

class SearchUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      value: ''
    }
  }
  fetch=(value,callback) =>{
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  kind=this.props.kind;
  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`http://localhost:3000/user?${str}`)
      .then(response => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d;
          const data = [];
          result.forEach((r) => {
            if(kind==="昵称"){
              data.push({
              value: r.nickname,
              text: r.nickname,
              });
            }else if(kind==="邮箱"){
              data.push({
              value: r.email,
              text: r.email,
              });
            }else{
              data.push({
              value: r.phone,
              text: r.phone,
              });
            }            
          });
          callback(data);
        }
      });
  }
  timeout = setTimeout(fake, 300);
}

  handleChange = (value) => {
    this.setState({ value });
    this.fetch(value, data => this.setState({ data }));
  }
  textChange(value){
    if(value=="")
      this.props.getAll();
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.props.handleSelect}
        onSearch={this.textChange.bind(this)}
      >
        {options}
      </Select>
    );
  }
}
export default SearchUser;