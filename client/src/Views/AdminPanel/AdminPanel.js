import Axios from "axios";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { storage } from "../../FireBaseconfig/fire";
import Card from "../../components/vendorcard/vendorcard.jsx";

class Admin extends Component {
  state = {
    show: false,
    usershow: false,
    company: null,
    Address: null,
    Mobile: null,
    imageUrl: [],
    shop: null,
    shopOwner: null,
    image: [],
    message: null,
    error: null,
    VendorCard: [],
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
  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });
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
      console.log(img);
    }
  };
  componentDidMount() {
    var OPTIONS = {
      method: "GET",
      url: "http://localhost:8080/admin/GetPost",
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios(OPTIONS)
      .then((response) => {
        if (response.data.error) {
          console.log("jj");
        } else {
          console.log(response.data);
          this.setState({
            VendorCard: response.data,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  UploadPicture = () => {
    const data = new FormData();
    for (let key = 0; key < this.state.image.length; key++) {
      data.append("upload_preset", "pagalworld");
      data.append("cloud_name", "a2k");
      data.append("file", this.state.image[key]);
      data.append("folder", "shop");
      console.log(this.state.image[key]);

      var OPTIONS = {
        method: "Post",
        data: data,
        url: "https://api.cloudinary.com/v1_1/dvu7miswu/image/upload",
        headers: {
          "Content-Type": "application/json",
        },
      };
      Axios(OPTIONS)
        .then((response) => {
          console.log(response);
          const img=[];
          img.push(response.data.url)
          this.setState({imageUrl:imgcloundnary})
        })
        .catch(function (error) {
          console.log(error, "huiu");
        });
    }
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  CreatePost = () => {
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
        url: "http://localhost:8080/admin/Create",
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
  CreateUser = () => {
    console.log(this.state);

    const { shop, shopOwner, imageUrl, Mobile, Address } = this.state;
    if (shop && shopOwner && imageUrl && Mobile && Address) {
      console.log("here");

      var OPTIONS = {
        method: "POST",
        data: {
          shopOwner: shopOwner,
          shop: shop,
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
    console.log(this.state.image);

    return (
      <div>
        <button className="cta-btn" onClick={this.handleShow}>
          Create Post
        </button>
        <button className="cta-btn" onClick={this.UserhandleShow}>
          Create User
        </button>

        <div className="gridcontainer">
          {this.state.VendorCard.map((i) => {
            return (
              <Card
                Details={i}
                edit="true"
                DeletePostHandler={() => this.DeletePost(i._id)}
              />
            );
          })}
        </div>

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
              <button
                onClick={this.UploadPicture}
                className="text-center cta-btn"
              >
                Upload
              </button>
            </div>
            <div className="text-center">
              <button onClick={this.CreatePost} className="text-center cta-btn">
                Create
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
              <button
                onClick={this.UploadPicture}
                className="text-center cta-btn"
              >
                Upload
              </button>
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
