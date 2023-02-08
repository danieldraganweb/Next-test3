import React from "react";
import styles from "./warehouse.module.css";

// initialProducts is the initial product data
const initialProducts = [
  {
    id: "1",
    name: "Dinning Chair",
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
    id: "2",
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
] as const;
