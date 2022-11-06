import Dashboard from "../Dashboard";
import "./style.scss"

const Dashboards = () => {
    return (
        <div className="offer">
            <h2>Наиболее популярные нишы на данный момент</h2>
            <div className="dashboards">
                <ul >
                    <Dashboard />
                    <Dashboard />
                    <Dashboard />
                    <Dashboard />
                </ul>
            </div>
        </div>
    );
}

export default Dashboards;