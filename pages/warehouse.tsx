import React, { useState, useEffect } from "react";
import styles from "./warehouse.module.css";
import { initialInventory } from "../components/initialinventory";
import { initialProducts } from "../components/initialproducts";

// Warehouse component
const Warehouse = () => {
  // State for the inventory data
  const [inventory, setInventory] = useState(initialInventory.tsx);

  // State for the product data
  const [products] = useState(initialProducts.tsx);

  // Get the current number of seat in inventory
  const currentNumberOfSeat = inventory.find(
    (article: { art_id: string }) => article.art_id === "3"
  )?.stock;

  // Get the initial number of seat in inventory
  const initialNumberOfSeat = initialInventory.find(
    (article: { art_id: string }) => article.art_id === "3"
  )?.stock;

  // Get the current number of table top in inventory
  const currentNumberOfTableTop = inventory.find(
    (article: { art_id: string }) => article.art_id === "4"
  )?.stock;

  // Get the initial number of table top in inventory
  const initialNumberOfTableTop = initialInventory.find(
    (article: { art_id: string }) => article.art_id === "4"
  )?.stock;

  // Get the initial number of screws in inventory
  const initialNumberOfScrews = initialInventory.find(
    (article: { art_id: string }) => article.art_id === "2"
  )?.stock;

  // Get the current number of screws in inventory
  const currentNumberOfScrews = inventory.find(
    (article: { art_id: string }) => article.art_id === "2"
  )?.stock;

  // Function to check if a product is available based on its required articles
  const checkProductAvailability = ({
    product,
  }: {
    product: { contain_articles: any };
  }) => {
    // Loop through each article required for the product
    for (const article of product.contain_articles) {
      // Check if the article exists in the inventory
      const foundArticle = inventory.find(
        (inventoryArticle: { art_id: any }) =>
          inventoryArticle.art_id === article.art_id
      );
      // If the article doesn't exist or the stock is less than the amount needed, return false
      if (!foundArticle || foundArticle.stock < article.amount_of) {
        return false;
      }
    }
    // Return true if all articles exist in the required amount
    return true;
  };
  // onAddToCartClick is a function that updates the stock count of articles in the inventory
  // when a product is added to the cart
  const onAddToCartClick = (product: {
    name?: string;
    price?: number;
    contain_articles: any;
  }) => {
    // Check the availability of the product before updating the stock
    if (checkProductAvailability({ product })) {
      // Create an updated inventory by decreasing the stock of each article in the product's
      // contain_articles array
      const updatedInventory = inventory.map(
        (inventoryArticle: { art_id: any; stock: number }) => {
          for (const article of product.contain_articles) {
            if (inventoryArticle.art_id === article.art_id) {
              return {
                ...inventoryArticle,
                stock: inventoryArticle.stock - article.amount_of,
              };
            }
          }
          return inventoryArticle;
        }
      );
      // Update the inventory with the updatedInventory
      setInventory(updatedInventory);
    }
  };

  // onRemoveFromCartClick is a function that updates the stock count of articles in the inventory
  // when a product is removed from the cart
  const onRemoveFromCartClick = (product: {
    name?: string;
    price?: number;
    contain_articles: any;
  }) => {
    // Create an updated inventory by increasing the stock of each article in the product's
    // contain_articles array
    const updatedInventory = inventory.map(
      (inventoryArticle: { art_id: any; stock: any }) => {
        for (const article of product.contain_articles) {
          if (inventoryArticle.art_id === article.art_id) {
            return {
              ...inventoryArticle,
              stock: inventoryArticle.stock + article.amount_of,
            };
          }
        }
        return inventoryArticle;
      }
    );

    // Check if the product is a "Dining Chair" and if the initial number of seats
    // is equal to the current number of seats, then return
    if (
      product.name === "Dining Chair" &&
      initialNumberOfSeat === currentNumberOfSeat
    ) {
      return;
    }
    // Check if the product is a "Dining Table" and if the initial number of table tops
    // is equal to the current number of table tops, then return
    if (
      product.name === "Dining Table" &&
      initialNumberOfTableTop === currentNumberOfTableTop
    ) {
      return;
    }

    // Update the inventory with the updatedInventory
    setInventory(updatedInventory);
  };

  // HTML5 code
  // The Warehouse component returns a title, a list of products and a button to add or remove a product from the cart
  return (
    <>
      <h1 className={styles.title}>Zenith Home Collection Warehouse</h1>
      {/* Title of the page */}
      <h2 className={styles.welcomemsg}>Welcome to Zenith Warehouse!</h2>
      {/* Welcome message */}
      <h2 className={styles.productstitle}>Products</h2>
      {/* Title of the products section */}
      <div className={styles.container}>
        {/* Container for all the products */}
        {products.map(
          (product: { name: any; price: any; contain_articles: any }) => (
            <div key={product.name} className={styles.grid}>
              {/* Container for a single product */}
              <h3>
                {product.name} {"- Available:"}{" "}
                {product.name === "Dining Chair" ? currentNumberOfSeat : null}
                {product.name === "Dining Table"
                  ? currentNumberOfTableTop
                  : null}
              </h3>
              {/* Display product name and availability */}
              <p>Price: {product.price} €</p>
              {/* Display product price */}
              <div>
                {product.contain_articles.map(
                  (article: {
                    art_id:
                      | boolean
                      | React.Key
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | null
                      | undefined;
                    amount_of:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <div key={article.art_id}>
                      <p>
                        Art. ID: {article.art_id} - Amount: {article.amount_of}
                      </p>
                    </div>
                  )
                )}
              </div>
              {/* Display article information */}

              <button
                className={styles.addbutton}
                onClick={() => onAddToCartClick(product)}
              >
                Add to cart
              </button>
              {/* Add product to cart button */}
              <button
                className={styles.removebutton}
                onClick={() => onRemoveFromCartClick(product)}
              >
                Remove from cart
              </button>
              {/* Remove product from cart button */}
              <div className={styles.inventory}>
                {/* Container for the inventory */}

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
                  {inventory.map(
                    (article: {
                      art_id:
                        | boolean
                        | React.Key
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | null
                        | undefined;
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      stock:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <li key={article.art_id}>
                        Art. ID: {article.art_id} - {article.name} - Available
                        stock: {article.stock}
                      </li>
                    )
                  )}
                </ul>
              </div>
              {/* Display article inventory information */}
            </div>
          )
        )}
      </div>
    </>
  );
};
export default Warehouse;
