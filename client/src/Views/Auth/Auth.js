import React,{Component} from "react";
import Axios from 'axios'
class Auth_modal extends Component{
  state={
    email:null,
    password:null,message:null,error:null
  }
  onChangeHandler=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }
  OnSubmitHandler=(e)=>{
    e.preventDefault();
    if(!this.state.email && !this.state.password){
      this.setState({error:'fill up the details'})
    }
    else{

    
    var OPTIONS = {
      method: 'POST',
      data:{email:this.state.email,password:this.state.password},
      url: 'http://localhost:8080/admin',
      headers: { 
        'Content-Type': 'application/json'
      },
    }; 
    Axios(OPTIONS)
    .then((response)=> {
   console.log(response);
   this.setState({
     message:response.data
   })
   if(response.data.error){
    this.setState({
      error:response.data.error
    })
   }
 
  })
  .catch(function (error) {
    console.log(error);
  });
}
  }
render(){
  return (
    <React.Fragment>
      <div className="container">
        <div>
          <section id="hero_auth">
      {
      this.state.message?<h1 className="text-center bg-primary"> <i className='fas fa-envelope'></i> Check Your Mailbox</h1>:
      <div className="text-center">

         {this.state.error?
         <h1 className="bg-danger">{this.state.error}</h1>
         :
         <h5 >
           This login is for Admin Only
            </h5>
        } 
            <form style={{ marginTop: "20px",border:'2px solid black' }} >
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp" onChange={this.onChangeHandler}
                  />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control" onChange={this.onChangeHandler}
                  id="exampleInputPassword1"
                />
              </div>
              <button type="submit" className="btn cta-btn  text-center" onClick={this.OnSubmitHandler}>
                Login
              </button>
            </form>
                  </div>
        } 
          </section>
        </div>
 </div>
    </React.Fragment>
  );
}}
export default Auth_modal;
