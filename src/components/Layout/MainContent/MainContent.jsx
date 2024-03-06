import React from "react";
import styles from "./MainContent.module.css";
import { Route, Switch } from "react-router-dom";
import { Favorites } from "../../Page/Favorites";
import { FoodOrder } from "../../Page/FoodOrder";
import { OrderHistory } from "../../Page/OrderHistory";
import { Dashboard } from "../../Page/Dashboard";
import { Bills } from "../../Page/Bills";
import { Settings } from "../../Page/Settings";
import { Notfound } from "../../Page/Notfound";
import { Logout } from "../../Page/Logout";
export default function MainContent() {
  return (
    <main className={styles["main__content"]}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/food-order" component={FoodOrder} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/order-history" component={OrderHistory} />
        <Route path="/bills" component={Bills} />
        <Route path="/settings" component={Settings} />
        <Route path="/logout" component={Logout} />
        <Route component={Notfound} />
      </Switch>
    </main>
  );
}
