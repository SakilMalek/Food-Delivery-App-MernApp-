import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const data = useCart();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);

  const handleAddToCart = async () => {
    const food = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    if (food) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  const finalPrice = size ? qty * parseFloat(options[size] || 0) : 0;

  useEffect(() => {
    setSize(priceRef.current?.value || priceOptions[0]);
  }, [priceOptions]);

  return (
    <div className="card-container">
      <div className="card shadow-sm">
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt={props.foodItem.name}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p
            className="card-text"
            data-description={props.foodItem.description}
          >
            {props.foodItem.description}
          </p>
          <div className="container w-100">
            <div className="d-flex justify-content-between mb-3">
              <select
                onChange={(e) => setQty(e.target.value)}
                className="form-select w-50 me-2"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="form-select w-50"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="fs-5 fw-bold text-success">₹{finalPrice}/-</div>
              <button
                className="btn btn-success"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
