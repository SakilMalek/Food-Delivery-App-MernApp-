import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  // useEffect(() => {
  //   fetchMyOrder();
  //   console.log(orderData); // Inspect the structure and data
  // }, [orderData]);
  
  // Fetch order data from the server
  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderData(data.orderData?.order_data || []);
      } else {
        console.error("Failed to fetch order data.");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    if (isNaN(dateTime.getTime())) return "Invalid Date";

    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} at ${time}`;
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          {orderData.length > 0 ? (
            orderData
              .slice(0)
              .reverse()
              .map((order, index) => (
                <div key={index} className="col-12">
                  {/* Display Order Date and Time */}
                  {order[0]?.Order_date && (
                    <div className="mt-3">
                      <h5>Order Date: {formatDateTime(order[0].Order_date)}</h5>
                      <hr />
                    </div>
                  )}

                  {/* Display Order Items */}
                  <div className="row">
                    {order
                      .filter((item) => item.name && item.qty && item.size) // Ensure valid items
                      .map((item, itemIndex) => (
                        <div
                          className="col-12 col-md-6 col-lg-3"
                          key={`${index}-${itemIndex}`}
                        >
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{item.qty}</span>
                                <span className="m-1">{item.size}</span>
                                <span className="m-1">Rs. {item.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="col-12 text-center mt-5">
              <h3>No Orders Found</h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
