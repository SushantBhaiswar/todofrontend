import "./header.css";
export default function Header() {
    return (
        <div className="header-main">
            <div className="header-search">
                <input className="search-box"></input>
            </div>
            <div className="header-time">
                <p>{new Date().toDateString()}</p>
            </div>
        </div>

    );
}
