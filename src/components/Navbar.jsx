import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import babyYoda from "../assets/baby_yoda.png";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFav = (fav) => {
    dispatch({ type: "remove_favorite", payload: { type: fav.type, uid: fav.uid } });
  };

  return (
    <nav className="navbar navbar-dark mb-4" style={{ backgroundColor: "rgba(0,0,0,0.85)", borderBottom: "2px solid #FFE81F" }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src={babyYoda}
            alt="Baby Yoda"
            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span style={{ color: "#FFE81F", fontWeight: "bold", fontSize: "1.3rem" }}>Star Wars</span>
        </Link>

        <div className="dropdown">
          <button className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Favorites <span className="badge bg-dark">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: 260, backgroundColor: "rgba(0,0,0,0.95)", border: "1px solid #FFE81F" }}>
            {store.favorites.length === 0 ? (
              <li className="dropdown-item" style={{ color: "#adb5bd" }}>No favorites so far</li>
            ) : (
              store.favorites.map((fav) => (
                <li key={`${fav.type}-${fav.uid}`} className="dropdown-item d-flex justify-content-between align-items-center">
                  <Link to={`/single/${fav.type}/${fav.uid}`} className="me-3 text-decoration-none" style={{ color: "#FFE81F" }}>
                    {fav.name}
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFav(fav)}>🗑</button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};