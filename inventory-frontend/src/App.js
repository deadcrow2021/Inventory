import Products from "./components/Products";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductsCreate from "./components/ProductsCreate";
import Orders from "./components/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Products}/>
        <Route path="/create" Component={ProductsCreate}/>
        <Route path="/orders" Component={Orders}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
