import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div id="Home_Div_Footer">
      <div className="container">
        <section id="hero_footer">
          <div  style={{display:"flex"}} className='container row'>
            <div className="col-4">
            
            </div>
            <div  className="col-4">
              <span className="footer-span-categories">About Us</span>
            </div>
            <div className='col-4' >
              <span style={{fontSize:'90%'}}>Contact us</span> <br />
            </div>
          </div>
          <div  style={{display:"flex"}} className='container row'>
            <div className="col-4">
              <p>
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
              </p>
            </div>
            <div  className="col-4">
              
              <p>
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
                Stürmten in du dahinten sie dich nacht o, die zu einz'ges du
                liebe mut ich mutter denkst. Um sie blieb.
              </p>
            </div>
            <div className='col-4' >
           <Link to="#">
                <i className="fab fa-instagram"></i>
              </Link>{" "}
              <Link to="#">
                <i className="fab fa-linkedin"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-facebook"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
          </div>
        </section>
      </div>
   
    </div>
  );
}
export default Footer;
