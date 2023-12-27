import React from "react";
import styles from './RightSideBar.module.css'
import {UserSection} from './UserSection/UserSection'
import {BalanceSection} from './BalanceSection/BalanceSection'
import {AddressSection} from './AddressSection/AddressSection'

export default function RightHeader({ className }) {
  return (
    <aside className={`${className} ${styles['sidebar__right']}`} >
      <UserSection />
      <BalanceSection />
      <AddressSection/>
      {/* <CartSection/> */}
    </aside >
  );
}
