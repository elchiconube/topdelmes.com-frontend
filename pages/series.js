import {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Series.module.css'
import List from '../components/List'
import Layout from "@/components/Layout";
import axios from 'axios';
import { getMonthName } from '../utils'

const Series = ({ series }) => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
  
    const monthName = getMonthName(month);

    return (
        <Layout>
            <Head>
                <title>{`Mejores Series de ${monthName}: Listado Completo y Actualizado | TopDelMes`}</title>
                <meta name="description" content={`Explora las mejores series de ${monthName} en nuestra lista completa y actualizada en TopDelMes.com. ¡Encuentra tus series favoritas y descubre nuevas!`} />
                <meta name="keywords" content={`mejores series ${monthName}, series populares ${monthName}, series del mes ${monthName}`} />
            </Head>
            <div className={styles.section} itemscope itemType="http://schema.org/ItemList">
                <p className={styles.subtitle}>Las series mejor puntuadas durante el mes de {monthName}</p>
                <h1 className={styles.title}>Ranking de series</h1>
                <p>En TopDelMes, nos esforzamos por mantenerte al día con las series más populares y emocionantes del momento. Nuestra lista de las mejores series del mes se actualiza regularmente para asegurarnos de que siempre estés informado sobre las novedades y las series que no puedes perderte.</p>
                <List items={series} dataprop="TVSeries" />
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