import Footer from './Footer'
import Navbar from './NavBar'

import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
