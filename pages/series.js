import Head from "next/head";
import styles from "@/styles/Series.module.css";
import List from "@/components/List";
import Layout from "@/components/Layout";
import axios from "axios";
import {
  axiosConfig,
  getCurrentMonth,
  getCurrentYear,
  getMonthName,
  getToday,
} from "@/utils";
import Previous from "@/components/Previous";
import PreviousYears from "@/components/PreviousYears";

const Series = ({ series }) => {
  const month = getMonthName(new Date().getMonth());
  const year = getCurrentYear();
  const today = getToday();
  return (
    <Layout>
      <Head>
        <title>{`Mejores Series de ${month} ${year}: Listado Completo y Actualizado | TopDelMes`}</title>
        <meta
          name="description"
          content={`Explora las mejores series de ${month} ${year} en nuestra lista completa y actualizada en TopDelMes.com. ¡Encuentra tus series favoritas y descubre nuevas!`}
        />
        <meta
          name="keywords"
          content={`mejores series ${month} ${year}, series populares ${month} ${year}, series del mes ${month} ${year}`}
        />
        <link rel="canonical" href="https://www.topdelmes.com/series" />
      </Head>
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>
          Top 50 de series {month} {year}
        </h1>
        <h2 className={styles.subtitle}>
          Las series más populares y mejor puntuadas del mes de {month} {year}{" "}
          (actualizado {today})
        </h2>
        <p className={styles.description}>
          En TopDelMes, nos esforzamos por mantenerte al día con las series más
          populares y emocionantes del momento. Nuestra lista de las mejores
          series del mes se actualiza regularmente para asegurarnos de que
          siempre estés informado sobre las novedades y las series que no puedes
          perderte.
        </p>
        <List items={series} dataprop="TVSeries" />
      </div>
      <Previous type={"series"} />
      <PreviousYears />
    </Layout>
  );
};

export async function getServerSideProps() {
  const month = getCurrentMonth();
  const year = getCurrentYear();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[year][$eq][0]=${year}&filters[month][$eq][1]=${month}&populate=*`,
      axiosConfig
    );

    const contents = response.data.data[0].attributes.contents.data;

    const series = contents.filter((i) => i.attributes.type === "tv_series");

    return { props: { series } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { series: [] } };
  }
}

export default Series;
