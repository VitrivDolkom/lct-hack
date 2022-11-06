import "./style.scss";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";

const Successin = ({ type }) => {

    // window.addEventListener("keydown", (e) => {
    //     if (e.key === "Enter") {
    //         window.location.href = "/";
    // }
    // })

    return (
        <div className="success">
            <div className="success-wrap">
                <h1>{type === "login" ? "Вы успешно вошли" : "Добро пожаловать"}</h1>

                {type === "signin" ?
                    <Link to="/login">
                        <button className="btn-login">Войдите</button>
                    </Link> :
                    <Link to="/">
                        <button type="submit" className="btn-login">На главную</button>
                    </Link>}

            </div>
        </div>
    );
}

export default Successin;