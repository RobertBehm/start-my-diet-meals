import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterMeals } from "../actions/mealActions";

export default function Filter() {
  const dispatch = useDispatch();
  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");

  return (
    <div className="container">
      <div className="row justify-content-center shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-md-3 w-100">
          <input
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            value={searchkey}
            type="text"
            className="form-control w-100"
            placeholder="search meals"
          />
        </div>
        <div className="col-md-3 w-100">
          <select
            className="form-control w-100 mt-2"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="col-md-3 w-100">
          <button
            className="btn w-100 mt-2"
            onClick={() => {
              dispatch(filterMeals(searchkey, category));
            }}
          >
            FILTER
          </button>
        </div>
      </div>
    </div>
  );
}
