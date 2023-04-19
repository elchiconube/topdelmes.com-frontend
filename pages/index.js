import Head from 'next/head'
import List from '@/components/List'
import Layout from '@/components/Layout'
import TimeMachine from '@/components/TimeMachine'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { getMonthName } from '@/utils'
import Link from 'next/link';
import Previous from "@/components/Previous";

const Home = ({ series, movies }) => {

  const month = getMonthName(new Date().getMonth());

  return (
    <Layout>
      <Head>
        <title>{`TopDelMes ${month}: Las 10 Películas y Series Más Populares del Mes`}</title>
        <meta name="description" content={`Descubre las 10 películas y series más populares de ${month} en TopDelMes.com. ¡Entérate de lo más visto y no te pierdas ninguna novedad!`} />
        <meta name="keywords" content={`Películas y series del mes, top 10, estrenos, mejores, ${month}`} />
        <link rel="canonical" href="https://www.topdelmes.com/" />
      </Head>
      <header className={styles.header}>
        <div>
          <h1 className={styles.heading}>Top del mes de {month}</h1>
          <p>Bienvenido a TopDelMes, tu fuente de información sobre las películas y series más populares del mes actual. Aquí encontrarás las últimas tendencias y los estrenos que están arrasando en el mundo del cine y la televisión.</p>
        </div>
      </header>
      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>Las series mejor puntuadas durante el mes de {month}</p>
          <h2 className={styles.title}>Top 10 de series</h2>
        </header>
        <List items={series} dataprop="TVSeries" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/series">Ver ranking completo de series</Link>
        </footer>
      </section>
      <TimeMachine />
      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>Las películas mejor puntuadas durante el mes de {month}</p>
          <h2 className={styles.title}>Top 10 de películas</h2>
        </header>
        <List items={movies} dataprop="Movie" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/peliculas">Ver ranking completo de películas</Link>
        </footer>
      </section>
      <Previous />
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
