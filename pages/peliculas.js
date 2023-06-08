import Head from "next/head";
import styles from "@/styles/Movies.module.css";
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

const Movies = ({ movies }) => {
  const year = getCurrentYear();
  const today = getToday();

  return (
    <Layout>
      <Head>
        <title>{`Mejores Películas de ${year}: Listado Completo y Actualizado | TopDelMes`}</title>
        <meta
          name="description"
          content={`Echa un vistazo a las mejores películas de ${year} en nuestra selección completa y actualizada en TopDelMes.com. ¡No te pierdas los últimos estrenos!`}
        />
        <meta
          name="keywords"
          content={`mejores películas ${year}, películas populares ${year}, películas estrenadas ${year}`}
        />
        <link rel="canonical" href="https://topdelmes.com/peliculas" />
      </Head>
      <Breadcrumb
        maxWidth={"100%"}
        links={[
          {
            href: "https://topdelmes.com/",
            name: "Inicio",
          },
          {
            href: `https://topdelmes.com/mejores/peliculas`,
            name: `Mejores peliculas de ${year}`,
          },
        ]}
      />
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>Top 50 de películas {year}</h1>
        <h2 className={styles.subtitle}>
          Las películas más populares y mejor puntuadas del mes de {year}{" "}
          (actualizado {today})
        </h2>
        <p className={styles.description}>
          En TopDelMes, nos encanta el cine y queremos compartir contigo las
          mejores películas del ${year}. Nuestra selección incluye los estrenos
          más recientes y las películas que están haciendo historia en la
          taquilla. Consulta nuestra lista actualizada y encuentra tu próxima
          película favorita.
        </p>
        <List items={movies} dataprop="Movie" />
      </div>
      <Previous type={"movies"} />
      <PreviousYears type={"movies"} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const year = getCurrentYear();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/tops?filters[$and][0][year][$eq]=${year}&filters[$and][1][month][$null]&populate=*`,
      axiosConfig
    );

    const contents = response.data.data[0].attributes.contents.data;

    const movies = contents.filter((i) => i.attributes.type === "movie");

    return { props: { movies } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { movies: [] } };
  }
}

export default Movies;
