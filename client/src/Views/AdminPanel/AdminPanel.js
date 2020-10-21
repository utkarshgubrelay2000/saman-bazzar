import Axios from 'axios'
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import { storage } from '../../FireBaseconfig/fire'
import Card from '../../components/vendorcard/vendorcard.jsx'

class  Admin        extends Component{
state={
    show:false,
    company:null,
Address:null,
    Mobile:null,
    imageUrl:[],
    image:null,message:null,error:null,
    VendorCard:[]
}
DeletePost=(id)=>{
    console.log(id);
    
    var OPTIONS = {
      method: 'DELETE',
      data:{id:id},
      url: 'http://localhost:8080/admin/DeletePost',
      headers: { 
        'Content-Type': 'application/json'
      },
    }; 
    Axios(OPTIONS)
    .then((response)=> {
  
     console.log(response)
  this.setState({
      VendorCard:response.data
  })
   
  })
  .catch(function (error) {
    console.log(error);
  });
  }
handleShow = () => this.setState({show:true})
 handleClose = () => this.setState({show:false})
 UploadImage = (e) => {
    // this code may look difficult
  
    if (e.target.files[0]) {
        const img=e.target.files[0]
        this.setState({
            image: img,
        });
    }      
  };
  componentDidMount(){
    var OPTIONS = {
      method: 'GET',
      url: 'http://localhost:8080/admin/GetPost',
      headers: { 
        'Content-Type': 'application/json'
      },
    }; 
    Axios(OPTIONS)
    .then((response)=> {
   if(response.data.error){
console.log('jj')
   }
   else{
     console.log(response.data)
     this.setState({
       VendorCard:response.data
     })
   }
 
  })
  .catch(function (error) {
    console.log(error);
  });
  }

UploadPicture=()=>{
    var UploadTask;
        UploadTask = storage
        .ref(`images/${this.state.image.name}`)
        .put(this.state.image);
  UploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error); 
    },
    () => {
      storage
        .ref("images")
        .child(this.state.image.name)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
        const urlhandler=this.state.imageUrl
        const src={url:url}
        urlhandler.push(src)
        this.setState({imageUrl:urlhandler})
        alert('image uploaded')
          //   console.log(this.state.CarDetails.Images);
        });
    },
    )
 
}

onChangeHandler=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}
CreatePost=()=>{
    const {company,imageUrl,Mobile,Address} =this.state
    if(company && imageUrl && Mobile && Address){
        var OPTIONS = {
            method: 'POST',
            data:{company:company,Address:Address,Mobile:Mobile,imageUrl:imageUrl},
            url: 'http://localhost:8080/admin/Create',
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
  

return(
    <div>
        <button className="cta-btn" onClick={this.handleShow}>
        Create
       </button>

       <div className='gridcontainer'>
       {this.state.VendorCard.map(i=>{
          return (
            <Card  Details={i} edit="true" DeletePostHandler={()=>this.DeletePost(i._id)}/>
       )
       })}
            </div>



       <Modal  size='lg' show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <div class="form-group">
    <label for="exampleInputEmail1">Company</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name='company' onChange={this.onChangeHandler}  aria-describedby="emailHelp"/>
      </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Mobile Number</label>
    <input type="text" class="form-control" id="exampleInputPassword1" name="Mobile" onChange={this.onChangeHandler} />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Address</label>
    <input type="text" class="form-control" id="exampleInputPassword1" name="Address" onChange={this.onChangeHandler} />
  </div>
  <div class="form-group text-center">
    <label for="exampleInputPassword1"> Upload Images</label>
    <input type="file" class="form-control btn-primary" multiple onChange={this.UploadImage} id="exampleInputPassword1"/>
    <button onClick={this.UploadPicture} className='text-center cta-btn'>
        Upload
    </button>
  </div>
  <div className="text-center">

      <button onClick={this.CreatePost} className='text-center cta-btn'>
          Create
      </button>
  </div>
  </Modal.Body>
 
      </Modal>
</div>

)}
}
export default Admin