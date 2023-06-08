import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4 className={styles.heading}>Navegación</h4>
          <ul className={styles.list}>
            <li>
              <Link href="/" className={styles.link}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/series" className={styles.link}>
                Series
              </Link>
            </li>
            <li>
              <Link href="/peliculas" className={styles.link}>
                Películas
              </Link>
            </li>
            <li>
              <Link href="/analisis" className={styles.link}>
                Análisis
              </Link>
            </li>
            <li>
              <Link href="/autores" className={styles.link}>
                Autores
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Top del mes.
      </div>
    </footer>
  );
};

export default Footer;
