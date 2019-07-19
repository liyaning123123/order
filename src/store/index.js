import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
let arr=[]
let a=[]
let reducers1=(state=arr,action)=>{
    switch (action.type) {
        case "ADD":           
                arr.push(action.add)
            //    a= arr.forEach((item,index)=>{
            //         if(item.id==action.add.id){
                      
            //         }
            //         console.log(item)
            //     })
            
            　
        //     　　 for(var i=0;i<arr.length;i++){
        //   　　　　if(arr.indexOf(arr[i].id) == -1){
        //             　　 arr.push(arr[i])
        //       　　  }
        //           }
        //           console.log(arr)
                  return arr;
        default:
            return state;
    }
}

// let reducers2=(state=[],action)=>{
//     switch (action.type) {
//             case "ARR":
//                 console.log(action.arr)
//                 if (!state.length) {
//                     state=action.arr
//                 }else{
//                     state.push(action.arr)
//                 }
//                     console.log(state)
//             return state;
//         default:
//             return state;
//     }
// }
let reducers=combineReducers({reducers1})
let store=createStore(reducers,applyMiddleware(thunk))

export default store