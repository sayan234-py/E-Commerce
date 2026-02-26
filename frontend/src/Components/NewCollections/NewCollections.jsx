import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001";

const NewCollections = () => {
  const [new_collection, setNewcollection] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await fetch(`${API_URL}/newcollections`);

        if (!response.ok) {
          throw new Error("Failed to fetch new collections");
        }

        const data = await response.json();
        setNewcollection(data);
      } catch (error) {
        console.error("Error fetching new collections:", error);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item) => (
          <Item
            key={item.id}
            id={item.id}                 
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
