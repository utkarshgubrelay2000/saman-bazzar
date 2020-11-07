import React from 'react';
import image from '../../assets/Images/pexels-oleg-magni-1005638.jpg'
export default class Carousel extends React.Component{
  render(){
    return(
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <div>
      <img className="d-block w-100" src={image} alt="First slide" />
      </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={image} alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={image} alt="Third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
    )
  }
}