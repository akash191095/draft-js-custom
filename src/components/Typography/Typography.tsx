import { TypographyCommon } from "../../types/typography";
import styles from "./typography.module.css";

function Typography() {
  return null;
}

Typography.Title = ({ children }: TypographyCommon) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default Typography;
