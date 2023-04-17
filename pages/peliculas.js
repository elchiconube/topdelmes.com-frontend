import {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Movies.module.css'
import List from '../components/List'
import Layout from "@/components/Layout";
import axios from 'axios';
import { getMonthName } from '../utils'

const Movies = ({ movies }) => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
  
    const monthName = getMonthName(month);

    return (
        <Layout>
            <Head>
                <title>{`Mejores Películas de monthName: Listado Completo y Actualizado | TopDelMes`}</title>
                <meta name="description" content={`Echa un vistazo a las mejores películas de monthName en nuestra selección completa y actualizada en TopDelMes.com. ¡No te pierdas los últimos estrenos!`} />
                <meta name="keywords" content={`mejores películas monthName, películas populares monthName, películas del mes monthName`} />
            </Head>
            <div className={styles.section} itemScope itemType="http://schema.org/ItemList">
                <p className={styles.subtitle}>Las películas mejor puntuadas durante el mes de {monthName}</p>
                <h1 className={styles.title}>Ranking de películas</h1>
                <p>Aquí, en TopDelMes, nos encanta el cine y queremos compartir contigo las mejores películas del mes. Nuestra selección incluye los estrenos más recientes y las películas que están haciendo historia en la taquilla. Consulta nuestra lista actualizada y encuentra tu próxima película favorita.</p>
                <List items={movies} dataprop="Movie" />
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