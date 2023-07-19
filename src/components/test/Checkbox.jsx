import React from "react";

const Checkbox = ({
  isChecked = false,
  isIndeterminate = false,
  onClick = () => {},
}) => {
  return (
    <span
      className={classnames(styles.checkbox, {
        [styles.isIndeterminate]: isIndeterminate,
        [styles.isChecked]: isChecked,
      })}
      onClick={onClick}
    />
  );
};

export default Checkbox;
