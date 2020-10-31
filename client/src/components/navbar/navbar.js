import React, { Component } from "react";
import MonarchLogo from "../../assets/Images/1-01.png";
import { Link } from "react-router-dom";
import {Modal} from "react-bootstrap";
class NavBar extends Component {
  state = {
    show: false,
    setSmShow: false,
  };
  handleClose = (e) => {
    this.setState({ show: false });
  };
  handleShow = (e) => {
    this.setState({ show: true });
  };
  render() {
  const token=localStorage.getItem("verficationuserId");
    return (
      <React.Fragment>
        <div className="container">
          <section id="hero_nav">
            <nav className="navbar navbar-expand-lg navbar-light ">
              <div id="navbar_customercare">
                <Link className="navbar-brand" to="#">
                  Customer Care
                </Link>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse row"
                id="navbarSupportedContent"
              >
                <div className="col-12 col-lg-9 text-center">
                  <div className="navbar_ManarchLogo">
                    <img src={MonarchLogo} style={{width:'7vw',height:'6vw'}} alt="" className="" />
                  </div>
                </div>
                <div className="col-3 text-center navbar_Icons">
                  <i className="fas fa-archive"  onClick={() => this.setState({ setSmShow: true })} ></i>
                  <i className="fas fa-address-book"></i>
                  <div className="dropdown">
                    <span
                      className="btn btn-light dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user-circle"></i>
                    </span>
                {token?
                 <div
                 className="dropdown-menu text-center"
                 aria-labelledby="dropdownMenuButton"
               >
                 <Link className="dropdown-item" to="/adminpanel">
                   Admin Panel
                 </Link>
                   <button
                     className=" bg-light border-0"
                     onClick={()=>localStorage.removeItem('verficationuserId')}
                   > <Link to='/' >
                     LogOut
                   </Link>
                   </button>
               </div>
              :  <div
                      className="dropdown-menu text-center"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link className="dropdown-item" to="/profile">
                        Send message
                      </Link>
                        <button
                          className=" bg-light border-0"
                          onClick={this.handleShow}
                        > <Link to='/auth'>
                          Login as Admin
                        </Link>
                        </button>
                    </div>}
                  </div>
                </div>
                <div className="col-6  navbar_span_with_icons">
                  <hr />
                  <div onClick={() => this.setState({ setSmShow: true })} >
                  <i className="fas fa-archive" ></i> <label>Subcribe</label>
                  </div>
                  <div>
                    <i className="fas fa-address-book"> </i>{" "}
                    <label>Contact us</label>
                  </div>
                 <div>
                    <i className="fas fa-user-plus"></i>
                      <button
                        className=" bg-light border-0" >
                        Login/SignUp
                      </button>
                  </div>
                </div>
              </div>
            </nav>
          </section>
          <Modal
              size="lg"
              show={this.state.setSmShow}
              onHide={() => this.setState({ setSmShow: false })}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title> Subcribe to our newsletter</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form type="submit">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" id="modal_email">
                      Email{" "}
                    </label>
                    <input
                      type="email"
                      className="form-control bg-light "
                      id="exampleInputEmail1"
                      onChange={this.ChangeHandler}
                      aria-describedby="emailHelp"
                      placeholder="@gmail.com"
                    />
                  </div>{" "}
                  <div>{this.state.error}</div>
                  <button
                    type="submit"
                    className="cta-btn submit_email"
                    disabled={!this.state.submitEmail}
                    onClick={this.Subcribe}
                  >
                    {" "}
                    Submit
                  </button>
                </form>
              </Modal.Body>
            </Modal>
        
        </div>

        
      </React.Fragment>
    );
  }
}
export default NavBar;
