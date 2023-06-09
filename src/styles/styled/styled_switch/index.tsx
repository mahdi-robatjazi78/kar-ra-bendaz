import React from "react";
import { motion } from "framer-motion";
import "./switchStyles.scss";
const StyledSwitch = (props) => {
  const { isOn, toggleSwitch, id, smallSwitch = false } = props;
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      className={smallSwitch ? "switch-custom-small" : "switch-custom"}
      data-isOn={Boolean(isOn).toString()}
      onClick={() => toggleSwitch(!isOn, id)}
    >
      <motion.div
        className={
          isOn ? "handle-switch-custom-active" : "handle-switch-custom"
        }
        layout
        transition={spring}
      />
    </div>
  );
};

export default StyledSwitch;
