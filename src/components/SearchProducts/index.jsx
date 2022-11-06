import axios from "axios";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import "./style.scss"
import Filters from "../Filters";

import AuthContext from "../../context/autho";
import { useContext } from "react";

import getFromSessionStorage from "../../storage/storage";

import { CSSTransition } from "react-transition-group";
import { useCookies } from "react-cookie";


const SearchProducts = () => {
    const { auth, saved, setSaved } = useContext(AuthContext);

    const [cookie, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState([]);
    const [loadedPosts, setloadedPosts] = useState(false);
    const [prodPerPage, setProdPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(getFromSessionStorage("currentPage", 1));
    const [searchValue, setSearchValue] = useState(getFromSessionStorage("search", ""));


    let firstProdIndex = prodPerPage * (currentPage - 1);
    let lastProdIndex = prodPerPage * currentPage;

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setProductsToShow(response.data.filter((el) => el.id % 2 === 1));
                setProducts(response.data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                setloadedPosts(true);
            });
        // axios.get('http://46.243.226.189/s', {})
        // .then(response => {
        //     // const arr = []
        //     // arr = response.data;
        //     console.log(response.data);
        //     // console.log(arr);
        // })
        // .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        sessionStorage.setItem("currentPage", (currentPage));
    }, [currentPage, prodPerPage])

    useEffect(() => {
        sessionStorage.setItem("search", (searchValue));
    }, [searchValue])

    const saveProd = async (prod) => {
        // console.log([...saved, 1]);
        setSaved(prev => [...prev, prod]);
        
    }

    const renderButton = (prod) => {
        let isAded = false;

        saved.forEach(el => {
            if (el.title === prod.title) isAded = true;
        });

        if (isAded) {
            return (
                <li>
                    {prod.title}
                    { auth.userName ? <button onClick={() => deleteProd(prod)}>-</button> : "" }
                </li>
            );
        } else {
            return (
                <li>
                    {prod.title}
                    { auth.userName ? <button onClick={() => saveProd(prod)}>+</button> : "" }
                </li>
            );
        }

    }

    const postSaved = async () => {
        try {
            // const response = await axios.post(
            //     "",
            //     JSON.stringify({cookie, saved}),
            //     {
            //         headers: { 'Content-type': "application/json" },
            //         withCredentials: true,
            //     }
            // );

        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        sessionStorage.setItem("saved", JSON.stringify(saved));
        postSaved();
    }, [saved])

    const deleteProd = (prod) => {
        setSaved(prev => prev.filter(el => el.id !== prod.id));
    }


    return (
        <div className="search_box">
            <h3>Здесь вы можете посмотреть разные ...</h3>
            <div className="search_products">
                <div className="top">
                    <input type="text"
                        placeholder="Поиск"
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue} />
                    <Filters />
                </div>

                <div className="prod_list">
                    <ul className="info-list">
                        {
                            productsToShow.slice(firstProdIndex, lastProdIndex).map(el => {
                                return (
                                    <CSSTransition in={loadedPosts}
                                        unmountOnExit
                                        classNames="test"
                                        timeout={300}
                                        key={el.id}>
                                        {() => renderButton(el)}

                                    </CSSTransition>

                                )
                            })

                        }

                    </ul>

                    {
                        loadedPosts ? <Pagination perPage={prodPerPage}
                            quantity={productsToShow.length}
                            changeCurPage={(ind) => setCurrentPage(ind)}
                            currentPage={currentPage} />
                            : ""}
                </div>
            </div>
        </div>

    );
}

export default SearchProducts;