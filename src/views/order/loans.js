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
            data: [],
            Arr:[],
            type:[],
            name:[],
            title:["全部","新订单","未审核","已接单","已完成","暂无状态"],
            index:-1,//状态
            start:"",//开始时间
            end:"",//结束时间
            types:"",//类型
            serviceName:""//客服
        }
    }
    handleChange(value) {
        console.log(value.label); // { key: "lucy", label: "Lucy (101)" }
        this.setState({
            serviceName:value.label
        })
      }
    handleChanges(value) {
        console.log(value.label); // { key: "lucy", label: "Lucy (101)" }
        this.setState({
            types:value.label
        })
      }
    onChange(date, dateString) {
        console.log(date, dateString);
        console.log(new Date(date[0]).getTime(),new Date(dateString[1]).getTime())
        let k=new Date(date[0]).getTime()
        let j=new Date(dateString[1]).getTime()
        this.setState({
            start:k,
            end:j
        })
      }
    componentDidMount(){
        axios.defaults.headers.common['authorization']=Cookie.get("authorization")
        axios.get("http://localhost:3000/api/list?order=1").then(({data})=>{
            let arr=data.data.map((item,index)=>{
                   item.key=index
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
                return item
            })
            this.setState({
                data:arr,
                Arr:arr
            })
            let a=[]
            let t=[]
             this.state.data.map((item)=>{
                a.push(item.serviceName)
                t.push(item.type)
             })
             this.setState({
                 name:Array.from(new Set(a)),
                 type:Array.from(new Set(t))
             })
        }).catch();
    }
    titileFn(Index){
       let dataindex=--Index
       console.log(dataindex)
       this.setState({
        index:dataindex
       })
    }
    render() {
        return (
            <div>
                <div>
                  处理时间：  <RangePicker onChange={this.onChange.bind(this)} /> <br/>
                   处理状态： <Radio.Group defaultValue="a" buttonStyle="solid">
                       {
                           this.state.title.map((item,index)=>{
                               return <Radio.Button value={index} onChange={this.titileFn.bind(this,index)}>{item}</Radio.Button>
                           })
                       }
                            </Radio.Group>
                          转单类型：  <Select
                                labelInValue
                                // defaultValue={{ key: 'nn' }}
                                style={{ width: 120 }}
                                onChange={this.handleChanges.bind(this)}
                            >
                                {
                                    this.state.type.map((item)=>{
                                        return  <Option value={item}>{item}</Option>
                                    })
                                }
                            </Select>
                         客服名称：   <Select
                                labelInValue
                                // defaultValue={{ key: 'lucy' }}
                                style={{ width: 120 }}
                                
                                onChange={this.handleChange.bind(this)}
                            >
                                  {
                                    this.state.name.map((item)=>{
                                        return  <Option value={item}>{item}</Option>
                                    })
                                }
                            </Select>
                            <Button type="primary" onClick={this.filterFn.bind(this)}>搜索</Button>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data}  scroll={{ x: 1300 }} />
            </div>
        )
    }
    filterFn(){
            let obj={
              index:this.state.index,//状态
              start:this.state.start,//开始时间
              end:this.state.end,//结束时间
              types:this.state.types,//类型
              serviceName:this.state.serviceName//客服
            }
            console.log(obj)
            let fi=this.state.Arr.filter((item,index)=>{  
              let zhuan=new Date(item.date).getTime()      
              if(obj.start<zhuan&&obj.end>zhuan||!obj.start){    
                 
                if(obj.index===item.handleState||obj.index==-1){
                    if(obj.types===item.type||obj.types==""){  
                        if(obj.serviceName===item.serviceName||obj.serviceName==""){
                            return  item  
                        }
                    }
                }} 
            })
             console.log(fi)     
        this.setState({
            data:fi
        })
    }
}
