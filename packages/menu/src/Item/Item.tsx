import { classList } from "@rubenpazch/shared";
import React from "react";
import styles from "./Item.module.css";

export type ItemProps = {
  content: string;
  rounded?: boolean;
};

const Item = ({ content, rounded }: ItemProps) => {
  return (
    <li
      className={classList(
        styles.li,
        rounded && styles.rounded,
        !rounded && styles.square,
      )}
    >
      <a href="#">{content}</a>
    </li>
  );
};

export default Item;
