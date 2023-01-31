import React, { useState } from "react";
import styles from "../styles/Warehouse.module.css";

const Warehouse = () => {
  const [inventory] = useState([
    {
      art_id: "1",
      name: "leg",
      stock: 12,
    },
    {
      art_id: "2",
      name: "screw",
      stock: 17,
    },
    {
      art_id: "3",
      name: "seat",
      stock: 2,
    },
    {
      art_id: "4",
      name: "table top",
      stock: 1,
    },
  ]);

  const [products] = useState([
    {
      name: "Dining Chair",
      contain_articles: [
        {
          art_id: "1",
          amount_of: 4,
        },
        {
          art_id: "2",
          amount_of: 8,
        },
        {
          art_id: "3",
          amount_of: 1,
        },
      ],
    },
    {
      name: "Dinning Table",
      contain_articles: [
        {
          art_id: "1",
          amount_of: 4,
        },
        {
          art_id: "2",
          amount_of: 8,
        },
        {
          art_id: "4",
          amount_of: 1,
        },
      ],
    },
  ]);

  return (
    <div>
      <h1 className={styles.inventory}>Inventory</h1>
      <h1>Available Products</h1>

      <ul>
        {inventory.map((item) => (
          <li key={item.art_id}>
            {item.name} - {item.stock}
          </li>
        ))}
      </ul>

      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            {product.name}
            <ul>
              {product.contain_articles.map((article) => (
                <li key={article.art_id}>
                  {article.art_id} - {article.amount_of}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Warehouse;
