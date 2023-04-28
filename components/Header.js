import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import logo from "../public/favicon.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} width={44} height={44} alt="Logo topdelmes.com" />
      </Link>
      <input type="checkbox" id="menu-btn" />
      <label htmlFor="menu-btn">
        <span />
      </label>
      <nav>
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/series">Series</Link>
          </li>
          <li>
            <Link href="/peliculas">Peliculas</Link>
          </li>
          <li>
            <Link href="/analisis">Análisis</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
