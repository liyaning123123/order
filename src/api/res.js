import axios from 'axios'
function resFn(obj){
  return   function(msg){
              console.log(obj,msg)
        axios.post("http://localhost:3000/api/login",msg).then(({data})=>{
          return   data
        })
   }
}
export default resFn