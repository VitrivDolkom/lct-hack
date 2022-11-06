import Navbar from "../Navbar";
import "./style.scss";
import down from "../../img/down.svg";

const FullScreen = () => {

    const scrollDown = () => {
        const body = document.querySelector("body");
        body.scrollTo({
            left: 0,
            top: window.innerHeight,
            behavior: "smooth",
        });
    }
    return (
        <div className="full">

            <div className="box">
                <Navbar />
                <h1 className="task-name">Выявление<br /> перспективных<br /> производственных<br /> ниш</h1>
                <div className="to-down" onClick={() => scrollDown()}>
                    <img src={down} alt="" />
                </div>
            </div>
        </div>
    );
}

export default FullScreen;