import React from 'react';
import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`http://localhost:3000/movieshow?${str}`)
      .then(response => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r.name,
              text: r.name,
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

class SearchInput extends React.Component {
  state = {
    data: [],
    value: '',
  }
  handleChange = (value) => {
    this.setState({ value });
    fetch(value, data => this.setState({ data }));
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
      >
        {options}
      </Select>
    );
  }
}
export default SearchInput;