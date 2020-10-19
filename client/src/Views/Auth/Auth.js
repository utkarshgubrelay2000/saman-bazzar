import React, { useState } from "react";
import Register from "../../components/Auth_Comp/Register";
import Signin from "../../components/Auth_Comp/Sign-In";
import { Modal } from "react-bootstrap";
function Auth_modal(props) {
  const [Auth_Render, setAuth_Render] = useState(true);
  const Auth_render_handler = () => {
    setAuth_Render(!Auth_Render);
  };
 
  return (
    <React.Fragment>
      <div className="container">
        <section id="hero_auth">
          <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                {" "}
                {Auth_Render ? "Register" : "Sign-In"}{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{Auth_Render ? <Register /> : <Signin />}</Modal.Body>
            <Modal.Footer style={{ display: "inline" }}>
              {Auth_Render
                ? "don't have a account?"
                : "Already have a account?"}
              <button className="cta-btn" onClick={Auth_render_handler}>
                {Auth_Render ? "Register" : "SignIn"}
              </button>
            </Modal.Footer>
          </Modal>
        </section>
      </div>
    </React.Fragment>
  );
}
export default Auth_modal;
