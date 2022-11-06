import "./style.scss"
import name from "../../img/name.svg"
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/autho";
import { useCookies } from "react-cookie";

import avatar from "../../img/acc.svg"
import depart from "../../img/departament.svg";

const Navbar = () => {
    const [cookie, setCookies, removeCookies] = useCookies(['accessToken', 'refreshToken'])
    const { auth, setAuth } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="nav-left">
                <img src={depart} alt="" />
            </div>
            <div className="svg"></div>
            {!auth.userName ?
                <Link to="/login">
                    <div className="tolog">
                        логин
                        <img src={avatar} alt="" />
                    </div>
                </Link> :
                <button
                    className="tolog"
                    onClick={() => {
                        setAuth({ userName: "", password: "" });
                        sessionStorage.setItem("user", JSON.stringify({ userName: "", password: "" }));
                        sessionStorage.setItem("saved", JSON.stringify([]));

                        removeCookies('accessToken');
                        removeCookies('refreshToken');
                    }}>Выйти</button>}

        </div>
    );
}

export default Navbar;