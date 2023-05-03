import Head from "next/head";
import styles from "@/styles/Movies.module.css";
import List from "@/components/List";
import Layout from "@/components/Layout";
import axios from "axios";
import { getMonthName } from "@/utils";
import Previous from "@/components/Previous";
import PreviousYears from "@/components/PreviousYears";

const Movies = ({ movies }) => {
  const month = getMonthName(new Date().getMonth());

  return (
    <Layout>
      <Head>
        <title>{`Mejores Películas de ${month}: Listado Completo y Actualizado | TopDelMes`}</title>
        <meta
          name="description"
          content={`Echa un vistazo a las mejores películas de ${month} en nuestra selección completa y actualizada en TopDelMes.com. ¡No te pierdas los últimos estrenos!`}
        />
        <meta
          name="keywords"
          content={`mejores películas ${month}, películas populares ${month}, películas del mes ${month}`}
        />
        <link rel="canonical" href="https://www.topdelmes.com/peliculas" />
      </Head>
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>Ranking de películas</h1>
        <h2 className={styles.subtitle}>
          Las películas más populares y mejor puntuadas del mes
        </h2>
        <p className={styles.description}>
          Aquí, en TopDelMes, nos encanta el cine y queremos compartir contigo
          las mejores películas del mes. Nuestra selección incluye los estrenos
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
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const moviesResponse = response.data;

    const movies = moviesResponse.slice(0, 50);

    return { props: { movies } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { movies: [] } };
  }
}

export default Movies;
