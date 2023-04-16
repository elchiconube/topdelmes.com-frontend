import { useState } from 'react';
import Head from 'next/head'
import List from '../components/List'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import {getMonthName} from '../utils'

const Home = ({ series, movies }) => {

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  

console.log({series})
    return (
        <Layout>
          <div className={styles.container}>
            <Head>
              <title>Top de series y películas del mes</title>
              <meta name="description" content="Estas son las mejores series y películas del mes." />
              <meta name="keywords" content="top, series, peliculas" />
            </Head>
            <main>
              <h1 className={styles.title}>
                Top del mes
              </h1>
              <div>
                <p className={styles.subtitle}>Las series mejor puntuadas durante {getMonthName(month)}</p>
                <h2 className={styles.title}>Top de series</h2>
                <List items={series} year={year} />
              </div>
              <div>
                <p className={styles.subtitle}>Las más vistas</p>
                <h2 className={styles.title}>Top de películas</h2>
              </div>
            </main>
          </div>
        </Layout>
  )
}


export async function getServerSideProps() {
  try {
    const [seriesResponse, moviesResponse] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/series?api_key=${process.env.NEXT_PUBLIC_API_KEY}`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}`),
    ]);

    const series = seriesResponse.data.slice(0, 10); 
    const movies = moviesResponse.data.slice(0, 10);

    return { props: { series, movies } };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return { props: { series: [], movies: [] } };
  }
}

export default Home;
