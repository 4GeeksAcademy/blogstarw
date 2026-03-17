import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import Card from "./Cards.jsx";

export const Home = () => {

  const { store, dispatch, swapi } = useGlobalReducer();

  useEffect(() => {
    Promise.all([
      swapi.getPeople(),
      swapi.getPlanets(),
      swapi.getVehicles(),
      fetch("https://akabab.github.io/starwars-api/api/all.json").then(r => r.json())
    ])
    .then(([peopleData, planetsData, vehiclesData, akababData]) => {
      const imageMap = {};
      akababData.forEach(c => { imageMap[c.name] = c.image; });

      dispatch({ type: "set_home_data", payload: {
        people: peopleData.results || [],
        planets: planetsData.results || [],
        vehicles: vehiclesData.results || []
      }});
      dispatch({ type: "set_character_images", payload: imageMap });
    })
    .catch(console.error);
  }, []);

  const isFavorite = (type, uid) => store.favorites.some((f) => f.type === type && f.uid === uid);

  const toggleFav = (type, item) => {
    const payload = { type, uid: item.uid, name: item.name };
    if (isFavorite(type, item.uid)) {
      dispatch({ type: "remove_favorite", payload: { type, uid: item.uid } });
    } else {
      dispatch({ type: "add_favorites", payload });
    }
  };

  const Section = ({ title, type, items }) => (
    <div className="home-page mb-5">
      <h2 className="text-danger">{title}</h2>
      <div className="d-flex overflow-auto pb-3">
        {items.map((item) => (
          <Card
            key={item.uid}
            item={item}
            type={type}
            isFav={isFavorite(type, item.uid)}
            onToggleFav={() => toggleFav(type, item)}
            characterImages={store.characterImages}  
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <Section title="Characters" type="characters" items={store.people} />
      <Section title="Planets" type="planets" items={store.planets} />
      <Section title="Vehicles" type="vehicles" items={store.vehicles} />
    </div>
  );
};