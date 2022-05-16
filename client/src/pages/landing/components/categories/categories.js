import './categories.css';

import { useState, useEffect } from 'react';

const Categories = ({ setCategories }) => {
  const initialInputValues = {
    all: false,
    electronics: false,
    home: false,
    clothingAccessories: false,
    gamesEntertainment: false,
    sports: false,
    art: false,
    petSupplies: false,
  };

  const categoryNameMap = new Map([
    ['all', 'All'],
    ['electronics', 'Electronics'],
    ['home', 'Home'],
    ['clothingAccessories', 'Clothing_Accessories'],
    ['gamesEntertainment', 'Games_Entertainment'],
    ['sports', 'Sports'],
    ['art', 'Art'],
    ['petSupplies', 'Pet_Supplies'],
  ]);

  let checkBoxAll = null;

  const [inputValues, setInputValues] = useState(initialInputValues);

  const uncheckAllInputsExceptAll = () => {
    const inputs = document.querySelectorAll('.categories-checkbox-input');

    inputs.forEach((input) => {
      if (input.name !== 'all') input.checked = false;
    });
  };

  const onChangeHandler = (e) => {
    const { name } = e.target;

    if (!checkBoxAll) {
      const inputs = document.querySelectorAll('.categories-checkbox-input');
      checkBoxAll = Array.from(inputs).find((input) => input.name === 'all');
    }

    if (name === 'all' && e.target.checked) {
      uncheckAllInputsExceptAll();
      setInputValues({ ...initialInputValues, [name]: e.target.checked });

      return;
    } else if (name !== 'all' && checkBoxAll.checked) {
      checkBoxAll.checked = false;
      setInputValues({ ...inputValues, [name]: e.target.checked, all: false });

      return;
    }

    setInputValues({ ...inputValues, [name]: e.target.checked });
  };

  useEffect(() => {
    const inputs = Object.entries(inputValues);

    const categories = [];

    inputs.forEach((input) => {
      const name = input[0];
      const checked = input[1];

      if (name === 'all' && checked) return;
      if (!checked) return;

      categories.push(categoryNameMap.get(name));
    });

    setCategories(categories);
  }, [inputValues]);

  return (
    <div className='categories-container'>
      <p className='categories-container-title'>Categories</p>
      <div className='categories-input-container'>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-all'
            className='categories-checkbox-label noselect'
          >
            All
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-all'
            name='all'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-electronics'
            className='categories-checkbox-label noselect'
          >
            Electronics
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-electronics'
            name='electronics'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-home'
            className='categories-checkbox-label noselect'
          >
            Home
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-home'
            name='home'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-clothing-accessories'
            className='categories-checkbox-label noselect'
          >
            Clothing & Accessories
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-clothing-accessories'
            name='clothingAccessories'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-games-entertainment'
            className='categories-checkbox-label noselect'
          >
            Games & Entertainment
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-games-entertainment'
            name='gamesEntertainment'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-sports'
            className='categories-checkbox-label noselect'
          >
            Sports
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-sports'
            name='sports'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-art'
            className='categories-checkbox-label noselect'
          >
            Art
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-art'
            name='art'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
        <div className='categories-checkbox-container'>
          <label
            htmlFor='categories-checkbox-pet-supplies'
            className='categories-checkbox-label noselect'
          >
            Pet Supplies
          </label>
          <input
            type='checkbox'
            id='categories-checkbox-pet-supplies'
            name='petSupplies'
            className='categories-checkbox-input'
            onChange={onChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
