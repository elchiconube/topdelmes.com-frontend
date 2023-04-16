// components/Footer.js
import Link from 'next/link'
import styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerColumn}>
                    <h3>Enlaces rápidos</h3>
                    <ul className={styles.footerList}>
                        <li>
                            <Link href="/" className={styles.footerLink}>
                                Inicio
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/habitaciones" className={styles.navLink}>
                                Apartamentos
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/actividades" className={styles.navLink}>
                                Actividades
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/ofertas" className={styles.navLink}>
                                Ofertas
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/servicios" className={styles.navLink}>
                                Servicios
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/galeria" className={styles.navLink}>
                                Galería
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/contacto" className={styles.navLink}>
                                Contacto
                            </Link>
                        </li>

                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h3>Contacto</h3>
                    <p>Dirección: Calle Ejemplo 123, Ciudad</p>
                    <p>Teléfono: +1 (123) 456-7890</p>
                    <p>Email: info@hotelxyz.com</p>
                </div>
                <div className={styles.footerColumn}>
                    <h3>Síguenos</h3>
                    <ul className={styles.socialList}>
                        <li>
                            <Link href="https://www.facebook.com/hotelxyz"  target="_blank" rel="noopener noreferrer">
                               Facebook
                            </Link>
                        </li>
                        {/* ... */}
                    </ul>
                </div>
            </div>
            <div className={styles.footerCopyright}>
                &copy; {new Date().getFullYear()} Hotel XYZ. Todos los derechos reservados.
            </div>
        </footer>
    )
}

export default Footer
