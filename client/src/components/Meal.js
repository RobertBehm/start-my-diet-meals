import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Meal({ meal }) {
  AOS.init({});

  const [quantity, setquantity] = useState(1);
  const [size, setSize] = useState("regular");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  function addtocart() {
    dispatch(addToCart(meal, quantity, size));
  }

  return (
    <div
      data-aos="zoom-in"
      className="shadow-lg p-3 mb-5 bg-white rounded"
      key={meal._id}
    >
      <div onClick={handleShow}>
        <h1 style={{ height: "50px"}}>{meal.name}</h1>
        <img
          src={meal.image}
          className="img-fluid"
          style={{ height: "200px", width: "300px" }}
          alt="meals"
        />
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <p>Sizes</p>
          <select
            className="form-control"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {meal.sizes.map((size) => {
              return <option value={size}>{size}</option>;
            })}
          </select>
        </div>

        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">Price : ${meal.prices[0][size] * quantity}</h1>
        </div>
        <div className="m-1 w-100">
          <button className="btn" onClick={addtocart}>
            ADD TO CART
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{meal.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={meal.image}
            className="img-fluid"
            style={{ height: "400px" }}
            alt="meals"
          />
          <p>{meal.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
