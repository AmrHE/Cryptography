import React from 'react';
import { Link } from 'react-router-dom';
import {FaCaretDown, FaCaretUp, FaTimesCircle} from 'react-icons/fa';

const Coin = ({coin, deleteCoin}) => {
  return (
    <Link to={`/coins/${coin.id}`} className="text-decoration-none my-1 coin">
      <li className="coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark">
        <img className="coinlist-image" src={coin.image} alt={coin.id}/>
        <span>{(coin.id.toUpperCase())}</span>
        <span className="text-decoration-none">Current Price: $ {coin.current_price}</span>
        <span className={
          coin.price_change_percentage_24h < 0 
          ? 'text-danger mr-2' 
          : 'text-success mr-2'
          }
        >
          {"Price Change: "}
          {coin.price_change_percentage_24h < 0 
          ? (
            <FaCaretDown className="align-middle mr-1" />
          ) : (
            <FaCaretUp className="align-middle mr-1" />
          )          
          }
          {coin.price_change_percentage_24h} %
        </span>
        <FaTimesCircle onClick={(e) => {
          e.preventDefault();
          deleteCoin(coin.id);
        }} className="delete-icon text-danger" />
      </li>
    </Link>
  )
}

export default Coin;