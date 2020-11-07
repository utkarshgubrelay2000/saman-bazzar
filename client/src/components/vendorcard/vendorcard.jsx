import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
export default class VendorCard extends React.Component {
 
  render() {

    return (
   <section id='vendor'>
      <div
        className={`card ${styles.cardswidth}`}
        style={{ marginTop: "15px",padding:'10px'}}
      >
        <img
          className={`card-img-top ${styles.imgheight}`}
          src={this.props.Details.Imagesurl}
          alt="Card  cap"
        />
        <div className="card-body">
          <h6> 
          {this.props.Details.company || this.props.Details.Shop}
          </h6>
          <hr />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/send?phone=+91 9910299769&text=Hello,Sir I want to buy this https://picsum.photos/id/237/200/300"
          >  
           {this.props.Details.mobile}
          </a>
          <br />

          <span >
           {this.props.Details.address}
          </span>
          <hr />

        
          {this.props.edit? <button className={`btn-primary btn`} onClick={()=>this.props.DeletePostHandler()} >
            <i className='fas fa-trash-alt'>
            </i>
          </button>:<Link to={'/products/'+this.props.Details._id} className={`btn cta-btn`}>
            Products
          </Link>}
        </div>
      </div>
  </section>  );
  }
}
