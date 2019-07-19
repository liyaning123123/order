import Home from '../views/home'
import Login from '../views/login'
import HomePage from '../views/HomePage'
import Settings from '../views/settings'
import Order from '../views/order/order'
import Loans from '../views/order/loans'
import ChangeOrder from '../views/order/changeOrder'
import Insurance from '../views/order/insurance'
let route = [{
               path: "/",
               redirect:"/home"
             },
             {
                path:"/home",
                component:Home,
                children:[
                       {
                        path:"/home/HomePage",
                        component:HomePage
                        },
                        {
                            path:"/home/settings",
                            component:Settings
                        },
                        {
                            path:"/home/order",
                            component:Order,
                            children:[{
                                path:"/home/order/loans",
                                component:Loans
                            },
                            {
                                path:"/home/order/changeOrder",
                                component:ChangeOrder
                            },
                            {
                                path:"/home/order/insurance",
                                component:Insurance
                            }]
                        }  
                ]
              },
             {
               path:"/login",
               component:Login
             },
            ]
export default route