import styles from "./styles.module.css";
import { Button } from "../../../components/UI/Button";
import { Location } from "../../../components/UI/Icon";

export const AddressSection = () => {
  return (
    <div className={`${styles["address-container"]}`}>
      <h4 className={`${styles["address-container__title"]}`}>Your Address</h4>
      <div className={styles["address-container__info"]}>
        <div className={styles["address-info__location"]}>
          <Location
            className={`${styles["address-info__location-icon"]}`}
            size={30}
          />
          <span className={`${styles["address-info__location-text"]}`}>
            Elm Street, 23
          </span>
        </div>
        <Button
          className={`${styles["address-button"]} ${styles["button-change"]}`}
        >
          Change
        </Button>
      </div>
      <input
        className={styles["address-container__input"]}
        type="text"
        name="address_note"
        id=""
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. sed do eiusmod tempor incididunt. "
      />
      <div className={styles["address-container-action"]}>
        <Button className={`${styles["address-button"]}`}>Add Details</Button>
        <Button className={`${styles["address-button"]}`}>Add Note</Button>
      </div>
    </div>
  );
};
