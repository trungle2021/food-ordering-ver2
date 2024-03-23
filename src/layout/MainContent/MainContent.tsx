import styles from "./MainContent.module.css";
import Routes from '../../routes/index'
export default function MainContent() {
  return (
    <main className={styles["main__content"]}>
      <Routes />
    </main>
  );
}
