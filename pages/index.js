import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
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

const List = dynamic(() => import("@/components/List"), {
  loading: () => <Loader />,
});

const ReviewList = dynamic(() => import("@/components/ReviewList"), {
  loading: () => <Loader />,
});

const Previous = dynamic(() => import("@/components/Previous"), {
  loading: () => <Loader />,
});

const PreviousYears = dynamic(() => import("@/components/PreviousYears"), {
  loading: () => <Loader />,
});

const TimeMachine = dynamic(() => import("@/components/TimeMachine"), {
  loading: () => <Loader />,
});

const Home = ({
  seriesYear,
  moviesYear,
  seriesMonth,
  moviesMonth,
  reviews,
}) => {
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
          <h1 className={styles.heading}>TopDelMes</h1>
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
          <p className={styles.subtitle}>Las mejores series de {year}</p>
          <h2 className={styles.title}>Top 10 de series de {year}</h2>
        </header>
        <div className={styles.description}>
          <p>
            Nuestra lista de las mejores series del {year} se actualiza
            diariamente para que siempre estés al día de las últimos
            lanzamientos. Esperabas que apareciera una serie en nuestro top y no
            la ves? No te preocupes, averigua en qué posición está en nuestro{" "}
            <Link href={`/series`}>ranking de series completo</Link>
          </p>
        </div>
        <List items={seriesYear} dataprop="TVSeries" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href={`/series`}>
            Mejores series del año {year}
          </Link>
        </footer>
      </section>

      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>
            Las películas mejor puntuadas durante el mes de {year}
          </p>
          <h2 className={styles.title}>Top 10 de películas {year}</h2>
        </header>
        <div className={styles.description}>
          <p>
            ¿Quieres saber cuáles son las mejores películas del {year}? En
            TopDelMes te lo ponemos fácil. Aquí tienes un listado con las 10
            mejores películas del {year} actualizado diariamente. Además, podrás
            consultar{" "}
            <Link href={`/peliculas`}>las mejores películas de {year}.</Link>
          </p>
        </div>
        <List items={moviesYear} dataprop="Movie" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href={`/peliculas`}>
            Mejores películas del año {year}
          </Link>
        </footer>
      </section>

      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>Últimos análisis del mes de {month}</p>
          <h2 className={styles.title}>
            Análisis de las mejores películas y series
          </h2>
        </header>
        <ReviewList reviews={reviews} />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href="/analisis">
            Ver todos los análisis
          </Link>
        </footer>
      </section>

      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>
            Las series estrenadas en {month} {year} mejor valoradas
          </p>
          <h2 className={styles.title}>
            Mejores series {month} {year}
          </h2>
        </header>
        <div className={styles.description}>
          <p>
            Aquí tienes un listado con las 10 mejores series estrenadas en{" "}
            {month} {year} actualizado diariamente. Esperabas que apareciera una
            serie en nuestro top y no la ves? No te preocupes, averigua en qué
            posición está en nuestro{" "}
            <Link href={`/mejores/series/${year}/${month}`}>
              ranking completo de {month} {year}
            </Link>
          </p>
        </div>
        <List items={seriesMonth} dataprop="TVSeries" />
        <footer className={styles.section_footer}>
          <Link
            className={styles.cta}
            href={`/mejores/series/${year}/${month}`}
          >
            Ver el top completo de {month} {year}
          </Link>
        </footer>
      </section>

      <section className={styles.section}>
        <header>
          <p className={styles.subtitle}>
            Las películas estrenadas en {month} {year} mejor valoradas
          </p>
          <h2 className={styles.title}>
            Mejores películas {month} {year}
          </h2>
        </header>
        <div className={styles.description}>
          <p>
            ¿Quieres saber cuáles son los mejores películas estrenadas en $
            {month} {year}? Aquí tienes un listado con las 10 mejores películas
            estrenadas en ${month} {year} actualizado diariamente. Además,
            podrás consultar el{" "}
            <Link href={"/mejores/peliculas"}>top de películas completo</Link>.
          </p>
        </div>
        <List items={moviesMonth} dataprop="Movie" />
        <footer className={styles.section_footer}>
          <Link className={styles.cta} href={`/mejores/peliculas/${year}`}>
            Mejores películas {month} {year}
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
    const [contentsYearResponse, contentsMonthResponse, reviewsResponse] =
      await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[$and][0][year][$eq]=${year}&filters[$and][1][month][$null]=null&populate=*`,
          axiosConfig
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[year][$eq][0]=${year}&filters[month][$eq][1]=${month}&populate=*`,
          axiosConfig
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?sort=createdAt:desc&populate=*`,
          axiosConfig
        ),
      ]);

    const contentsYear =
      contentsYearResponse.data.data[0].attributes.contents.data;

    const contentsMonth =
      contentsMonthResponse.data.data[0].attributes.contents.data;

    const seriesYear = contentsYear
      .filter((i) => i.attributes.type === "tv_series")
      .slice(0, 10);

    const moviesYear = contentsYear
      .filter((i) => i.attributes.type === "movie")
      .slice(0, 10);

    const seriesMonth = contentsMonth
      .filter((i) => i.attributes.type === "tv_series")
      .slice(0, 10);

    const moviesMonth = contentsMonth
      .filter((i) => i.attributes.type === "movie")
      .slice(0, 10);

    const reviews = reviewsResponse.data.data.slice(0, 10);

    return {
      props: { seriesYear, moviesYear, seriesMonth, moviesMonth, reviews },
    };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { series: [], movies: [], reviews: [] } };
  }
}

export default Home;
