import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../components/Navbar/style.scss";
import "../../components/Sidebar/style.scss";


import AuthContext from "../../context/autho";

import { useContext } from "react";
import { useEffect } from "react";

const Saved = () => {
    const { auth, saved } = useContext(AuthContext);

    // useEffect(() => {

    // }, )

    return (
        <section className="saved sec">
            <Sidebar />
            <div className="box">
                <Navbar />
                <main>
                    {auth.userName ? saved.map((el, index) => <li key={index}>{el.title}</li>) : ""}
                    {/* <Dashboards />
                    <SearchProducts /> */}

                </main>
            </div>
        </section>
    );
}

export default Saved;