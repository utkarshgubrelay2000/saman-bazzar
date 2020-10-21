import React from 'react';
import InnerCategory from './../innercomponent/innercategory.jsx';
import styles from './outer.module.css';
import Carousel from './../carosel/carousel.jsx';
export default class Outer extends React.Component{
  render(){
    return(
      <>
      <Carousel />
      <div className={`${styles.gridcontainers}`}>
      <InnerCategory />
      <InnerCategory />
      <InnerCategory />
      <InnerCategory />
      <InnerCategory />
      <InnerCategory />
      </div>
      </>
      )
  }
}  