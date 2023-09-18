import "./style/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
