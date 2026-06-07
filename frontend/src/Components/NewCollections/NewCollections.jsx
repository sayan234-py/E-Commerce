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
        if (!response.ok) throw new Error("Failed to fetch collections");
        const data = await response.json();
        setNewCollection(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchNewCollections();
  }, []);

  return (
    <div className="genz-new-collections">
      
      {/* Brutalist Header Block */}
      <div className="nc-header">
        <span className="nc-badge">! JUST ARRIVED</span>
        <h1 className="nc-title">
          <span className="hollow">NEW</span>
          <div className="solid">COLLECTIONS.</div>
        </h1>
      </div>

      {/* Grid Container */}
      <div className="nc-grid">
        {newCollection.map((item) => (
          /* Brutalist wrapper forces the styling onto the Item component */
          <div className="brutalist-item-wrapper" key={item.id}>
            <Item
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default NewCollections;
