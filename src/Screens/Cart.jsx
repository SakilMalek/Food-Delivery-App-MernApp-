import React from "react";
import trash from "../trash.svg";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import "./Cart.css"; // Import custom CSS for cart component

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="empty-cart">
        <div className="m-5 w-100 text-center fs-3">Your Cart is Empty!</div>
      </div>
    );
  }

  // Calculate total price
  let totalPrice = data.reduce((total, food) => total + Number(food.price), 0);

  return (
    <div className="cart-container">
      <div className="container m-auto mt-5 table-responsive">
        <table className="table table-hover cart-table">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td> {/* Ensure price is displayed */}
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    <img src={trash} alt="delete" className="trash-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          <h2 className="fs-4">
            Total Price:{" "}
            <span className="text-success">{totalPrice.toFixed(2)}/-</span>
          </h2>
        </div>
      </div>
      <div className="checkout-button">
        <button className="btn btn-success mt-5">Check Out</button>
      </div>
    </div>
  );
}
