import React, { Component } from "react";
import image from "../../assets/Images/image1-01.png";
import image1 from "../../assets/Images/imag3-01.png";
import image2 from "../../assets/Images/image2.png";

import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/footer";

class Home extends Component {
  // Images are Taken in state so that they can we fetched from backend...
  state = {
    index: 0,
    Images: [{ url: image }, { url: image1 }, { url: image2 }], 
    error: null,
    emailvalue: null,
    submitEmail: false,
    btnclassName: "primary",
    isLoading: true,
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
    isOpen: false,
  };

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
    });
  };
  Validation = (e) => {
    const regEx = /@gmail.com$/;
    let s = e.target.value;

    if (!regEx.exec(s)) {
      // console.log(regEx.exec(s),'inside');
      this.setState({
        error: "Email is not valid",
        submitEmail: false,
      });
      document.getElementById("exampleInputEmail1").className =
        "form-control bg-danger text-white";
    } else {
      this.setState({
        error: null,
        submitEmail: true,
      });
      document.getElementById("exampleInputEmail1").className =
        "form-control bg-success";
    }
  };
  ChangeHandler = (e) => {
    this.Validation(e);
    if (!this.state.error) {
      this.setState({
        emailvalue: e.target.value,
      });
    }
  };
  Subcribe = (e) => {
  e.preventDefault()
  console.log(this.state.emailvalue)

}

render() {
  
    return (
      <React.Fragment>
        <div className="container">
          <section id="hero">
            <Carousel activeIndex={this.index} onSelect={this.handleSelect}>
              {this.state.Images.map((i, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 home_template_carousel"
                      src={i.url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </section>

          <section className="category container">
            <div className="category_div">
              <h4 className="home_category_name">
Recently added
              </h4>
            </div>
            <div className="row">
              <div className="col-12 text-center  home_div_owl_carousel">
              </div>
              <div className="col-12">
                <ul className="home_category_viewmore">
                  <li>
                    
                      <Link to="/category/">View more</Link>
    
                  </li>
                </ul>
              </div>
            </div>
          </section>

      

          <section className="category container">
            <div className="category_div">
              <h4 className="home_category_name">
Top Rated
              </h4>
            </div>
            <div className="row">
              <div className="col-12 text-center  home_div_owl_carousel">
    
              </div>
              <div className="col-12">
                <ul className="home_category_viewmore">
                  <li>
                    
                      <Link to="/category/Shirts" >View more</Link>
    
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="home_subcribe" className="container">
            <div className="home_div_subcribe">
              <span>
                <h4 className="home_span_Subcribe">
                Lets start a new relationship 
                </h4>
                <h6 className='home_span_Subcribe'>
                  by just sending a message
                </h6>
                <div>
                  <button  
                    className="cta-btn"
                  >
                    <Link to="/#">
                    Send Message
                    </Link>
                  </button>
                </div>
              </span>
            </div>
          </section>
        </div>

        <Footer/>
        <div className='text-center' style={{backgroundColor:'black',color:'white'}}>
       Copyright strike under section 407
      </div>
      </React.Fragment>
    );
  }
}
export default Home;
