import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001";

const Popular = () => {
  const [pop_in_woman, setPop_in_woman] = useState([]);

  useEffect(() => {
    const fetchPopinWoman = async () => {
      try {
        const response = await fetch(`${API_URL}/popinwoman`);

        if (!response.ok) {
          throw new Error("Failed to fetch popular women products");
        }

        const data = await response.json();
        setPop_in_woman(data);
      } catch (error) {
        console.error("Error fetching popular women products:", error);
      }
    };

    fetchPopinWoman();
  }, []);

  return (
    <div className="popular">
      <h2>POPULAR IN WOMEN</h2>
      <hr />
      <div className="popular-items">
        {pop_in_woman.map((item) => (
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

export default Popular;
