import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import logo from '../public/favicon.svg'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link href="/" className={styles.logo}>
                    <Image src={logo} width={44} height={44} alt='Logo topdelmes.com' />
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
