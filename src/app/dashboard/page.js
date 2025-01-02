import "./page.css";
import Header from "../../components/header/header"
import Filter from "../../components/filter/filter"
export default function TestPage() {
    return (
        <div className="dashbord-main">
            <Header />

            <div className="title-box">
                <p>All tasks (3 tasks)</p>
            </div>
            <Filter />
        </div>
    );
}
