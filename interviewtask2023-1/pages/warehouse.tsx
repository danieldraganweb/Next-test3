import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Warehouse = () => {
  const [inventory, setInventory] = useState([
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
      price: 150,
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
      name: "Dining Table",
      price: 300,
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

  const checkProductAvailability = (product: { contain_articles: any }) => {
    for (const article of product.contain_articles) {
      const foundArticle = inventory.find(
        (inventoryArticle) => inventoryArticle.art_id === article.art_id
      );
      if (!foundArticle || foundArticle.stock < article.amount_of) {
        return false;
      }
    }
    return true;
  };

  const onAddToCartClick = (product: {
    name?: string;
    price?: number;
    contain_articles: any;
  }) => {
    if (checkProductAvailability(product)) {
      const updatedInventory = inventory.map((inventoryArticle) => {
        for (const article of product.contain_articles) {
          if (inventoryArticle.art_id === article.art_id) {
            return {
              ...inventoryArticle,
              stock: inventoryArticle.stock - article.amount_of,
            };
          }
        }
        return inventoryArticle;
      });
      setInventory(updatedInventory);
    } else {
      alert("Product is out of stock");
    }
  };

  const onRemoveFromCartClick = (product: {
    name?: string;
    price?: number;
    contain_articles: any;
  }) => {
    const updatedInventory = inventory.map((inventoryArticle) => {
      for (const article of product.contain_articles) {
        if (inventoryArticle.art_id === article.art_id) {
          return {
            ...inventoryArticle,
            stock: inventoryArticle.stock + article.amount_of,
          };
        }
      }
      return inventoryArticle;
    });
    setInventory(updatedInventory);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.name} className={styles.card}>
            <h2>Inventory</h2>
            <ul>
              {inventory.map((article) => (
                <li key={article.art_id}>
                  {article.art_id} - {article.name} - {article.stock}
                </li>
              ))}
            </ul>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>
              {product.contain_articles.map((article) => (
                <div key={article.art_id}>
                  <p>
                    {article.art_id} - {article.amount_of}
                  </p>
                </div>
              ))}
            </p>
            <button onClick={() => onAddToCartClick(product)}>
              Add to cart
            </button>
            <button onClick={() => onRemoveFromCartClick(product)}>
              Remove from cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warehouse;
