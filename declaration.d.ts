// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts').
declare module "*.scss";
declare module "*.module.css";
declare module "*.ts";
declare module "*.jsx";
declare module 'react-router-dom';
