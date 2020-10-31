import React,{Component} from 'react'
class   Product       extends Component{
       render(){
        console.log(this.props.match.params);
return(
    <h1>
        hello world
    </h1>
)}
}
export default Product