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
import Breadcrumb from "@/components/Breadcrumb";

const Series = ({ series }) => {
  const year = getCurrentYear();
  const today = getToday();
  return (
    <Layout>
      <Head>
        <title>{`Mejores Series ${year}: Listado Completo y Actualizado | TopDelMes`}</title>
        <meta
          name="description"
          content={`Explora las mejores series de ${year} en nuestra lista completa y actualizada en TopDelMes.com. ¡Encuentra tus series favoritas y descubre nuevas!`}
        />
        <meta
          name="keywords"
          content={`mejores series ${year}, series populares  ${year}, series estrenadas ${year}`}
        />
        <link rel="canonical" href="https://topdelmes.com/series" />
      </Head>
      <Breadcrumb
        maxWidth={"100%"}
        links={[
          {
            href: "https://topdelmes.com/",
            name: "Inicio",
          },
          {
            href: `https://topdelmes.com/mejores/series`,
            name: `Mejores series de ${year}`,
          },
        ]}
      />
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>Top 50 de series {year}</h1>
        <h2 className={styles.subtitle}>
          Las series más populares y mejor puntuadas del mes de {year}{" "}
          (actualizado {today})
        </h2>
        <p className={styles.description}>
          En TopDelMes, tenemos una lista actualizada con las series más
          populares y emocionantes de {year}. Nuestra lista de las mejores
          series del mes {year} se actualiza diariamente para asegurarnos de que
          siempre estés informado sobre las novedades y las series que no te
          puedes perder.
        </p>
        <List items={series} dataprop="TVSeries" />
      </div>
      <Previous type={"series"} />
      <PreviousYears />
    </Layout>
  );
};

export async function getServerSideProps() {
  const year = getCurrentYear();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[$and][0][year][$eq]=${year}&filters[$and][1][month][$null]=null&populate=*`,
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
