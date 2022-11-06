import "./style.scss"
import logo from "./img/logo.svg"
import { Link } from "react-router-dom";

import AuthContext from "../../context/autho";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

const Sidebar = () => {
    const [cookies, setCookies, removeCookies] = useCookies(['accessToken', 'refreshToken']);

    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(auth));
    }, [auth])

    return (
        <div className="sidebar">
            <div className="top">
                <img src={logo} alt="logo" />
                <span>Positive-Negative</span>
            </div>

            <div className="main">
                <ul>
                    <Link to="/">
                        <li><span>Home</span></li>
                    </Link>
                    {auth.userName ? <Link to={`/${auth.userName}/saved`}>
                        <li><span>Saved</span></li>
                    </Link> : ""}
                </ul>
            </div>
            <footer>
                <Link to="/">
                    <button disabled={!auth.userName ? true : false}

                        onClick={() => {
                            setAuth({ userName: "", password: "" });
                            sessionStorage.setItem("user", JSON.stringify({ userName: "", password: "" }));
                            sessionStorage.setItem("saved", JSON.stringify([]));

                            removeCookies('accessToken');
                            removeCookies('refreshToken');
                        }}>logout</button>
                </Link>


            </footer>
        </div>
    );
}

export default Sidebar;