import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Cartscreen() {
  AOS.init();
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="row justify-content-center p-2" data-aos="fade-down">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>

          {cartItems.map((item) => {
            return (
              <div className="flex-container mt-5">
                <div className="text-left m-1 w-100">
                  <h5>
                    {item.name} [{item.size}]
                  </h5>
                  <h5>
                    Price :  {item.quantity} * {item.prices[0][item.size]} = ${item.price}
                  </h5>
                  <h5 style={{ display: "inline" }}>Quantity : </h5>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(addToCart(item, item.quantity + 1, item.size));
                    }}
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(addToCart(item, item.quantity - 1, item.size));
                    }}
                  ></i>
                </div>

                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "80px", height: "80px" }}
                  /> 
                </div>
                
                <div className="m-1 w-100">
                  <i
                    className="fa fa-trash mt-5"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div> 
              </div>
              
            );
          })}
        </div>

        <div className="col-md-4 text-right mt-5">
          <h2 style={{ fontSize: "45px" }}>SubTotal : ${subtotal} </h2>
          <Checkout subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
