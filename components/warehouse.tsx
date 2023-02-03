import React, { useState, useEffect } from "react";
import styles from "./warehouse.module.css";

const Warehouse = () => {
  const [inventory, setInventory] = useState(initialInventory);

  const [products] = useState(initialProducts);

  const currentNumberOfSeat = inventory.find(
    (article) => article.art_id === "3"
  )?.stock;

  const initialNumberOfSeat = initialInventory.find(
    (article) => article.art_id === "3"
  )?.stock;

  const currentNumberOfTableTop = inventory.find(
    (article) => article.art_id === "4"
  )?.stock;

  const initialNumberOfTableTop = initialInventory.find(
    (article) => article.art_id === "4"
  )?.stock;

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

    if (
      product.name === "Dining Chair" &&
      initialNumberOfSeat === currentNumberOfSeat
    ) {
      return;
    }
    if (
      product.name === "Dining Table" &&
      initialNumberOfTableTop === currentNumberOfTableTop
    ) {
      return;
    }

    setInventory(updatedInventory);
  };

  return (
    <>
      <div className={styles.inventory}>
        <h2>Inventory</h2>
        <ul>
          {inventory.map((article) => (
            <li key={article.art_id}>
              Art. ID: {article.art_id} - {article.name} - Available stock:{" "}
              {article.stock}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.name} className={styles.card}>
              <h3>
                {product.name} {"- Available:"}{" "}
                {product.name === "Dining Chair" ? currentNumberOfSeat : null}
                {product.name === "Dining Table"
                  ? currentNumberOfTableTop
                  : null}
              </h3>
              <p>Price: {product.price}</p>
              <div>
                {product.contain_articles.map((article) => (
                  <div key={article.art_id}>
                    <p>
                      Art. ID: {article.art_id} - Amount: {article.amount_of}
                    </p>
                  </div>
                ))}
              </div>

              <button
                className={styles.addbutton}
                onClick={() => onAddToCartClick(product)}
              >
                Add to cart
              </button>
              <button
                className={styles.removebutton}
                onClick={() => onRemoveFromCartClick(product)}
              >
                Remove from cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Warehouse;
const initialInventory = [
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
];

const initialProducts = [
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
] as const;
