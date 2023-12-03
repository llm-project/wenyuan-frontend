import styles from "./index.module.css";

const Loading = (props: { className?: string }) => {
  const { className } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.loading}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default Loading;
