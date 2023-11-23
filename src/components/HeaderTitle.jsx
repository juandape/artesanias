import styles from '@styles/List.module.css';

export default function HeaderTitle({title}) {
  return (
    <div>
      <a href='/' className={styles.back}>
        {' '}
        ←{' '}
      </a>
      <h1 className={styles.ListTitle}>{title}</h1>
      <div></div>
    </div>
  );
}
