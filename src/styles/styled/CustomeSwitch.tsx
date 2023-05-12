import React, { useContext } from "react";
import { motion } from "framer-motion";

const SwitchCustomized = (props) => {
  const { isOn, toggleSwitch, id } = props;
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      className="switch-custom"
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

export default SwitchCustomized;
