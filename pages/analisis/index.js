import Layout from "@/components/Layout";
import ReviewList from "@/components/ReviewList";
import Head from "next/head";
import styles from "@/styles/Reviews.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosConfig } from "@/utils";

const Reviews = ({ reviews }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{`Análisis de Series y Películas | TopDelMes`}</title>
        <meta
          name="description"
          content={`Descubre análisis detallados e imparciales de tus películas y series favoritas en TopDelMes. Nuestros expertos te ofrecen opiniones y calificaciones para ayudarte a elegir qué ver.`}
        />
        <meta
          name="keywords"
          content={`análisis películas, análisis series, críticas películas, críticas series, reseñas películas, reseñas series, opiniones películas, opiniones series, calificaciones películas, calificaciones series, películas, series, imdb`}
        />
        <link rel="canonical" href={`https://topdelmes.com/analisis`} />
      </Head>
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>Análisis de Películas y Series</h1>
        <h2 className={styles.subtitle}>
          Opiniones y calificaciones de expertos para tus películas y series
          favoritas
        </h2>
        <p className={styles.description}>
          En TopDelMes, analizamos las películas y series más populares y mejor
          puntuadas para que puedas tomar decisiones informadas sobre qué ver.
          Nuestros expertos te ofrecen opiniones detalladas e imparciales, así
          como calificaciones basadas en diversos factores. Explora nuestra
          selección de análisis y descubre tus próximos favoritos.
        </p>
        <ReviewList reviews={reviews} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?sort=createdAt:desc`,

      axiosConfig
    );

    const reviews = response.data.data;

    return { props: { reviews } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { reviews: [] } };
  }
}

export default Reviews;
