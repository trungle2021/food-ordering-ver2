import { LocationIcon } from "~/components/common/UI/Icon";
import { AddressResponse } from "~/interface/user/addressResponse";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";


export const AddressSection = () => {
  const {user} = useSelector((state: any) => state.user);
  const userAddress = user?.user_address?.find((address: AddressResponse) => address.is_default_address);

  return (
    <div className={`${styles["address-container"]}`}>
      <h4 className='title-section'>Your Address</h4>
      <div className={styles["address-container__info"]}>
        <div className={styles["address-info__location"]}>
          <LocationIcon
            className={`${styles["address-info__location-icon"]}`}
          />
          <span className={`${styles["address-info__location-text"]}`}>
            {userAddress?.address}
          </span>
        </div>
        <button
          type="button"
          className={`${styles["address-button"]} ${styles["button-change"]}`}
        >
          Change
        </button>
      </div>
    </div>
  );
};
