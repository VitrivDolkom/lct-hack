import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./style/style.scss"
import "./style/_zeroing_style.scss"
import "./style/mixin.scss"
import Signin from "./pages/Signin";
import Saved from "./pages/Saved";
import AuthContext from "./context/autho";
import axios from "axios";
import { useCookies } from "react-cookie";
import getFromSessionStorage from "./storage/storage";
import Successin from "./components/Successin";
import { useContext, useEffect } from "react";

function App() {
  const { auth, setAuth, setSaved } = useContext(AuthContext);
  const [cookie, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const getToken = async () => {
    const response = {
      userName: "Dmitry",
      saved: [{
        userId: 5, id: 45, title: "ut numquam possimus omnis eius suscipit laudantium iure",
        body: "est natus reiciendis nihil possimus aut provident\nex et dolor\nrepellat pariatur est\nnobis rerum repellendus dolorem autem"
      },],
    }
    // const response = await axios.post("", JSON.stringify(cookie.refreshToken), { "Content-type": application / json, withCredentials: true })
    if (cookie.refreshToken !== undefined) {
      setAuth({ userName: response.userName })  
      // setSaved(response.saved);
      // sessionStorage.setItem("saved", JSON.stringify(response.saved))
    } else {
      setAuth({ userName: "", password: "" });
      
    }
  }

  useEffect(() => {
    getToken();
  }, [cookie])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            {auth.userName ? <>
              <Route path=":userId/saved" element={<Saved />}>
                {/* <Route path=":userId/saved"  /> */}
                {/* <Route path=":userId/acc" element={<Account />} /> */}
              </Route>
              <Route path="/:userId" element={<Home />} />
            </>
              : ""}
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/success" element={<Successin />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
