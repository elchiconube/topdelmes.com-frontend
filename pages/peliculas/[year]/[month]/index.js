import Layout from '@/components/Layout';
import List from '@/components/List';
import styles from '@/styles/Movies.module.css'
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import {validateYearAndMonth, getMonthNumber, isCurrentMonthAndYear, getPrevNextYearMonth} from '@/utils'
import Link from "next/link";

const Peliculas = ({ year, month, movies }) => {

  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Cargando...</div>;
  }

  const {next, prev } = getPrevNextYearMonth(year, month, 'movies');

  return (
    <Layout>
      <Head>
        <title>{`Top ${month} ${year}: Mejores Películas Actualizadas | TopDelMes`}</title>
        <meta name="description" content={`Explora las mejores películas de ${month} ${year} en nuestra lista completa y actualizada en TopDelMes.com. ¡Encuentra tus películas favoritas y descubre nuevas!`} />
        <meta name="keywords" content={`mejores películas ${month} ${year}, películas populares ${month} ${year}, películas del mes ${month} ${year}`} />
        <link rel="canonical" href={`https://www.topdelmes.com/peliculas/${year}/${month}`} />
      </Head>
      <div className={styles.section} itemScope itemType="http://schema.org/ItemList">
        <h1 className={styles.title}>Las mejores películas de {month} {year}: Top 10 del mes</h1>
        <h2 className={styles.subtitle}>Las películas mejor puntuadas durante el mes de {month} de {year}</h2>
        <p className={styles.description}>
          Descubre las 10 películas más populares y mejor valoradas del mes de {month} {year} en nuestra selección mensual. Este ranking te mantendrá al día sobre las últimas tendencias y los estrenos más destacados en el mundo del cine. No te pierdas ninguna novedad y disfruta de las mejores películas del momento.
        </p>
        <p className={styles.description}>
          En nuestra lista de las mejores películas de {month} {year}, encontrarás una amplia variedad de géneros y temáticas, desde dramas emocionantes hasta comedias entretenidas, pasando por fascinantes películas de ciencia ficción y emocionantes thrillers. Nuestro ranking se basa en las valoraciones y opiniones de los espectadores, lo que garantiza que solo encontrarás las películas más populares y de mayor calidad.
        </p>
        <p className={styles.description}>
          Si estás buscando nuevas películas para ver o quieres saber cuáles son las más destacadas del mes, nuestra lista de las mejores películas de {month} {year} es el recurso perfecto para ti. Explora nuestro ranking y descubre las películas que están captando la atención del público. ¡No esperes más y comienza a disfrutar de las mejores películas del mes!
        </p>
        <List items={movies} dataprop="Movie" />
        <footer className={styles.footer}>
          {prev && <Link href={`/peliculas/${prev.year}/${prev.month}`}>Ver películas de {prev.month} {prev.year}</Link>}
          {next && <Link href={`/peliculas/${next.year}/${next.month}`}>Ver películas de {next.month} {next.year}</Link>}
        </footer>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { year, month } = context.params;

  try {

    if(isCurrentMonthAndYear(year, month)){
      return {
        redirect: {
          destination: '/peliculas',
          permanent: false,
        },
      };
    }

    if (!validateYearAndMonth(year, month, 'movies')) {
      return {
        redirect: {
          destination: '/no-hay-datos',
          permanent: false,
        },
      };
    }

    const monthNumber = getMonthNumber(month);

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&month=${monthNumber}&year=${year}`);

    const movies = response.data.filter(item => item.rating !== 0).slice(0, 10);

    return { props: { movies, year, month, } };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return { props: { movies: [], year, month } };
  }

}


export default Peliculas;
