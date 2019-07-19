import React, { Component } from 'react'
import '../css/login.css'
import axios from 'axios'
import Cookie from 'js-cookie'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state={
         
            lock:"",
            user:"",
          
            yz:"cc",
            YZ:""
        
          
        }
    }

    clFn(){
      //验证
       axios.get("http://localhost:3000/api/checkCode").then(({data})=>{
            console.log(data)
            this.setState({
              yz:data.Verification
            })
      }).catch();
    }
    handleSubmit(){
      //登录
      console.log(this.props)
     this.props.history.push("/home")
      axios.post("http://localhost:3000/api/login",{phone:this.state.user,password:this.state.lock,checkcode:this.state.YZ}).then(({data})=>{
        console.log(data)
        // localStorage.authorization=data.sessionId
        Cookie.set("authorization",data.sessionId)
      }).catch()
    }
    
    render() {
         
        return (
            <div className="login">
                <Form>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="账号"
              value={this.state.user}
              onChange={(e)=>{
                console.log(e.target.value)
                this.setState({
                    user:e.target.value
                })
               
              }}
            />  
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              value={this.state.lock}
              onChange={(e)=>{
                // console.log(e.target)
                this.setState({
                    lock:e.target.value
                })
              }}
            />
            
            <p className="inp">
            <Input
              type="text"
              placeholder="验证码"
              value={this.state.YZ}
              onChange={(e)=>{
                // console.log(e.target)
                this.setState({
                  YZ:e.target.value
                })
              }}
            />
            <span onClick={this.clFn.bind(this)}>{this.state.yz}</span>
            </p> 
          <button onClick={this.handleSubmit.bind(this)}>
           登陆
          </button>
   </Form>
            </div>
        )
    }
}
