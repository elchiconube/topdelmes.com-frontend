import Head from 'next/head'
import styles from '../styles/Movies.module.css'
import Layout from "@/components/Layout";
import axios from 'axios';

const Movies = ({ movies }) => {

    console.log({movies});
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>Películas | Top del mes</title>
                    <meta name="description" content="Breve descripción de la página, sus características y contenido." />
                    <meta name="keywords" content="hotel, habitaciones, servicios, turismo, viajes" />
                </Head>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Películas
                    </h1>
                </main>
            </div>
        </Layout>
    )
}


export async function getServerSideProps() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

        const movies = response.data;

        return { props: { movies } };
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return { props: { movies: [] } };
    }
}

export default Movies