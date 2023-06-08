import Layout from "@/components/Layout";
import List from "@/components/List";
import styles from "@/styles/Series.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import {
  axiosConfig,
  getAdjacentYears,
  isCurrentYear,
  isValidYear,
} from "@/utils";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

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
          href={`https://topdelmes.com/mejores/peliculas/${year}`}
        />
      </Head>
      <Breadcrumb
        maxWidth={"100%"}
        links={[
          {
            href: "https://topdelmes.com/",
            name: "Inicio",
          },
          {
            href: `https://topdelmes.com/mejores/peliculas/${year}`,
            name: `Mejores peliculas de ${year}`,
          },
        ]}
      />
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
          Descubre las 50 películas más populares y mejor valoradas y estrenadas
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
    if (!isValidYear(year, "movies")) {
      return {
        redirect: {
          destination: "/no-hay-datos",
          permanent: false,
        },
      };
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[$and][0][year][$eq]=${year}&filters[$and][1][month][$null]&populate=*`,
      axiosConfig
    );

    const contents = response.data.data[0].attributes.contents.data;

    const movies = contents.filter((i) => i.attributes.type === "movie");

    return { props: { movies, year } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { movies: [], year } };
  }
}

export default Movies;
