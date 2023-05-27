import Head from "next/head";
import List from "@/components/List";
import Layout from "@/components/Layout";
import TimeMachine from "@/components/TimeMachine";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import {
  axiosConfig,
  getCurrentMonth,
  getCurrentYear,
  getMonthName,
} from "@/utils";
import Link from "next/link";
import Previous from "@/components/Previous";
import ReviewList from "@/components/ReviewList";
import PreviousYears from "@/components/PreviousYears";

const Home = ({ series, movies, reviews }) => {
  const month = getMonthName(new Date().getMonth());

  console.log({ series, movies, reviews });

  return (
    <Layout>
      <Head>
        <title>{`TopDelMes ${month}: Las 10 Películas y Series más populares del Mes`}</title>
        <meta
          name="description"
          content={`Descubre las 10 películas y series más populares de ${month} en TopDelMes.com. ¡Entérate de lo más visto y no te pierdas ninguna novedad!`}
        />
        <meta
          name="keywords"
          content={`Películas y series del mes, top 10, estrenos, mejores, ${month}`}
        />
        <link rel="canonical" href="https://www.topdelmes.com/" />
      </Head>
      <header className={styles.header}>
        <div>
          <h1 className={styles.heading}>Top del mes de {month}</h1>
          <p>
            Bienvenido a TopDelMes, tu fuente de información sobre las películas
            y series más populares del mes actual. Aquí encontrarás las últimas
            tendencias y los estrenos que están arrasando en el mundo del cine y
            la televisión.
          </p>
        </div>
      </header>
      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>
            Las series mejor valoradas durante el mes de {month}
          </p>
          <h2 className={styles.title}>Top 10 de series</h2>
        </header>
        <List items={series} dataprop="TVSeries" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/series">
            Mejores estrenos de series de este mes
          </Link>
          <Link className={styles.cta} href="/mejores/series/2023">
            Mejores series del año 2023
          </Link>
        </footer>
      </section>

      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>
            Las películas mejor puntuadas durante el mes de {month}
          </p>
          <h2 className={styles.title}>Top 10 de películas</h2>
        </header>
        <List items={movies} dataprop="Movie" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/peliculas">
            Mejores estrenos de películas de este mes
          </Link>
          <Link className={styles.cta} href="/mejores/peliculas/2023">
            Mejores películas del año 2023
          </Link>
        </footer>
      </section>
      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>Últimos análisis del mes de {month}</p>
          <h2 className={styles.title}>
            Análisis de las mejores películas y series del mes
          </h2>
        </header>
        <ReviewList reviews={reviews} />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/analisis">
            Ver todos los análisis
          </Link>
        </footer>
      </section>
      <PreviousYears />
      <Previous />
      <TimeMachine />
    </Layout>
  );
};

export async function getServerSideProps() {
  const month = getCurrentMonth();
  const year = getCurrentYear();

  try {
    const [contentsResponse, reviewsResponse] = await Promise.all([
      axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[year][$eq][0]=${year}&filters[month][$eq][1]=${month}&populate=*`,
        axiosConfig
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?sort=createdAt:desc`,
        axiosConfig
      ),
    ]);

    const contents = contentsResponse.data.data[0].attributes.contents.data;

    const series = contents
      .filter((i) => i.attributes.type === "tv_series")
      .slice(0, 10);

    const movies = contents
      .filter((i) => i.attributes.type === "movie")
      .slice(0, 10);

    const reviews = reviewsResponse.data.data.slice(0, 10);

    return { props: { series, movies, reviews } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { series: [], movies: [], reviews: [] } };
  }
}

export default Home;
