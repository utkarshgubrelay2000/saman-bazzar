import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
export default class VendorCard extends React.Component {
 
  render() {

    return (
      <div
        className={`card ${styles.cardswidth}`}
        style={{ marginTop: "15px" }}
      >
        <img
          className={`card-img-top ${styles.imgheight}`}
          src={this.props.Details.Imagesurl}
          alt="Card  cap"
        />
        <div class="card-body">
          <h6> 
          {this.props.Details.company}
          </h6>
          <hr />
          <h6 className={`${styles.mobileh6}`}>Mobile/WhatsApp No:</h6>
          <a
            className={`${styles.spantext}`}
            target="_blank"
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/send?phone=+91 9910299769&text=Hello,Sir I want to buy this https://picsum.photos/id/237/200/300"
          >  
           {this.props.Details.mobile}
          </a>
          <br />
          <h6 className={`${styles.mobileh6}`}>Address:</h6>
          <span className={`${styles.spantext}`}>
           {this.props.Details.address}
          </span>
          <hr />

          <Link to={'/products/'+this.props.Details._id} className={`btn cta-btn`}>
            Products
          </Link>
          {this.props.edit? <button className={`btn-primary btn`} onClick={()=>this.props.DeletePostHandler()} >
            <i className='fas fa-trash-alt'>
            </i>
          </button>:null}
        </div>
      </div>
    );
  }
}
