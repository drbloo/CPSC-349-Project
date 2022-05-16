import './itemGrid.css';

import { useEffect, useState } from 'react';
import Config from '../../../../config';
import GridItemTemplate from '../grid_item_template/grid_item_template';
import Categories from '../categories/categories';

const ItemGrid = ({ loginState }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const generateQueryString = () => {
    let query = '';

    if (categories.length === 0) return query;

    query = '?';

    categories.forEach((category) => {
      query += `category=${category}&`;
    });

    query = query.slice(0, -1);

    return query;
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const query = generateQueryString();

        let res = await fetch(`${Config.URL_ITEMS}/${query}`);

        if (!res.ok) throw new Error('error loading items');

        let data = await res.json();
        const items = data.data.item;

        res = await fetch(Config.URL_ACCOUNTS);

        if (!res.ok) throw new Error('error loading items');

        data = await res.json();
        const users = data.data.user;

        const userMap = new Map();

        users.forEach((user) => {
          userMap.set(user._id, `${user.first_name} ${user.last_name}`);
        });

        items.forEach((item) => {
          item.seller = userMap.get(item.seller_id);
        });

        setItems([...items]);
      } catch (err) {
        console.log(err.message);
      }
    };

    loadItems();
  }, [categories]);

  return (
    <div className='item-grid-container-main'>
      <Categories setCategories={setCategories} />
      <div className='item-grid-container'>
        {items.map((item) => (
          <GridItemTemplate
            item={item}
            key={item._id}
            loginState={loginState}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemGrid;
