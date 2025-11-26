import React, { useState } from "react";
import "./Select.css";
import { FaChevronDown } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  loading: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Selecione...",
  onChange,
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="select-display" onClick={() => setIsOpen(!isOpen)}>
        {selected ? (
          selected.label
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
        <span className={`arrow ${isOpen ? "open" : ""}`}>
          <FaChevronDown />
        </span>
      </div>

      {isOpen && (
        <div className="options">
          {loading ? (
            <div className="option disabled">Carregando...</div>
          ) : options.length === 0 ? (
            <div className="option disabled">Nenhuma categoria disponível.</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={`option ${
                  selected?.value === option.value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
