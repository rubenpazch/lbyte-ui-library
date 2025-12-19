import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./DrawerMenuMobile.module.css";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import IconButton from "@rubenpazch/icon-button";
import { CloseIcon } from "@rubenpazch/icons";

export type DrawerMenuMobileProps = {
  children?: React.ReactNode;
  open?: boolean;
  className?: string;
  style?: React.CSSProperties;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;
  portalContainer?: Element | DocumentFragment;
  onClosed?: () => void;
  appearFrom?: "left" | "right" | "above" | "below";
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TrasitionOptions: Record<string, CSSTransitionClassNames> = {
  left: {
    enter: styles.fromLeftEnter,
    enterActive: styles.fromLeftEnterActive,
    enterDone: styles.fromLeftEnterDone,
    exit: styles.fromLeftExit,
    exitActive: styles.fromLeftExitActive,
    exitDone: styles.fromLeftExitDone,
  },
  right: {
    enter: styles.fromRightEnter,
    enterActive: styles.fromRightEnterActive,
    enterDone: styles.fromRightEnterDone,
    exit: styles.fromRightExit,
    exitActive: styles.fromRightExitActive,
    exitDone: styles.fromRightExitDone,
  },
  above: {
    enter: styles.fromAboveEnter,
    enterActive: styles.fromAboveEnterActive,
    enterDone: styles.fromAboveEnterDone,
    exit: styles.fromAboveExit,
    exitActive: styles.fromAboveExitActive,
    exitDone: styles.fromAboveExitDone,
  },
  below: {
    enter: styles.fromBelowEnter,
    enterActive: styles.fromBelowEnterActive,
    enterDone: styles.fromBelowEnterDone,
    exit: styles.fromBelowExit,
    exitActive: styles.fromBelowExitActive,
    exitDone: styles.fromBelowExitDone,
  },
};

function DrawerMenuMobile({
  open = false,
  unmountOnExit,
  mountOnEnter,
  setOpen,
  portalContainer = document.body,
  appearFrom = "left",
}: DrawerMenuMobileProps) {
  const nodeRef = useRef(null);

  const { fromLeft, fromRight, fromAbove, fromBelow } = styles;
  const mainCss =
    appearFrom === "left"
      ? fromLeft
      : appearFrom === "right"
        ? fromRight
        : appearFrom === "above"
          ? fromAbove
          : appearFrom === "below"
            ? fromBelow
            : "left";

  return ReactDOM.createPortal(
    <CSSTransition
      in={open}
      nodeRef={nodeRef}
      timeout={300}
      classNames={TrasitionOptions[appearFrom]}
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}
      onEnter={() => console.log("on enter")}
      onExited={() => console.log("on exited")}
    >
      <div ref={nodeRef} className={mainCss}>
        <IconButton
          color="primary"
          icon={<CloseIcon size="small" />}
          size="small"
          onClick={() => setOpen && setOpen(false)}
        />
        <p>This alert message is being transitioned in and out of the DOM.</p>
      </div>
    </CSSTransition>,
    portalContainer,
  );
}

export default DrawerMenuMobile;
