import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [search, setsearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      {/* Carousel Section */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control w-75 search-bar"
                type="search"
                placeholder="Search for food..."
                aria-label="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="/pizza.jpg"
              className="d-block w-100 carousel-image"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/burger.jpg"
              className="d-block w-100 carousel-image"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/pasta.jpg"
              className="d-block w-100 carousel-image"
              alt="Pasta"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Categories and Items Section */}
      <div className="container my-5">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="food-category mb-5">
              <h3 className="food-category-title">{data.CategoryName}</h3>
              <hr />
              <div className="row">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        className="col-12 col-md-6 col-lg-3 mb-4"
                        key={filterItems._id}
                      >
                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                      </div>
                    ))
                ) : (
                  <div>No data found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          "No categories available"
        )}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
