import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import API_URL from "../../config";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await fetch(`${API_URL}/newcollections`);

        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }

        const data = await response.json();
        setNewCollection(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item) => (
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
