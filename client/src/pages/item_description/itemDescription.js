import './itemDescription.css';

import UserRating from './components/userRating';
import Header from '../header/header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-regular-svg-icons';
import { useLocation } from 'react-router-dom';

const ItemDescription = () => {
  const location = useLocation();

  const categoryNameMap = new Map([
    ['Electronics', 'Electronics'],
    ['Home', 'Home'],
    ['Clothing_Accessories', 'Clothing & Accessories'],
    ['Games_Entertainment', 'Games & Entertainment'],
    ['Sports', 'Sports'],
    ['Art', 'Art'],
    ['Pet_Supplies', 'Pet Supplies'],
  ]);

  const { item: itemData, loginState } = location.state;

  const category = categoryNameMap.get(itemData.category);

  return (
    <div>
      <Header loginState={loginState} />
      <div className='item-info-container-main'>
        <div className='item-img-container'>
          <img className='item-img' src={itemData.imageSrc} alt='item' />
        </div>
        <div className='item-info-container'>
          <p className='item-name'>{itemData.name}</p>
          <p className='item-price'>
            {new Intl.NumberFormat('en-us', {
              style: 'currency',
              currency: 'USD',
            }).format(itemData.price)}
          </p>

          <div className='item-category-container'>
            <FontAwesomeIcon className='item-icon' icon={faAlignCenter} />
            <p className='item-category'>{`Category: ${category}`}</p>
          </div>

          <div className='item-condition-container'>
            <FontAwesomeIcon className='item-icon' icon={faHourglass} />
            <p className='item-condition'>{`Condition: ${itemData.condition}`}</p>
          </div>

          <div className='item-seller-info-container-main'>
            <div className='item-seller-info-container'>
              <div className='item-seller-img-container'>
                <img
                  src={require(`../../data/images/user_images/someone.jpeg`)}
                  className='item-seller-img'
                  alt='seller'
                />
              </div>
              <p className='item-seller'>{`${itemData.seller.first_name} ${itemData.seller.last_name}`}</p>
            </div>
            <UserRating
              rating={itemData.seller.seller_rating}
              count={itemData.seller.seller_rating_count}
            />
          </div>
          <div className='btn-container'>
            <button className='btn-add-to-cart'>Add To Cart</button>
          </div>
        </div>
      </div>
      <div className='item-description-container'>
        <p className='item-description-text'>Description</p>
        <p className='item-description'>{itemData.description}</p>
      </div>
    </div>
  );
};

export default ItemDescription;
