import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../context/autho";
import axios from "axios";
import { Link } from "react-router-dom"
import Successin from "../../components/Successin";
import { useCookies } from "react-cookie";

import "./style.scss";
import Preloader from "../../components/Preloader";

const Login = () => {
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken']);

    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [isWaiting, setIsWaiting] = useState(false);


    const submitUser = async (e) => {
        e.preventDefault();
        let date = new Date();
        date.setDate(date.getDate() + 10e5);

        const response = {
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSld",
            "refresh_token": "1eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgS",
            "expires_in": 124234149563,
        }
        // sessionStorage.setItem("tokenData", JSON.stringify(response.data));
        setCookies('accessToken', JSON.stringify(response.access_token), { path: "/", sameSite: 'none', secure: true });
        setCookies('refreshToken', JSON.stringify(response.refresh_token), { path: "/", sameSite: 'none', secure: true, maxAge: 2147483647 });
        // 
        // protect();
        setIsWaiting(true);
        try {

            // const response = await axios.post(
            //     "http://localhost/",
            //     JSON.stringify({ userName, password: pass }),
            //     {
            //         headers: { 'Content-type': "application/json" },
            //         withCredentials: true,
            //     }
            // );

            setAuth({ userName: userName, password: pass });
            sessionStorage.setItem("user", JSON.stringify({ userName, password: pass }));
            // console.log(response.data);
            setSuccess(true);
            setUserName('');
            setPass('');
            setIsWaiting(false);
        } catch (err) {
            if (!err?.response) {
                setErrorMessage("Сервер не отвечает");
            } else if (err.response?.status === 400) {
                setErrorMessage("Неправильно введено имя или пароль");
            } else {
                setErrorMessage("Ошибка входа");
            }

            errRef.current.focus();
            console.log(err);
        }


    }

    useEffect(() => {
        setErrorMessage('');
    }, [userName, pass])

    return (
        <>
            {
                success ?
                    <Successin type={"login"} />
                    :
                    (<section className="login">
                        <div className="border"></div>
                        <div className="log-wrap">
                            <p ref={errRef}
                                className={errorMessage ? "error" : "okey"}>{errorMessage}</p>
                            <h1>Вход</h1>
                            <form onSubmit={(e) => submitUser(e)}>
                                <label htmlFor="user">Логин</label>
                                <input type="text"
                                    autoFocus
                                    id="user"
                                    ref={userRef}
                                    autoComplete="off"
                                    required
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName} />
                                <label htmlFor="password">Пароль</label>
                                <input type="password"
                                    id="password"
                                    required
                                    ref={userRef}
                                    onChange={(e) => setPass(e.target.value)}
                                    value={pass} />

                                <div className="wait">
                                    {isWaiting ? <Preloader /> : ""}

                                    <button disabled={!userName || !pass ? true : false}
                                    // onClick={() => }
                                    > 
                                        Войти
                                    </button>
                                </div>



                                <p className="reg">
                                    У вас ещё нет аккаунта? <br />
                                    <Link to="/signin">
                                        <span>Зарегестрируйтесь</span>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </section>)
            }
        </>


    );
}

export default Login;