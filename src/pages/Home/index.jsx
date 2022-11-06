
import { useEffect, useState } from "react";

import Dashboards from "../../components/Dashboards";
import FullScreen from "../../components/FullScreen";

import SearchProducts from "../../components/SearchProducts";
import "./style.scss"


const Home = () => {

    return (
        <section className="home">
            <FullScreen />
            
            <div className="main-box">
                <main>
                    <Dashboards />
                    <SearchProducts />
                </main>
            </div>
        </section>
    );
}

export default Home;