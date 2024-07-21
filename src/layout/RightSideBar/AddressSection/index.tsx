import styles from "./styles.module.css";
import { LocationIcon } from "~/components/UI/Icon";

export const AddressSection = () => {
  // const 
  return (
    <div className={`${styles["address-container"]}`}>
      <h4 className='title-section'>Your Address</h4>
      <div className={styles["address-container__info"]}>
        <div className={styles["address-info__location"]}>
          <LocationIcon
            className={`${styles["address-info__location-icon"]}`}
          />
          <span className={`${styles["address-info__location-text"]}`}>
            Elm Street, 23
          </span>
        </div>
        <button
          className={`${styles["address-button"]} ${styles["button-change"]}`}
        >
          Change
        </button>
      </div>
    </div>
  );
};
