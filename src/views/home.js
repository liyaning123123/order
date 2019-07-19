import React, { Component } from 'react'
import { Layout, Menu, Icon, Button ,Modal,Avatar} from 'antd';
import 'antd/dist/antd.css';
import '../css/home.css'
import Cookie from 'js-cookie'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import Routers from '../router/routerall'
import {connect} from 'react-redux'
const { Sider, Content,Header } = Layout;
const { SubMenu } = Menu;
const { confirm } = Modal;

 class home extends Component {
    constructor(props) {
        super(props);
          this.state = {
        collapsed: false,
        data:{},
        arr:[
            {
                name:"1111"
            },
            {
                name:"1111"
            },{
                name:"1111"
            }
        ]
    };
    }
    toggleCollapsed(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentDidMount(){
     //判断用户登录
      axios.defaults.headers.common['authorization']=Cookie.get("authorization")
        axios.get("http://localhost:3000/api/islogin").then(({data})=>{
            console.log(data.info)
            this.setState({
                data:data.info
            })
        }).catch()

        if(Cookie.get("authorization")){
            console.log(Cookie.get("authorization"))
            this.props.history.push("/home")
        }else{
            console.log(Cookie.get("authorization"))
            this.props.history.push("/login")
        }
    }
    showConfirm() {
        // console.log(this)
        let that=this
        confirm({
          title: '您确定要退出',
          content: '',
          onOk() {
              console.log(that)
            console.log('确定');
            that.props.history.push("/login")
            Cookie.remove("authorization");
            
          },
          onCancel() {
            console.log('取消');
          },
        });
      }
      clickAll(item){
        //   console.log(item)
          this.props.add(item)
      }
    render() {
        return (
            <Layout>   
                    <Sider>
                   
                    <Avatar src={`http://localhost:3001${this.state.data.facePhoto}`} /><br/>
                     <p>{this.state.data.phone}</p>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            >
                          
                           <Menu.Item key="1" onClick={this.clickAll.bind(this,{title:"首页",path:"/home/HomePage",id:1})}>
                                <NavLink to="/home/HomePage">    
                                <span>首页</span>
                                </NavLink> 
                            </Menu.Item>
                     
                            <Menu.Item key="2" onClick={this.clickAll.bind(this,{title:"设置",path:"/home/settings",id:2})}>
                               <NavLink to="/home/settings">
                                <span>设置 </span>
                                </NavLink> 
                            </Menu.Item>

                            <SubMenu
                                key="sub1"
                                title={
                                        <span>订单管理</span>
                                }
                            >
                                <Menu.Item key="5" onClick={this.clickAll.bind(this,{title:"贷款订单",path:"/home/order/loans",id:3})}>
                                   <NavLink to="/home/order/loans">贷款订单</NavLink>
                                </Menu.Item>
                                <Menu.Item key="6" onClick={this.clickAll.bind(this,{title:"转单订单",path:"/home/order/changeOrder",id:4})}>
                                   <NavLink to="/home/order/changeOrder">转单订单</NavLink>
                                </Menu.Item>
                                <Menu.Item key="7" onClick={this.clickAll.bind(this,{title:"保险订单",path:"/home/order/insurance",id:5})}>
                                   <NavLink to="/home/order/insurance">保险订单</NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                        <Button onClick={this.showConfirm.bind(this)}>退出</Button>
                        <Button type="primary">设置</Button>
                    </Sider> 
                    <Layout> 
                    <Header>
                    {
                        this.props.addDATA.map((item,index)=>{
                            return  <NavLink to={item.path}>{item.title}</NavLink>
                        })
                    }
                    </Header>
                    <Content>
                         <Routers lis={this.props.children}></Routers>
                    </Content>
                </Layout>
               
            </Layout>
        )
    }
}

let MapStateToProps=(state)=>{
    console.log(state.reducers1)
    return{
        addDATA:state.reducers1
    }
}
let MapdispatchToProps=(dispatch)=>{
    return {
          add:(add)=>{
          dispatch({type:"ADD",add})
     }
    }
   
}
home=connect(MapStateToProps,MapdispatchToProps)(home)
export default home
