import { useContext } from 'react'
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Setting from "./pages/Setting/Setting";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from "react-router-dom"
import { Context } from "./context/Context";

const App = () => {
  const {user} = useContext(Context)
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        {user ? <Home /> : <Login />}
      </Route>
      <Route path="/register">
        {user ? <Home /> : <Register />}
      </Route>
      <Route path="/write" >
        {user ? <Write /> : <Register />}
      </Route>
      <Route path="/post/:postId" >
        <Single />
      </Route>
        <Route path="/setting" >
         {user ? <Setting /> : <Register />}
        </Route>
       </Switch>
    </Router>
  );
}

export default App;
