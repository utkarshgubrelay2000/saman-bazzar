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
  };
  DeletePost = (id) => {
    var OPTIONS = {
      method: "DELETE",
      data: { id: id },
      url: "http://localhost:8080/admin/DeletePost",
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
    var OPTIONS = {
      method: "GET",
      url: "http://localhost:8080/admin/GetUser",
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios(OPTIONS)
      .then((response) => {
        console.log(response.data);
        this.setState({
          User: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
          if (response.data.error) {
            this.setState({
              error: response.data.error,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div className="container ">
       <div className='row'>
        <div className="col-lg-4 profile-card">
                <div className="card  mx-auto" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5>
                      Hi 
                    </h5>
                    <div className="items">
                      <ul className='text-center'>
                        <h2>
                          <Link to='/adminpanel/users/'>
                            Users
                          </Link>
                        </h2>
                        <h2>
                          <Link to='/adminpanel/posts/'>
                            Posts
                          </Link>
                        </h2>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
       
          <div className='col-lg-8'>
          <Accordion defaultActiveKey="0">
            {this.state.User.map((Element, index) => {
              if (index !== 0) {
                return (
                  <Card>
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
                          <span>{Element.OwnerName}</span>
                        </div>
                        <div>
                          <a href={"tel:" + Element.Mobile}>{Element.Mobile}</a>
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
                  <Card>
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
                          <a href={"tel:" + Element.Mobile}>{Element.Mobile}</a>
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
        <Accordion.Toggle as={Card.Header} >
                      <div  onClick={this.UserhandleShow} className="text-center">
                        
                        <i className="fas fa-plus"></i>
                     
                      </div>
                    </Accordion.Toggle>
       
          </Accordion>
        </div></div>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div class="form-group">
              <label for="exampleInputEmail1">Company</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                name="company"
                onChange={this.onChangeHandler}
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Mobile Number</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="Mobile"
                onChange={this.onChangeHandler}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Address</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="Address"
                onChange={this.onChangeHandler}
              />
            </div>
            <div class="form-group text-center">
              <label for="exampleInputPassword1"> Upload Images</label>
              <input
                type="file"
                class="form-control btn-primary"
                multiple
                onChange={this.UploadImage}
                id="exampleInputPassword1"
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
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div class="form-group">
              <label for="exampleInputEmail1">Shop</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                name="Shop"
                onChange={this.onChangeHandler}
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Mobile Number</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="Mobile"
                onChange={this.onChangeHandler}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Shop Owner</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="ShopOwner"
                onChange={this.onChangeHandler}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Address</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="Address"
                onChange={this.onChangeHandler}
              />
            </div>
            <div class="form-group text-center">
              <label for="exampleInputPassword1"> Upload Images</label>
              <input
                type="file"
                class="form-control btn-primary"
                multiple
                onChange={this.UploadImage}
                id="exampleInputPassword1"
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
