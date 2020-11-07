import Axios from 'axios';
import React,{Component} from 'react'
class   Product       extends Component{
    componentDidMount(){
        console.log(this.props.match.params.id);
        Axios.get('http://localhost:8080/admin/GetProductShop/'+this.props.match.params.id).then(res=>{
            console.log(res.data);
            
        }).catch(err=>{
            console.log(err)
        })
        Axios.get('http://localhost:8080/admin/GetRecommed').then(res=>{
            console.log(res.data);
            
        }).catch(err=>{
            console.log(err)
        })

    }
       render(){
return(
    <h1>
        hello world
    </h1>
)}
}
export default Product