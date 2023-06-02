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

const Series = ({ year, series }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Cargando...</div>;
  }

  const { next, prev } = getAdjacentYears(year, "series");

  return (
    <Layout>
      <Head>
        <title>{`Top ${year}: Mejores Series | TopDelMes`}</title>
        <meta
          name="description"
          content={`Explora las mejores series de  ${year} en nuestra lista completa y actualizada en TopDelMes.com. ¡Encuentra tus series favoritas y descubre nuevas!`}
        />
        <meta
          name="keywords"
          content={`mejores series  ${year}, series populares  ${year}, series del año ${year}, imdb`}
        />
        <link
          rel="canonical"
          href={`https://topdelmes.com/mejores/series/${year}`}
        />
      </Head>
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>Las mejores series de {year}</h1>
        <h2 className={styles.subtitle}>
          Las series mejor puntuadas durante el {year}
        </h2>
        <p className={styles.description}>
          Descubre las 50 series más populares y mejor valoradas y estrenadas en{" "}
          {year}.
        </p>
        <p className={styles.description}>
          En nuestra lista de las mejores series de {year}, encontrarás una
          amplia variedad de géneros y temáticas, desde dramas intensos hasta
          comedias ligeras, pasando por intrigantes series de ciencia ficción y
          apasionantes thrillers. Nuestro ranking se basa en las valoraciones y
          opiniones de los espectadores, lo que garantiza que solo encontrarás
          las series más populares y de mayor calidad.
        </p>
        <p className={styles.description}>
          Si estás buscando nuevas series para ver o quieres saber cuáles son
          las más destacadas del año, nuestra lista de las mejores series de{" "}
          {year} es el recurso perfecto para ti. Explora nuestro ranking y
          descubre las series que están dando de qué hablar. ¡No esperes más y
          comienza a disfrutar de las mejores series del año!
        </p>
        <List items={series} dataprop="TVSeries" />
        <footer className={styles.footer}>
          {prev && (
            <Link href={`/mejores/series/${prev}`}>
              Ver mejores series estrenadas en {prev}
            </Link>
          )}
          {next && (
            <Link href={`/mejores/series/${next}`}>
              Ver mejores series estrenadas en {next}
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
          destination: "/series",
          permanent: false,
        },
      };
    }

    if (!isValidYear(year, "series")) {
      return {
        redirect: {
          destination: "/no-hay-datos",
          permanent: false,
        },
      };
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[year][$eq]=${year}&populate=*`,
      axiosConfig
    );

    const contents = response.data.data[0].attributes.contents.data;

    const series = contents.filter((i) => i.attributes.type === "tv_series");

    return { props: { series, year } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { series: [], year } };
  }
}

export default Series;
