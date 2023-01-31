import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Warehouse = () => {
  const [inventory] = useState([
    {
      art_id: "1",
      name: "Leg",
      stock: 12,
    },
    {
      art_id: "2",
      name: "Screw",
      stock: 17,
    },
    {
      art_id: "3",
      name: "Seat",
      stock: 2,
    },
    {
      art_id: "4",
      name: "Table top",
      stock: 1,
    },
  ]);

  const [products, setProducts] = useState([
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

  const handleAddAmount = (
    productIndex: number,
    articleIndex: number,
    amount: number
  ) => {
    const newProducts = [...products];
    newProducts[productIndex].contain_articles[articleIndex].amount_of +=
      amount;
    setProducts(newProducts);
  };

  return (
    <div>
      <div className={styles.inventory}>
        <h1>Inventory</h1>
      </div>
      <div className={styles.productlist}>
        <h1 className={styles.available}>Available Products</h1>

        <ul>
          {inventory.map((item) => (
            <li key={item.art_id}>
              {item.name} - {item.stock}
            </li>
          ))}
        </ul>

        <h1>Products</h1>
        <ul>
          {products.map((product, productIndex) => (
            <li key={product.name}>
              {product.name}
              <ul>
                {product.contain_articles.map((article, articleIndex) => (
                  <li key={article.art_id}>
                    {article.art_id} - {article.amount_of}
                    <button
                      onClick={() =>
                        handleAddAmount(productIndex, articleIndex, -1)
                      }
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        handleAddAmount(productIndex, articleIndex, 1)
                      }
                    >
                      +
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Warehouse;
