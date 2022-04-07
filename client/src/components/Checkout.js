import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import { emptyCart } from "../actions/cartActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();

  function tokenHander(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
    dispatch(emptyCart());
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Your Order Placed Successfully" />}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        billingAddress
        token={tokenHander}
        currency="USD"
        stripeKey="pk_test_51KOlUPGRMoSZxLCTj1U2YkhCvvmivvhfFnbg37Lx2Sy76C8nQkMQXnXO16Zi8C4PJphmspmrIAK1CpeYrE9TqouV00FG4OQNgo"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
