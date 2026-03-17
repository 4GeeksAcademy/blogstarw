// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.


// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext();
const API = "https://www.swapi.tech/api";
// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    // Provide the store and dispatch method to all child components.
const getInfo = async (path) => {
    const res = await fetch(`${API}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
};

const swapi = { 
    getRoot: () => getInfo(`/`),
    getPeople: () => getInfo(`/people`),
    getPersonId: (type, id) => getInfo(`/${type}/${id}`),
    getVehicles: () => getInfo(`/vehicles`),
    getPlanets: () => getInfo(`/planets`)
};

    return <StoreContext.Provider value={{ store, dispatch, swapi }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    return useContext(StoreContext);
}