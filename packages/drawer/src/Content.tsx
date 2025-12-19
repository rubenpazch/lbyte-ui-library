import React from "react";
import styles from "./Content.module.css";

export type ModalProps = {
  onClose: () => void;
};

const Content = ({ onClose }: ModalProps) => {
  return (
    <div className={styles.content}>
      <div>
        <div>I`&lsquo;`m a modal dialog</div>
        <button
          onClick={() => {
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Content;
