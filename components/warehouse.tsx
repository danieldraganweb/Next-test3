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
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="34px"
                height="34px"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
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
                  <g>
                    {" "}
                    <path d="M285.172,331.453c-12.453,13.25-20.547,18.781-26.094,18.781c-3.859,0-5.172-3.422-4.312-11.141 c2.594-20.062,17.531-84.578,21.781-107.625c4.266-19.719,3-29.953-2.562-29.953c-10.641,0-36.734,17.516-53.828,35.016 c-0.875,1.344-2.562,8.578-1.688,11.125c0,0.875,1.266,1.312,1.266,1.312c10.266-8.125,18.391-12.844,23.109-12.844 c2.109,0,2.938,3.406,1.688,9.406c-5.125,25.625-13.672,65.406-20.078,98.281c-5.984,28.672-2.172,40.188,6.812,40.188 s33.766-11.984,53.906-38.906c0.812-2.094,1.641-10.188,1.25-12.359C286.422,331.906,285.172,331.453,285.172,331.453z"></path>{" "}
                    <path d="M281.281,128c-7.297,0-16.25,3.414-20.516,7.703c-1.688,2.141-3.406,8.539-3.859,11.945 c0.453,7.711,2.578,11.984,6.859,14.562c2.109,1.68,16.219,0.414,19.219-1.312c5.188-3.398,9.828-10.25,10.703-18.375 c0.375-3.82-0.438-8.984-2.141-11.531C290.688,129.719,287.25,128,281.281,128z"></path>{" "}
                    <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"></path>{" "}
                  </g>{" "}
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
