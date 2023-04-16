// components/Navbar.js
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link href="/" className={styles.logo}>
                   Top del mes
                </Link>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/" className={styles.navLink}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/series" className={styles.navLink}>
                            Series
                        </Link>
                    </li>
                    <li>
                        <Link href="/peliculas" className={styles.navLink}>
                            Peliculas
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
