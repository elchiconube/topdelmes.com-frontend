// components/Layout.js
import Navbar from './Navbar'
import Footer from './Footer'
import Script from 'next/script'

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
