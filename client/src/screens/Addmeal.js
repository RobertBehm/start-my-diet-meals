import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMeal } from "../actions/mealActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

export default function Addmeal() {
  const [name, setname] = useState("");
  const [regularprice, setregularprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const dispatch = useDispatch();

  const addmealstate = useSelector((state) => state.addMealReducer);
  const { success, error, loading } = addmealstate;
  function formHandler(e) {
    e.preventDefault();

    const meal = {
      name,
      image,
      description,
      category,
      prices: {
        regular: regularprice,
        large: largeprice,
      },
    };

    console.log(meal);
    dispatch(addMeal(meal));
  }

  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Add Meal</h1>

        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {success && <Success success="New meal added successfully" />}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="regular size price"
            value={regularprice}
            onChange={(e) => {
              setregularprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="large size price"
            value={largeprice}
            onChange={(e) => {
              setlargeprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="image url"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Add meal
          </button>
        </form>
      </div>
    </div>
  );
}
