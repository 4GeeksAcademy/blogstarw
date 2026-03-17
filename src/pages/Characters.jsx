import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

function People() {
    const { swapi } = useGlobalReducer();
    const [people, setPeople] = useState([]);

    return (
        <>
            <div className="container">
                <h1>People</h1>

                {people.map((p) => (
                    <div key={p.uid}>
                        <Link to={`/single/people/${p.uid}`}>{p.name}</Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default People; 