import React from "react";
import { FiCheck } from "react-icons/fi";
import "./RoundCheckBox.css";

interface RoundCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const RoundCheckbox: React.FC<RoundCheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="round-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={`checkmark ${checked ? "checked" : ""}`}>
        <FiCheck className="check-icon" />
      </span>
    </label>
  );
};

export default RoundCheckbox;
