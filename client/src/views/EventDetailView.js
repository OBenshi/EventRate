import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function EventDetailView(params) {
  const { partyName } = useParams();
  const [party, setParty] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/parties/${partyName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setParty(data[0]);
      });
  }, []);
  return (
    <div>
      <h1>event detail {party.name}</h1>
      {party.Djs && party.Djs.map((dj) => <p>{dj}</p>)}
    </div>
  );
}

export default EventDetailView;
