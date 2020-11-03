import React from 'react';
import image from '../../assets/Images/pexels-oleg-magni-1005638.jpg'
export default class Carousel extends React.Component{
  render(){
    return(
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div>
      <img class="d-block w-100" src={image} alt="First slide" />
      </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={image} alt="Second slide" />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={image} alt="Third slide" />
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    )
  }
}