// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Single component which displays individual item details.
export default function Single() {
  // Access the global state using the custom hook.
  const { swapi, store } = useGlobalReducer();
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve the 'theId' URL parameter using useParams hook.
  const fallbackURL = "https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg";
  const swapiType = type === "characters" ? "people" : type;

   useEffect(() => {
    if (!swapiType || !uid) return;
    setLoading(true);
    swapi
      .getPersonId(swapiType, uid)
      .then((data) => {
        setItem(data?.result?.properties || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [swapi, swapiType, uid]);

   if (loading) return <div className="container py-4">Loading...</div>
  if (!item) return <div className="container py-4">Not found!</div>

  const imgURL = type === "characters" && store.characterImages && store.characterImages[item?.name]
    ? store.characterImages[item.name]
    : fallbackURL;

  return (
    <>
      <div className="home-page container py-4">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={imgURL}
                className="img-fluid rounded-start"
                alt={item.name}
                style={{ objectFit: "cover", maxHeight: "300px", width: "100%" }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackURL;
                }} />
            </div>
            <div className="col-md-6 p-4 text-center d-flex flex-column justify-content-center">
              <h1>{item.name}</h1>
              <p className="text-muted">
                {type === "characters" && (
                  <>{item.name} is a character with {item.gender} gender, born in {item.birth_year}, with {item.eye_color} eyes.</>
                )}
                {type === "planets" && (
                  <>{item.name} is a planet with {item.climate} climate and {item.terrain} terrain.</>
                )}
                {type === "vehicles" && (
                  <>{item.name} is a {item.vehicle_class} manufactured by {item.manufacturer}.</>
                )}
              </p>
            </div>
          </div>
          <div className="card-body border-top">
            <div className="row text-warning text-center">
              {Object.entries(item)
                .filter(([key, value]) => key !== "name" && value != null).slice(0, 6)
                .map(([key, value]) => (
                  <div className="col" key={key}>
                    <div className="fw-bold">{key}</div>
                    <div>{String(value)}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Link to="/" className="btn btn-outline-secondary">Back home</Link>
        </div>
      </div>
    </>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
