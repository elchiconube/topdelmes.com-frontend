import Head from 'next/head'
import styles from '../styles/Series.module.css'
import Layout from "@/components/Layout";
import axios from 'axios';

const Series = ({ series }) => {

    console.log({series});

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>Series | Top del mes</title>
                    <meta name="description" content="Breve descripción de la página, sus características y contenido." />
                    <meta name="keywords" content="hotel, habitaciones, servicios, turismo, viajes" />
                </Head>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Series
                    </h1>
                </main>
            </div>
        </Layout>
    )
}


export async function getServerSideProps() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/series?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

        const series = response.data;

        return { props: { series } };
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return { props: { series: [] } };
    }
}

export default Series