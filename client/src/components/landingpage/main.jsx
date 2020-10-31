import React from 'react';
import VendorCard from './../vendorcard/vendorcard.jsx';
import styles from './main.module.css';
import Axios from 'axios'
import Carousel from './../carosel/carousel.jsx';

export default class Main extends React.Component{
  state={
    VendorCard:[
 ]
  } 

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
  
  handlerSearch(event){
      console.log(event.target.value)
    }
  render(){
    return(
         <>
         <div className={`${styles.nav}`}>
         <h6 className={`${styles.h6}`}>Jeans Market Association.com</h6>
         </div>
         <Carousel />
         <div className={`${styles.search} ${styles.searchpadding}`}> 
         <label className={` ${styles.searchbar}`}>Vendor Search:</label>
         <input className={`form-control ${styles.searchwidth}`} type="search" placeholder="Vendor Search" onChange={this.handlerSearch.bind(this)} aria-label="Search" />
         </div>
         <div className={`${styles.gridcontainer}`}>
       
       {this.state.VendorCard.map(i=>{
          return (
            
            <VendorCard  Details={i}/>
            )
       })}
        
         </div>
         </>
    )
  }
}