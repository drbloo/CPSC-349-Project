import './grid_item_template.css';
import Config from '../../../../config';

import { useNavigate } from 'react-router-dom';

const GridItemTemplate = ({ item, loginState }) => {
  const navigate = useNavigate();

  const image_url = require(`../../../../data/images/item-images/${item.image_url}`);
  const itemName = item.name;
  const price = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price);
  const seller = item.seller;

  const onClickHandler = async () => {
    const itemId = item._id;

    try {
      let res = await fetch(`${Config.URL_ITEMS}/${itemId}`);

      if (!res.ok) throw new Error('Error loading item');

      let data = await res.json();

      const item = data.data.item;

      res = await fetch(`${Config.URL_ACCOUNTS}/${item.seller_id}`);

      if (!res.ok) throw new Error('Error loading seller');

      data = await res.json();

      const seller = data.data.user;

      item.seller = seller;
      item.imageSrc = require(`../../../../data/images/item-images/${item.image_url}`);

      navigate(`/item/${item._id}`, {
        state: {
          loginState,
          item,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='grid-item-template' onClick={onClickHandler}>
      <div className='grid-item-img-container'>
        <img src={image_url} className='grid-item-img' alt='item'></img>
        <div className='grid-item-img-cover'></div>
      </div>
      <div className='grid-item-info-container'>
        <p className='grid-item-name'>{itemName}</p>
        <p className='grid-item-price'>{price}</p>
        <p className='grid-item-seller'>{seller}</p>
      </div>
    </div>
  );
};

export default GridItemTemplate;
