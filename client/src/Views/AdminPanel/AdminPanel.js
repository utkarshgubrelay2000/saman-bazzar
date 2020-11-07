import Axios from "axios";
import React, { Component } from "react";
import { Modal, Accordion, Card } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
class Admin extends Component {
  state = {
    show: false,
    usershow: false,
    company: null,
    Address: null,
    Mobile: null,
    imageUrl: [],
    Shop: null,
    ShopOwner: null,
    image: [],
    message: null,
    error: null,
    invalid: false,
    VendorCard: [],
    User: [],
    activeUser: null,
    renderPost: false,
    renderUser: false,
  };
  DeletePost = (id) => {
    var OPTIONS = {
      method: "DELETE",
      data: { id: id },
      url: "http://localhost:8080/admin/DeletePost",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+ localStorage.getItem("token")
      },
    };
    Axios(OPTIONS)
      .then((response) => {
        console.log(response);
        this.setState({
          VendorCard: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  DeleteUser = (id) => {
    var OPTIONS = {
      method: "DELETE",
      data: { id: id },
      url: "http://localhost:8080/admin/DeleteUser",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+ localStorage.getItem("token")
      },
    };
    Axios(OPTIONS)
      .then((response) => {
        console.log(response);
        this.setState({
          User: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleShow = (e, id) => {
    e.preventDefault();
    this.setState({ show: true, activeUser: id });
  };
  handleClose = () => this.setState({ show: false, activeUser: null });
  UserhandleShow = () => this.setState({ usershow: true });
  UserhandleClose = () => this.setState({ usershow: false });
  UploadImage = (e) => {
    // this code may look difficult

    if (e.target.files) {
      let img = [];
      for (let i = 0; i < e.target.files.length; i++) {
        img.push(e.target.files[i]);
        this.setState({
          image: img,
        });
      }
      // console.log(img);
    }
  };
  componentDidMount() {
 
    Axios.get(`http://localhost:8080/admin/GetUser`,{
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
      }
  })
      .then((response) => {
        console.log(response.data);
        this.setState({
          User: response.data,
        });
      })
      .catch(function (error) {
        console.log(error.response);
      });
      Axios.get("http://localhost:8080/admin/GetPost",{
        headers: {
          "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem("token")
        },
      }).then(res=>{
        this.setState({
          VendorCard:res.data
        })
      })
  }

  UploadPicture = async () => {
    const data = new FormData();
    for (let key = 0; key < this.state.image.length; key++) {
      await data.append("upload_preset", "pagalworld");
      await data.append("cloud_name", "a2k");
      await data.append("file", this.state.image[key]);
      await data.append("folder", "shop");
      var OPTIONS = {
        method: "Post",
        data: data,
        url: "https://api.cloudinary.com/v1_1/dvu7miswu/image/upload",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await Axios(OPTIONS)
        .then((response) => {
          console.log(response);
          const img = [];
          img.push(response.data.url);
          this.setState({ imageUrl: img, invalid: true });
        })
        .catch(function (error) {
          console.log(error, "huiu");
        });
      return this.state.invalid;
    }
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  CreatePost = async () => {
    console.log(this.state.activeUser);

    if (this.state.activeUser) {
      let valid = await this.UploadPicture();
      console.log(valid);
      if (valid) {
        const { company, imageUrl, Mobile, Address } = this.state;
        if (company && imageUrl && Mobile && Address) {
          var OPTIONS = {
            method: "POST",
            data: {
              company: company,
              Address: Address,
              Mobile: Mobile,
              imageUrl: imageUrl,
            },
            url: "http://localhost:8080/admin/Create/" + this.state.activeUser,
            headers: {
              "Content-Type": "application/json",
            },
          };
          Axios(OPTIONS)
            .then((response) => {
              console.log(response);
              this.setState({
                VendorCard: response.data,
              });
              document.getElementById("modalclosepost").click();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };
  CreateUser = async () => {
    let valid = await this.UploadPicture();
    console.log(valid);
    if (valid) {
      console.log(this.state);

      const { Shop, ShopOwner, imageUrl, Mobile, Address } = this.state;
      console.log("here");

      var OPTIONS = {
        method: "POST",
        data: {
          shopOwner: ShopOwner,
          shop: Shop,
          Address: Address,
          Mobile: Mobile,
          imageUrl: imageUrl,
        },
        url: "http://localhost:8080/admin/CreateUser",
        headers: {
          "Content-Type": "application/json",
        },
      };
      Axios(OPTIONS)
        .then((response) => {
          console.log(response);
          this.setState({
            message: response.data,
          });
          var OPTIONS = {
            method: "GET",
            url: "http://localhost:8080/admin/GetUser",
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("token")
            },
          };
          Axios(OPTIONS).then((response) => {
            this.setState({
              User: response.data,
            });
          });
          document.getElementById("modalcloseuser").click();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
componentDidUpdate(){
  if(this.state.activeUser){
    console.log(this.state.activeUser);
    var OPTIONS = {
      method: "Post",
      data:{id:this.state.activeUser},
      url: "http://localhost:8080/admin/GetParticularUser",
      headers: {
        "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem("token")

      },
    };
    Axios(OPTIONS).then((response) => {
        console.log(response.data);
        const {address,Shop,Mobile}=response.data
        this.setState({company:Shop,
          Address:address,Mobile:Mobile,activeUser:null
        })
       
      })
      .catch(function (error) {
        console.log(error.response);
      });
    
  }

}
  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-lg-4 profile-card">
            <div className="card  mx-auto" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5>Hi</h5>
                <div className="items">
                  <ul className="text-center">
                    <h2>
                      <Link to="/adminpanel/">Panel</Link>
                    </h2>
                    <h2>
                      <Link to="/adminpanel/users/">Users</Link>
                    </h2>
                    <h2>
                      <Link to="/adminpanel/posts/">Posts</Link>
                    </h2>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {this.props.location.pathname === "/adminpanel/posts/" ? (
            <div className="col-lg-8 mr-auto vendorCard">
              {this.state.VendorCard.map((element,index)=>{
              //  console.log(element)
                return(
                  <div className="card" style={{width: "18rem"}} key={index}>
                  <img src={element.Imagesurl[0]} className="card-img-top" alt="noy" />
                  <div className="card-body">
                    <h5 className="card-title">{element.company || element.Shop}</h5>
             
                    <p className="card-text"> <a
            target="_blank"
            rel="noopener noreferrer"
            href={'https://api.whatsapp.com/send?phone=+91 '+element.mobile+'&text=Hello,Sir I want to buy this'+element.Imagesurl[0]}
          >  
           {element.mobile}
          
          </a>.</p> {element.address} <br/>
          <div className='btn-danger' onClick={()=>this.DeletePost(element._id)}>
                    <i className='fas fa-trash-alt'>
                  </i>

            </div>
                  </div>
                </div>
                )
              })}
            </div>
          ) : this.props.location.pathname === "/adminpanel/users/" ? 
          <div className="col-lg-8 mr-auto vendorCard">
          {this.state.User.map((element,index)=>{
            console.log(element);
            return(

              <div className="card" key={index}>
              <img src={element.Profile} className="card-img-top" alt=""/>
              <div className="card-body">
            <h5 className="card-title">{element.OwnerName}</h5>
                <h5 className="card-text">{element.Mobile} </h5>
               <div className='btn-danger' onClick={()=>this.DeleteUser(element._id)}>
                  <i className='fas fa-trash-alt'>
              </i> </div>
              </div>
            </div>
          
            )
          }) }
          </div>: (
            <div className="col-lg-8">
              <Accordion defaultActiveKey="0">
                {this.state.User.map((Element, index) => {
                  if (index !== 0) {
                    return (
                      <Card key={index}>
                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                          <div className="row text-center border-black">
                            <div className="col-3">
                              <Avatar alt="Remy Sharp" src={Element.Profile} />
                            </div>
                            <div className="col-5">
                              <h5>
                                {Element.Shop} {"   "}
                              </h5>
                            </div>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                          <Card.Body>
                            <div>
                              <span className="spanOwnername">
                                {Element.OwnerName.toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <a href={"tel:" + Element.Mobile}>
                                {Element.Mobile}
                              </a>
                            </div>
                            <div>{Element.address}</div>

                            <button
                              className="btn-primary rounded"
                              onClick={(e) => this.handleShow(e, Element._id)}
                            >
                              Create Post
                            </button>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    );
                  } else {
                    return (
                      <Card key={index}>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          <div className="row text-center">
                            <div className="col-3">
                              <Avatar alt="Remy Sharp" src={Element.Profile} />
                            </div>
                            <div className="col-5">
                              <h5>
                                {Element.Shop} {"   "}
                              </h5>
                            </div>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div>
                              <span>{Element.OwnerName}</span>
                            </div>
                            <div>
                              <a href={"tel:" + Element.Mobile}>
                                {Element.Mobile}
                              </a>
                            </div>
                            <div>{Element.address}</div>
                            <button
                              className="btn-primary rounded"
                              onClick={(e) => this.handleShow(e, Element._id)}
                            >
                              Create Post
                            </button>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    );
                  }
                })}
                <Accordion.Toggle as={Card.Header}>
                  <div onClick={this.UserhandleShow} className="text-center">
                    <i className="fas fa-plus"></i>
                  </div>
                </Accordion.Toggle>
              </Accordion>
            </div>
          )}
        </div>

        <Modal
          size="lg"
          show={this.state.show}
          id="modalclosepost"
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Company</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="company"
                value={this.state.company}
                onChange={this.onChangeHandler}
                aria-describedby="emailHelp"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword2">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword2"
                name="Mobile"
                value={this.state.Mobile}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword3">Address</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword3"
                name="Address"
                onChange={this.onChangeHandler}
                value={this.state.Address} disabled
              />
            </div>
            <div className="form-group text-center">
              <label htmlFor="exampleInputPassword4"> Upload Images</label>
              <input
                type="file"
                className="form-control btn-primary"
                multiple
                onChange={this.UploadImage}
                id="exampleInputPassword4"
              />
            </div>
            <div className="text-center">
              <button onClick={this.CreatePost} className="text-center cta-btn">
                Create Post
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          size="lg"
          show={this.state.usershow}
          onHide={this.UserhandleClose}
          id="modalcloseuser"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="form-group">
              <label htmlFor="exampleInputEmail5">Shop</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail5"
                name="Shop"
                onChange={this.onChangeHandler}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword6">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword6"
                name="Mobile"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword7">Shop Owner</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword7"
                name="ShopOwner"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword8">Address</label>
              <input
                type="text"
                className="form-control"
               id='exampleInputPassword8'
                name="Address"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group text-center">
              <label htmlFor="exampleInputPassword9"> Upload Images</label>
              <input
                type="file"
                className="form-control btn-primary"
                multiple
                onChange={this.UploadImage}
                id="exampleInputPassword9"
              />
            </div>
            <div className="text-center">
              <button onClick={this.CreateUser} className="text-center cta-btn">
                Create User
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default Admin;
