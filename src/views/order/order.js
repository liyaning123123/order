import React, { Component } from 'react'
import Routers from '../../router/routerall'
export default class order extends Component {
    render() {
        return (
            <div>
                <Routers lis={this.props.children}></Routers>
            </div>
        )
    }
}
