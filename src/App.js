import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Products from "./components/Products";

function App() {
  const [token, settoken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Login settoken={settoken} />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header settoken={settoken} />
            <Products token={token} />
          </Route>
          <Route>
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;