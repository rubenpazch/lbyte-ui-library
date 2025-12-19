import React from "react";
import { BackgroundProps } from "./Background.types";
import styles from "./Backgroun.module.css";

const Background = ({ label, color }: BackgroundProps) => {
  return (
    <div className={[styles.base, styles[`${color}`]].join(" ")}>{label}</div>
  );
};

export default Background;
