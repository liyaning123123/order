import React, { Component } from 'react'
import { Table, DatePicker ,Radio,Select,Button } from 'antd';
import axios from 'axios'
import Cookie from 'js-cookie'
const { RangePicker } = DatePicker;
const { Option } = Select;
export default class loans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: '订单号', dataIndex: 'id', key: '1' },
                { title: '下单时间', dataIndex: 'date', key: '2' },
                { title: '用户名', dataIndex: 'customerName', key: '3' },
                { title: '手机号', dataIndex: 'phone', key: '4' },
                { title: '转单类型', dataIndex: 'type', key: '5' },
                { title: '贷款金额', dataIndex: 'money', key: '6' },
                { title: '订单状态', dataIndex: 'val', key: '7' },
                { title: '客服', dataIndex: 'serviceName', key: '8' },
                {
                  title: '操作',
                  key: 'operation',
                  fixed: 'right',
                  width: 100,
                  render: () => <a href="javascript:;">action</a>,
                },
              ],           
            data: []
        }
        
    }
   
    handleChange(value) {
        // console.log(value); // { key: "lucy", label: "Lucy (101)" }
      }
    onChange(date, dateString) {
        // console.log(date, dateString);
      }
    componentDidMount(){
        axios.defaults.headers.common['authorization']=Cookie.get("authorization")
        axios.get("http://localhost:3000/api/list?order=3").then(({data})=>{
            // console.log(data.data)
            let arr=data.data.map((item,index)=>{
                if(item.handleState==0){
                   item.val="新订单"
                }else if(item.handleState==1){
                    item.val="未审核"
                }else if(item.handleState==2){
                    item.val="已接单"
                }else if(item.handleState==3){
                    item.val="已完成"
                }else if(item.handleState==4){
                    item.val="暂无状态"
                }
                return {...item,key:index}
            })
            this.setState({
                data:arr
            })
             console.log(this.state.data)
        }).catch();
       
    }
    render() {
       
        return (
            <div>
                <div>
                  处理时间：  <RangePicker onChange={this.onChange} /> <br/>
                   处理状态： <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">全部</Radio.Button>
                                <Radio.Button value="b">新订单</Radio.Button>
                                <Radio.Button value="c">未审核</Radio.Button>
                                <Radio.Button value="d">已完成</Radio.Button>
                                <Radio.Button value="e">暂无状态</Radio.Button>
                            </Radio.Group>
                          转单类型：  <Select
                                labelInValue
                                defaultValue={{ key: 'lucy' }}
                                style={{ width: 120 }}
                                onChange={this.handleChange}
                            >
                                <Option value="jack">Jack (100)</Option>
                                <Option value="lucy">Lucy (101)</Option>
                            </Select>
                         客服名称：   <Select
                                labelInValue
                                defaultValue={{ key: 'lucy' }}
                                style={{ width: 120 }}
                                
                                onChange={this.handleChange}
                            >
                                <Option value="jack">Jack (100)</Option>
                                <Option value="lucy">Lucy (101)</Option>
                            </Select>
                            <Button type="primary">搜索</Button>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data}  scroll={{ x: 1300 }} />
            </div>
            
        )
    }
}
