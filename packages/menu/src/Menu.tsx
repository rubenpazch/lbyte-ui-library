import React, { ReactNode } from "react";
import styles from "./Menu.module.css";

export type MenuProps = {
  items: string[];
  children?: ReactNode;
};

const Menu = ({ items, children }: MenuProps) => {
  const renderItems = (items: string[]) => {
    return items.map((item, i) => (
      <li key={i}>
        <a href="#">{item}</a>
      </li>
    ));
  };
  return (
    <nav className={styles.nav}>
      <ul>{children ? children : renderItems(items)}</ul>
    </nav>
  );
};

export default Menu;
