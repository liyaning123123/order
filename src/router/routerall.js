import React, { Component } from 'react'

import {Route,Redirect, Switch} from "react-router-dom"
export default class routerall extends Component {
    render() {
        let {lis}=this.props
        // console.log(lis)
        let arrredir=lis.filter((item,index)=>{
            return item.redirect;
        })
        let redirects=arrredir.map((item,index)=>{
            return <Redirect key={index} from={item.path} exact to={item.redirect}/>
        })
        lis=lis.filter((item)=>!item.redirect)
        return (
            <Switch>
           {
                lis.map((item,index)=>{
                    return  <Route key={index} path={item.path} render={(props)=>{
                       return <> 
                       {item.children&&<item.component children={item.children} {...props}/>}
                       {!item.children&&<item.component {...props} />}
                       </>
                    }}/>
                    
                })
            }
            {redirects.length !==0 && redirects}
             </Switch>
          
        )
    }
}
