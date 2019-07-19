import React, { Component } from 'react'
import { Avatar } from 'antd';
import axios from 'axios'
import Cookie from 'js-cookie'
export default class settings extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:{}
        }
    }
    
    render() {
        return (
            <div>
                <Avatar src={`http://localhost:3001${this.state.data.facePhoto}`} /><br/>
                <p>{this.state.data.phone}</p>
                <button onClick={this.fill.bind(this)}>更改</button>
            </div>
        )
    }
    componentDidMount(){
        axios.defaults.headers.common['authorization']=Cookie.get("authorization")
        axios.get("http://localhost:3000/api/islogin").then(({data})=>{
            console.log(data.info)
            this.setState({
                data:data.info
            })
        }).catch()
    }
    fill(){
        // axios.defaults.headers.common['sessionId']=localStorage.sessionId
        axios.post("http://localhost:3000/api/facePhoto").then(({data})=>{
            console.log(data)
        }).catch();
    }
}
