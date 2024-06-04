import styles from "./styles.module.css";
import { LocationIcon } from "~/components/UI/Icon";

export const AddressSection = () => {
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
      <input
        className={styles["address-container__input"]}
        type="text"
        name="address_note"
        id=""
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. "
      />
      <div className={styles["address-container-action"]}>
        <button className={`${styles["address-button"]}`}>Add Details</button>
        <button className={`${styles["address-button"]}`}>Add Note</button>
      </div>
    </div>
  );
};
