import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMeal, getMealById } from "../actions/mealActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
export default function Editmeal({ match }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [regularprice, setregularprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getmealbyidstate = useSelector((state) => state.getMealByIdReducer);

  const { meal, error, loading } = getmealbyidstate;

  const editmealstate = useSelector((state) => state.editMealReducer);
  const { editloading, editerror, editsuccess } = editmealstate;

  useEffect(() => {
    if (meal) {
      if (meal._id === match.params.mealid) {
        setname(meal.name);
        setdescription(meal.description);
        setcategory(meal.category);
        setregularprice(meal.prices[0]["regular"]);
        setlargeprice(meal.prices[0]["large"]);
        setimage(meal.image);
      } else {
        dispatch(getMealById(match.params.mealid));
      }
    } else {
      dispatch(getMealById(match.params.mealid));
    }
  }, [meal, dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const editedmeal = {
      _id: match.params.mealid,
      name,
      image,
      description,
      category,
      prices: {
        regular: regularprice,
        large: largeprice,
      },
    };

    dispatch(editMeal(editedmeal));
  }

  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Edit Meal</h1>
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editsuccess && <Success success="Meal details edited successfully" />}
        {editloading && <Loading />}

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
            Edit Meal
          </button>
        </form>
      </div>
    </div>
  );
}
