import styles from "../../style";

/** Centres content inside the site's max width with the standard horizontal padding. */
const Container = ({ as: Tag = "div", id, className = "", innerClassName = "", children }) => (
  <Tag id={id} className={className}>
    <div className={`${styles.container} ${innerClassName}`}>{children}</div>
  </Tag>
);

export default Container;
