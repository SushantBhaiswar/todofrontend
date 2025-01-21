import "./header.css";
export default function Header() {
    return (
        <div className="header-main">
            <div className="header-search">
                <input
                    className="search-box"
                    onChange={(e) => {
                        if (e.target.value?.length !== 0) {
                            localStorage.setItem('search', JSON.stringify(e.target.value));
                        } else {
                            localStorage.setItem('search', JSON.stringify(''));
                        }
                    }}
                />
            </div>
            <div className="header-time">
                <p>{new Date().toDateString()}</p>
            </div>
        </div>

    );
}
