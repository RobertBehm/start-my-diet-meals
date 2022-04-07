import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders } = getordersstate;
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => {
              console.log(order.orderItems, "aa");
              return (
                <tr>
                  <td>{order.transactionId}</td>
                  <td>{order.email}</td>
                  <td>{order.name}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <h1>Delivered</h1>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                        }}
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                  <td>
                    <ol className="itemNames">
                      {order.orderItems.map((item, i) => {
                        return (
                          <li>
                            {item.name}
                            {order.orderItems.length > 1 &&
                              order.orderItems.length - 1 != i && <hr />}
                          </li>
                        );
                      })}
                    </ol>
                  </td>
                  <td className="itemQuantities">
                    {order.orderItems.map((item, i) => {
                      return (
                        <p>
                          {item.quantity}
                          {order.orderItems.length > 1 &&
                            order.orderItems.length - 1 != i && <hr />}
                        </p>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
