import React from 'react';
import styles from './inner.module.css';

export default class InnerCategory extends React.Component{
  render(){
    return(<div className={`card ${styles.cardwidth}`} style={{marginTop:'10px'}}>
  <img src="https://picsum.photos/id/237/200/300" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Faded Jeans <span><mark>New Launch</mark></span></h5>
    <hr/>
    <h6>Description:</h6>
    <h6>Price:</h6>
    <h6>Minimum Order:</h6>
    <h6>Fabric: </h6>
    <h6 className={`${styles.color}`}>Color Available</h6><span><li style={{backgroundColor:"blue"}}></li><li style={{backgroundColor:"black"}}></li><li></li></span> 
    <a target="_blank"rel="noopener noreferrer"  href="https://api.whatsapp.com/send?phone=+91 9910299769&text=Hello,Sir I want to buy this https://picsum.photos/id/237/200/300" className={`btn btn-success ${styles.whatapplink}`}>WhatsApp To Buy
</a>
  </div>
</div>)
  }


}