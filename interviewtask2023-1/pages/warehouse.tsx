import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Warehouse = () => {
  // State to keep track of the inventory
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

  // State to keep track of the products
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

  // Function to calculate the availability of a product based on the inventory
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

  // Function to handle the add to cart button click
  const onAddToCartClick = (product: { contain_articles: any }) => {
    if (checkProductAvailability(product)) {
      // Remove the articles from the inventory
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
      // Show an error message
      alert("Product is not available");
    }
  };

  // Function to handle the remove from cart button click
  const onRemoveFromCartClick = (product: { contain_articles: any }) => {
    // Add the articles back to the inventory
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
      <h1>Warehouse</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.name} className={styles.card}>
            <h3>{product.name}</h3>

            <div className={styles.cardContent}>
              <div className={styles.cardContentLeft}>
                <p>Price: {product.price}</p>
                <p>
                  Availability:{" "}
                  {checkProductAvailability(product)
                    ? "Available"
                    : "Not Available"}
                </p>
              </div>

              <div className={styles.cardContentRight}>
                <button onClick={() => onAddToCartClick(product)}>
                  Add to cart
                </button>
                <button onClick={() => onRemoveFromCartClick(product)}>
                  Remove from cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warehouse;
