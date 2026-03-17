import { Link } from "react-router-dom";

export default function Card({ item, type, isFav, onToggleFav, characterImages }) {
    const fallbackURL = "https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg";

    const imgURL = type === "characters" && characterImages && characterImages[item.name]
        ? characterImages[item.name]
        : fallbackURL;

    return (
        <>
            <div className="card me-3" style={{ minWidth: "18rem" }}>
                <img
                    src={imgURL}
                    className="card-img-top"
                    alt={item.name}
                    loading="lazy"
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackURL;
                    }} />

                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted mb-3">Click on "Learn more" for details.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link className="btn btn-outline-secondary" to={`/single/${type}/${item.uid}`}>Learn more</Link>
                        <button className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
                            onClick={onToggleFav}
                            title="Favorite">❤</button>
                    </div>
                </div>
            </div>
        </>
    );
}