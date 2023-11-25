import { TitleProps } from "../../types/title";
import Typography from "../Typography/Typography";
import styles from "./title.module.css";

function Title({ name }: TitleProps) {
  return (
    <div className={styles.titleContainer}>
      <Typography.Title>Demo editor by {name}</Typography.Title>
    </div>
  );
}

export default Title;
