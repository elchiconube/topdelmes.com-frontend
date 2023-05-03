import Layout from "@/components/Layout";
import List from "@/components/List";
import styles from "@/styles/Series.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { getAdjacentYears, isCurrentYear, isValidYear } from "@/utils";
import Link from "next/link";

const Movies = ({ year, movies }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Cargando...</div>;
  }

  const { next, prev } = getAdjacentYears(year, "movies");

  return (
    <Layout>
      <Head>
        <title>{`Top ${year}: Mejores Películas | TopDelMes`}</title>
        <meta
          name="description"
          content={`Explora las mejores películas de  ${year} en nuestra lista completa y actualizada en TopDelMes.com. ¡Encuentra tus series favoritas y descubre nuevas!`}
        />
        <meta
          name="keywords"
          content={`mejores películas  ${year}, películas populares  ${year}, películas del año ${year}, imdb`}
        />
        <link
          rel="canonical"
          href={`https://www.topdelmes.com/mejores/peliculas/${year}`}
        />
      </Head>
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>Las mejores películas de {year}</h1>
        <h2 className={styles.subtitle}>
          Las películas mejor puntuadas durante el {year}
        </h2>
        <p className={styles.description}>
          Descubre las 10 películas más populares y mejor valoradas y estrenadas
          en {year}.
        </p>
        <p className={styles.description}>
          En nuestra lista de las mejores películas de {year}, encontrarás una
          amplia variedad de géneros y temáticas, desde dramas intensos hasta
          comedias ligeras, pasando por intrigantes películas de ciencia ficción
          y apasionantes thrillers. Nuestro ranking se basa en las valoraciones
          y opiniones de los espectadores, lo que garantiza que solo encontrarás
          las películas más populares y de mayor calidad.
        </p>
        <p className={styles.description}>
          Si estás buscando nuevas películas para ver o quieres saber cuáles son
          las más destacadas del año, nuestra lista de las mejores películas de{" "}
          {year} es el recurso perfecto para ti. Explora nuestro ranking y
          descubre las películas que están dando de qué hablar. ¡No esperes más
          y comienza a disfrutar de las mejores películas del año!
        </p>
        <List items={movies} dataprop="Movie" />
        <footer className={styles.footer}>
          {prev && (
            <Link href={`/mejores/peliculas/${prev}`}>
              Ver mejores películas estrenadas en {prev}
            </Link>
          )}
          {next && (
            <Link href={`/mejores/peliculas/${next}`}>
              Ver mejores películas estrenadas en {next}
            </Link>
          )}
        </footer>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { year } = context.params;

  try {
    if (isCurrentYear(year)) {
      return {
        redirect: {
          destination: "/peliculas",
          permanent: false,
        },
      };
    }

    if (!isValidYear(year, "movies")) {
      return {
        redirect: {
          destination: "/no-hay-datos",
          permanent: false,
        },
      };
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&year=${year}`
    );

    const movies = response.data.slice(0, 10);

    return { props: { movies, year } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { movies: [], year } };
  }
}

export default Movies;
