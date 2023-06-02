import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import List from "@/components/List";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import styles from "@/styles/Home.module.css";
import {
  axiosConfig,
  getCurrentMonth,
  getCurrentYear,
  getMonthName,
  getToday,
} from "@/utils";
import pattern from "@/public/pattern.png";

const ReviewList = dynamic(() => import("@/components/ReviewList"), {
  ssr: false,
  loading: () => <Loader />,
});

const Previous = dynamic(() => import("@/components/Previous"), {
  ssr: false,
  loading: () => <Loader />,
});

const PreviousYears = dynamic(() => import("@/components/PreviousYears"), {
  ssr: false,
  loading: () => <Loader />,
});

const TimeMachine = dynamic(() => import("@/components/TimeMachine"), {
  ssr: false,
  loading: () => <Loader />,
});

const Home = ({ series, movies, reviews }) => {
  const month = getMonthName(new Date().getMonth());
  const year = getCurrentYear();
  const today = getToday();

  return (
    <Layout>
      <Head>
        <title>{`Top 10 Mejores Series y Películas ${month} ${year} - Actualizado Mensualmente | TopDelMes`}</title>
        <meta
          name="description"
          content={`Descubre nuestra selección actualizada de las 10 mejores series y películas de ${month} ${year}.`}
        />
        <meta
          name="keywords"
          content={`Películas y series del mes, top 10, estrenos, mejores, ${month}, ${year}`}
        />
        <link rel="canonical" href="https://topdelmes.com/" />
      </Head>
      <header className={styles.header}>
        <Image
          alt="Pattern"
          src={pattern}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
        <div>
          <h1 className={styles.heading}>
            Top del mes de {month} {year}
          </h1>
          <h2 className={styles.subtitle}>Actualizado {today}</h2>
          <p>
            Bienvenido a TopDelMes, tu web de información sobre las mejores
            películas y mejores series de {year}. En nuestra web encontrarás los
            top de series y películas por mes y por año. Descubre cuáles son las
            películas y series más populares del {year} y cuáles son las mejor
            valoradas por los usuarios.
          </p>
        </div>
      </header>
      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>
            Las series mejor valoradas durante el mes de {month} {year}
          </p>
          <h2 className={styles.title}>
            Top 10 de series {month} {year}
          </h2>
        </header>
        <div className={styles.description}>
          <p>
            Nuestra lista de las mejores series del {year} se actualiza
            diariamente para que siempre estés al día de las últimos
            lanzamientos. Además, podrás consultar los tops de meses anteriores
            y de años anteriores. Consulta los top 50 de series desde 1990 hasta
            hoy.
          </p>
          <p>
            Esperabas que apareciera una serie en nuestro top y no la ves? No te
            preocupes, averigua en qué posición está en nuestro{" "}
            <Link href={`/mejores/series/${year}`}>
              ranking de series completo
            </Link>
          </p>
        </div>
        <List items={series} dataprop="TVSeries" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/series">
            Ver el top completo de {month} {year}
          </Link>
          <Link className={styles.cta} href={`/mejores/series/${year}`}>
            Mejores series del año {year}
          </Link>
        </footer>
      </section>

      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>
            Las películas mejor puntuadas durante el mes de {month} {year}
          </p>
          <h2 className={styles.title}>
            Top 10 de películas {month} {year}
          </h2>
        </header>
        <div className={styles.description}>
          <p>
            ¿Quieres saber cuáles son las mejores películas del {year}? En
            TopDelMes te lo ponemos fácil. En nuestra web encontrarás un listado
            con las 10 mejores películas del {year} actualizado diariamente.
            Además, podrás consultar el top 50 de películas del {year} y de los
            meses anteriores. Tenemos datos desde 1920 hasta la actualidad.
          </p>
          <p>
            ¿No encuentras una película en nuestro top? No te preocupes,
            averigua en qué posición está en nuestros{" "}
            <Link href={"/peliculas"}>top de películas completo</Link>.
          </p>
        </div>

        <List items={movies} dataprop="Movie" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/peliculas">
            Ver el top completo de {month} {year}
          </Link>
          <Link className={styles.cta} href={`/mejores/peliculas/${year}`}>
            Mejores películas del año {year}
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
