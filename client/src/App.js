import "./App.css";
import { Route, Switch } from "react-router-dom";
import Details from "./Components/Details/Details";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import LandingPage from "./Components/Landing/LandingPage";
import Category from "./Components/Category/Category";
import Favoritos from "./Components/Favoritos/Favoritos";
import Cart from "./Components/Cart/Cart";
import FollowUp from "./Components/Estado de Orden/FollowUp";
import Error from "./Components/Error/Error";
import Login from "./Components/Login/Login";
import Verify from "./Components/Verify/Verify";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import QA from "./Components/QA/QA";
import Payment from "./Components/Payment/Payment";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Details} />
        <Route exact path="/about" component={About} />
        <Route exact path="/favorites" component={Favoritos} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/category/:name" component={Category} />
        <Route exact path="/followUp" component={FollowUp} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/qa" component={QA} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
