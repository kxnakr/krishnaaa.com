import React from "react";

interface IEmoji {
  label?: string;
  symbol: string;
}

const Emoji = ({ label, symbol }: IEmoji) => {
  return (
    <span
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
