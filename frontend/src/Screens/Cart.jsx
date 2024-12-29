import React from "react";
import DeleteIcon from '@mui/icons-material/Delete'; // Correct import for Material-UI
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import "./Cart.css"; // Import custom CSS for cart component

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  // Calculate total price
  let totalPrice = data.reduce((total, food) => total + Number(food.price), 0);

  if (data.length === 0) {
    return (
      <div className="empty-cart">
        <div className="m-5 w-100 text-center fs-3">Your Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
      let response = await fetch("https://food-delivery-app-mernapp.onrender.com/api/orderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.ok) {
        dispatch({ type: "DROP" }); // Clear the cart
      } else {
        console.error("Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Error while placing order:", error);
    }
  };

  return (
    <div className="cart-container">
      <div className="container m-auto mt-5 table-responsive">
        <table className="table  cart-table">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="cart-item-row">
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    <DeleteIcon />
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
        <button onClick={handleCheckOut} className="btn btn-success mt-5">
          Check Out
        </button>
      </div>
    </div>
  );
}
