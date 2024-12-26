import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [search, setsearch] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
    // console.log(response[0], response[1])
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ "z-index": "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{
                    setsearch(e.target.value)
                  }}
                />
               
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="/pizza.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="hello"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/burger.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Hi"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/pasta.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Hey"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((data) => {
              return (
                <>
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />

                    {foodItem.length > 0 ? (
                      foodItem
                        .filter(
                          (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleString())
                        ))
                        .map((filterItems) => {
                          return (
                            <div
                              className="col-12 col-md-6 col-lg-3"
                              key={filterItems._id}
                            >
                              <Card
                               foodItem = {filterItems}
                                options={filterItems.options[0]}
                               
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div>No data found</div>
                    )}
                  </div>
                </>
              );
            })
          : "No categories available"}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
