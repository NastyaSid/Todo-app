import React from 'react';

const Toggle = ({ checked, onChange }) => {
  return (
    <span className="toggle-control">
      <input
        className="dmcheck"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id="dmcheck"
      />
      <label htmlFor="dmcheck" />
    </span>
)};

export default Toggle;