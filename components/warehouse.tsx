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

  const initialNumberOfScrews = initialInventory.find(
    (article) => article.art_id === "2"
  )?.stock;

  const currentNumberOfScrews = inventory.find(
    (article) => article.art_id === "2"
  )?.stock;

  const checkProductAvailability = ({
    product,
  }: {
    product: { contain_articles: any };
  }) => {
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

  // if statement to check if the product is available if the amount of screws is less than 8

  // if statement to check if the product is available if the amount of screws is more than 8

  // if statement to check if the product is available if the amount of screws is equal to 8

  const onAddToCartClick = (product: {
    name?: string;
    price?: number;
    contain_articles: any;
  }) => {
    if (checkProductAvailability({ product })) {
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
      <h1 className={styles.title}>Zenith Home Collection Warehouse</h1>

      <h2 className={styles.productstitle}>Products</h2>

      <div className={styles.container}>
        {products.map((product) => (
          <div key={product.name} className={styles.grid}>
            <h3>
              {product.name} {"- Available:"}{" "}
              {product.name === "Dining Chair" ? currentNumberOfSeat : null}
              {product.name === "Dining Table" ? currentNumberOfTableTop : null}
            </h3>
            <p>Price: {product.price} €</p>
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
            <div className={styles.inventory}>
              <svg
                fill="#000000"
                height="54px"
                width="54px"
                margin-left="10px"
                version="1.2"
                baseProfile="tiny"
                id="inventory"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 256.00 256.00"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M118.8,209.6h-59v-59h22.7v18.8h13.5v-18.8h22.7V209.6z M195.9,209.6h-59v-59h22.7v18.8h13.5v-18.8h22.7V209.6z M157.8,132.5h-59v-59h22.7v18.8h13.5V73.5h22.7V132.5z M246.6,78.9l-16.1-7.5v139.9h-18.2V62.6l-84.5-39.9L43.5,62.6v148.5H25.3 V71.3L9.2,78.9L1.4,62.4L127.8,2.7l126.7,59.6L246.6,78.9z"></path>{" "}
                </g>
              </svg>
              <ul>
                {inventory.map((article) => (
                  <li key={article.art_id}>
                    Art. ID: {article.art_id} - {article.name} - Available
                    stock: {article.stock}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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
