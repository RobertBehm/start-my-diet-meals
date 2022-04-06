export const addToCart = (meal, quantity, size) => (dispatch, getState) => {
  var cartItem = {
    name: meal.name,
    _id: meal._id,
    image: meal.image,
    size: size,
    quantity: Number(quantity),
    prices: meal.prices,
    price: meal.prices[0][size] * quantity,
  };

  if (cartItem.quantity > 10) {
    alert("You cannot add more than 10 quantities");
  } else {
    if (cartItem.quantity < 1) {
      dispatch({ type: "DELETE_FROM_CART", payload: meal });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
  }

  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteFromCart = (meal) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: meal });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
