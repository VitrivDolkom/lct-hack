import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../context/autho";
import axios from "axios";
import { Link } from "react-router-dom"
import Successin from "../../components/Successin";
import "./style.scss";
import Preloader from "../../components/Preloader";


const USER_REGEX = /^[A-Za-z]+[A-Za-z0-9_-]{2,16}$/;
const PASS_REGEX = /^[A-Za-z]+[A-Za-z0-9_-]{5,18}$/;

const Signin = () => {
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();


    const [userName, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);


    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);


    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [isWaiting, setIsWaiting] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();

        const b1 = USER_REGEX.test(userName);
        const b2 = PASS_REGEX.test(password);
        if (!b1 || !b2) {
            setErrorMessage("Некорректный ввод");
            return;
        }
        setIsWaiting(true);

        try {
            // const response = await axios.post(
            //     "",
            //     JSON.stringify({ userName, password: password }),
            //     {
            //         headers: { 'Content-type': "application/json" },
            //         withCredentials: true,
            //     }
            // );
            setAuth({ userName, password });
            sessionStorage.setItem("user", JSON.stringify({ userName, password }));
            // console.log(response.data);
            setSuccess(true);
            setUserName('');
            setPassword('');
            setIsWaiting(false);
        } catch (err) {
            if (!err?.response) {
                setErrorMessage("Сервер не отвечает");
            } else if (err.response?.status === 405) {
                setErrorMessage("Пользователь с таким ником уже существует");
            } else {
                setErrorMessage("Ошибка регистрации");
            }

            errRef.current.focus();
            // console.log(err);
        }


    }

    // useEffect(() => {
    //     // userRef.current.focus();
    // }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(userName));
    }, [userName])

    useEffect(() => {
        setValidPassword(PASS_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('');
    }, [password, userName, matchPassword])


    return (
        <>
            {
                success ?
                    <Successin type={"signin"} />
                    :
                    (<section className="signin login">
                        <div className="border"></div>
                        <div className="log-wrap">
                            <p
                                ref={errRef}
                                className={errorMessage ? "error" : "okey"}
                            >{errorMessage}</p>
                            <h1>Регистрация</h1>
                            <form onSubmit={(e) => registerUser(e)}>
                                <label htmlFor="user">Логин</label>
                                <input type="text"
                                    autoFocus
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                    required
                                    aria-describedby="name-rule"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)} />
                                <p id="name-rule"
                                    className={userName && !validName ? "show" : "hide"}>
                                    Длина от 3 до 16. <br />
                                    Начинается с буквы. <br />
                                    Разрешены латиница, _-. <br />
                                </p>


                                <label htmlFor="password">Пароль</label>
                                <input type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    aria-describedby="password-rule"
                                    required
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)} />
                                <p id="password-rule"
                                    className={password && !validPassword ? "show" : "hide"}>
                                    Длина от 3 до 16. <br />
                                    Начинается с буквы. <br />
                                    Разрешены латиница, _-. <br />
                                </p>

                                <label htmlFor="matchPassword">Подтвердите пароль</label>
                                <input type="password"
                                    id="matchPassword"
                                    onChange={(e) => setMatchPassword(e.target.value)}
                                    value={matchPassword}
                                    aria-describedby="match-password-rule"
                                    required
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)} />
                                <p id="match-password-rule"
                                    className={matchPassword && !validMatch ? "show" : "hide"}>
                                    Пароли должны совпадать.
                                </p>

                                <div className="wait">
                                    {isWaiting ? <Preloader /> : ""}
                                    <button className="btn-login"
                                        disabled={!userName || !validName || !validPassword || !password || !matchPassword || !validMatch ? true : false}>
                                        Продолжить
                                    </button>
                                </div>


                                <p className="reg">
                                    У вас уже есть аккаунт? <br />
                                    <Link to="/login">
                                        <span>Войдите</span>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </section>)
            }
        </>


    );
}

export default Signin;