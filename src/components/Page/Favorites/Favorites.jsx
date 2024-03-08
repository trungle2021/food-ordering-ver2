import React from "react";
import {SearchBar} from '../../UI/SearchBar/SearchBar'; 
import styles from './Favorites.module.css'

export const Favorites = () => {
  return ( <>
    <h1>Favorites</h1>
    <div className={`${styles["searchbar-container"]}`}>
      <SearchBar placeholder={`What do you want eat today...`} />
    </div>
  </>)
  
};
