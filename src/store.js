export const initialStore= () => ({
    message: null,
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],
    characterImages: {},
  });


export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return{...store, people: action.payload};

      case "set_planets":
        return{...store, planets: action.payload};

        case "set_vehicles":
          return {...store, vehicles: action.payload};

          case "set_home_data":
            return {
              ...store,
              people: action.payload.people,
              planets: action.payload.planets, 
              vehicles: action.payload.vehicles
            };

          case "add_favorites": {
            const fav = action.payload;

            const duplicated = store.favorites.some(
              (f) => f.type === fav.type && f.uid === fav.uid
            );
            if (duplicated) return store;

            return { ...store, favorites: [...store.favorites, fav] };
          }
          case "set_character_images":
            return { ...store, characterImages: action.payload };

          case "remove_favorite": {
          const { type, uid } = action.payload;
          return {
            ...store,
            favorites: store.favorites.filter((f) => !(f.type === type && f.uid === uid))
          };
        }
        default:
          return store;
  }    
}
