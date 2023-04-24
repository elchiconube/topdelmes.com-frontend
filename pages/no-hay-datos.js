import Head from "next/head";
import List from "@/components/List";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { getMonthName } from "@/utils";
import Link from "next/link";

const NoData = ({ series, movies }) => {
  return (
    <Layout>
      <Head>
        <title>{`¡Oops! Página no encontrada - 404 Error | TopDelMes`}</title>
        <meta
          name="description"
          content={`Lo sentimos, pero la página que buscas no existe o ha sido eliminada. ¡Explora nuestro sitio para encontrar el contenido que necesitas!`}
        />
        <meta
          name="keywords"
          content={`404, error, página no encontrada, contenido no disponible, enlace roto`}
        />
        <link rel="canonical" href={`https://www.topdelmes.com/no-hay-datos`} />
      </Head>
      <section className={styles.error}>
        <h1 className={styles.heading}>Vaya creo que te has equivocado</h1>
        <p>Lo siento pero no tenemos datos o la fecha no es correcta</p>
        <p>
          Para obtener series puedes probar a partir 1990 y para películas a
          partir de 1920. Por ejemplo
        </p>
        <ul>
          <li>
            <Link href="/mejores/series/1990/enero">
              Top 10 de series en enero de 1990
            </Link>
          </li>
          <li>
            <Link href="/mejores/peliculas/1925/enero">
              Top 10 de peliculas en abril de 1925
            </Link>
          </li>
        </ul>
        <p>
          Prueba a cambiar el año y el mes o vuelve al{" "}
          <Link href={"/"}>Inicio</Link>
        </p>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const [seriesResponse, moviesResponse] = await Promise.all([
      axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/series?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ),
    ]);

    const series = seriesResponse.data.slice(0, 10);
    const movies = moviesResponse.data.slice(0, 10);

    return { props: { series, movies } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { series: [], movies: [] } };
  }
}

export default NoData;
