import Head from 'next/head'
import List from '@/components/List'
import Layout from '@/components/Layout'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { getMonthName } from '@/utils'
import Link from 'next/link';

const NoData = ({ series, movies }) => {

  const month = getMonthName(new Date().getMonth());

  return (
    <Layout>
      <Head>
        <title>{`TopDelMes ${month}: Las 10 Películas y Series Más Populares del Mes`}</title>
        <meta name="description" content={`Descubre las 10 películas y series más populares de ${month} en TopDelMes.com. ¡Entérate de lo más visto y no te pierdas ninguna novedad!`} />
        <meta name="keywords" content={`Películas y series del mes, top 10, estrenos, mejores, ${month}`} />
        <link rel="canonical" href={`https://www.topdelmes.com/no-hay-datos`} />
      </Head>
      <section className={styles.error}>
          <h1 className={styles.heading}>Vaya creo que te has equivocado</h1>
          <p>Lo siento pero no tenemos datos o la fecha no es correcta</p>
          <p>Para obtener series puedes probar a partir 1990 y para películas a partir de 1920. Por ejemplo</p>
          <ul>
            <li><Link href="/series/1990/enero">Top 10 de series en enero de 1990</Link></li>
            <li><Link href="/peliculas/1925/enero">Top 10 de peliculas en abril de 1925</Link></li>
          </ul>
          <p>Prueba a cambiar el año y el mes.</p>
          <p>Mientras te dejamos el top 10 de películas y series de {month}</p>
        </section>
      <section className={styles.section} itemScope itemType="http://schema.org/ItemList">
        <p className={styles.subtitle}>Las series mejor puntuadas durante el mes de {month}</p>
        <h2 className={styles.title}>Top 10 de series</h2>
        <List items={series} dataprop="TVSeries" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/series">Ver ranking completo de series</Link>
        </footer>
      </section>
      <section className={styles.section} itemScope itemType="http://schema.org/ItemList">
        <p className={styles.subtitle}>Las películas mejor puntuadas durante el mes de {month}</p>
        <h2 className={styles.title}>Top 10 de películas</h2>
        <List items={movies} dataprop="Movie" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/peliculas">Ver ranking completo de películas</Link>
        </footer>
      </section>
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

export default NoData;
