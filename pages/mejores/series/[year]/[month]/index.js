import Layout from "@/components/Layout";
import List from "@/components/List";
import styles from "@/styles/Series.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import {
  validateYearAndMonth,
  getMonthNumber,
  isCurrentMonthAndYear,
  getPrevNextYearMonth,
} from "@/utils";
import Link from "next/link";

const Series = ({ year, month, series }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Cargando...</div>;
  }

  const { next, prev } = getPrevNextYearMonth(year, month, "series");

  return (
    <Layout>
      <Head>
        <title>{`Top ${month} ${year}: Mejores Series Actualizadas | TopDelMes`}</title>
        <meta
          name="description"
          content={`Explora las mejores series de ${month} ${year} en nuestra lista completa y actualizada en TopDelMes.com. ¡Encuentra tus series favoritas y descubre nuevas!`}
        />
        <meta
          name="keywords"
          content={`mejores series ${month} ${year}, series populares ${month} ${year}, series del mes ${month} ${year}`}
        />
        <link
          rel="canonical"
          href={`https://www.topdelmes.com/mejores/series/${year}/${month}`}
        />
      </Head>
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>
          Las mejores series de {month} {year}: Top 10 del mes
        </h1>
        <h2 className={styles.subtitle}>
          Las series mejor puntuadas durante el mes de {month} de {year}
        </h2>
        <p className={styles.description}>
          Descubre las 10 series más populares y mejor valoradas del mes de{" "}
          {month} {year} en nuestra selección mensual. Este ranking te ayudará a
          mantenerte informado sobre las últimas tendencias y los estrenos más
          destacados en el mundo de las series de televisión. No te pierdas
          ninguna novedad y disfruta de las mejores series del momento.
        </p>
        <p className={styles.description}>
          En nuestra lista de las mejores series de {month} {year}, encontrarás
          una amplia variedad de géneros y temáticas, desde dramas intensos
          hasta comedias ligeras, pasando por intrigantes series de ciencia
          ficción y apasionantes thrillers. Nuestro ranking se basa en las
          valoraciones y opiniones de los espectadores, lo que garantiza que
          solo encontrarás las series más populares y de mayor calidad.
        </p>
        <p className={styles.description}>
          Si estás buscando nuevas series para ver o quieres saber cuáles son
          las más destacadas del mes, nuestra lista de las mejores series de{" "}
          {month} {year} es el recurso perfecto para ti. Explora nuestro ranking
          y descubre las series que están dando de qué hablar. ¡No esperes más y
          comienza a disfrutar de las mejores series del mes!
        </p>
        <List items={series} dataprop="TVSeries" />
        <footer className={styles.footer}>
          {prev && (
            <Link href={`/series/${prev.year}/${prev.month}`}>
              Ver series de {prev.month} {prev.year}
            </Link>
          )}
          {next && (
            <Link href={`/series/${next.year}/${next.month}`}>
              Ver series de {next.month} {next.year}
            </Link>
          )}
        </footer>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { year, month } = context.params;

  try {
    if (isCurrentMonthAndYear(year, month)) {
      return {
        redirect: {
          destination: "/series",
          permanent: false,
        },
      };
    }

    if (!validateYearAndMonth(year, month, "series")) {
      return {
        redirect: {
          destination: "/no-hay-datos",
          permanent: false,
        },
      };
    }

    const monthNumber = getMonthNumber(month);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/series?api_key=${process.env.NEXT_PUBLIC_API_KEY}&month=${monthNumber}&year=${year}`
    );

    const series = response.data
      .filter((item) => item.rating !== 0)
      .slice(0, 10);

    return { props: { series, year, month } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { series: [], year, month } };
  }
}

export default Series;
