import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

//contexts
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

//custom hook
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  // sets persistCart value to value returned by useLocalStorage hook
  const [persistCart, setPersistCart] = useLocalStorage("cart", []);

  const addItem = item => {
    // add the given item to the cart
    setCart(cart => [...cart, item]);
  };

  const removeItem = itemID => {
    setCart(cart.filter(cartItem => cartItem.id !== Number(itemID)));
  };

  // will set cart state to persistCart state value on initial mount
  useEffect(() => {
    setCart(persistCart);
  }, []);

  // will set persistCart state to current cart value when cart state changes
  useEffect(() => {
    setPersistCart(cart);
  }, [cart]);

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />
          {/* Routes */}
          <Route exact path="/" component={Products} />
          <Route path="/cart" component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
