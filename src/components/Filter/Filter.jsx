import { useState } from 'react';

import css from '../Filter/Filter.module.css';

export default function Filter({ onFilter }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onFilter(inputValue);
    setInputValue('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
