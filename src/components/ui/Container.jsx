import styles from "../../style";

/** Centers content inside the site's max width with the standard horizontal padding. */
const Container = ({ as: Tag = "div", id, className = "", innerClassName = "", children }) => (
  <Tag id={id} className={`${styles.paddingX} ${styles.flexCenter} ${className}`}>
    <div className={`${styles.boxWidth} ${innerClassName}`}>{children}</div>
  </Tag>
);

export default Container;
