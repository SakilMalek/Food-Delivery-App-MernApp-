import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let data = useCart();

  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();
  const handleAddtoCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== null) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        })
         return
      }
    else if (food.size !== size) {
      await dispatch(
        {
        type: "ADD",
        id: props.foodItem_id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      })
      return;
    } 
    return
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem_id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);


  return (
    <div>
      <div>
        <div
          className="card shadow-sm"
          style={{ width: "18rem", maxHeight: "500px", marginBottom: "30px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt={props.foodItem.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">{props.foodItem.description}</p>

            <div className="container w-100">
              <div className="d-flex justify-content-between mb-3">
                <select
                  onChange={(e) => {
                    setqty(e.target.value);
                  }}
                  className="form-select w-50 me-2"
                >
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select w-50"
                  ref={priceRef}
                  onChange={(e) => {
                    setsize(e.target.value);
                  }}
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
                  onClick={handleAddtoCart}
                  style={{ marginLeft: "10px" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
