import Layout from "@/components/Layout";
import Head from "next/head";
import styles from "@/styles/Authors.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosConfig } from "@/utils";

const Authors = ({ authors }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{`Autores | TopDelMes`}</title>
        <meta name="description" content={` `} />
        <meta name="keywords" content={``} />
        <link rel="canonical" href={`https://www.topdelmes.com/autores`} />
      </Head>
      <div
        className={styles.section}
        itemScope
        itemType="http://schema.org/ItemList"
      >
        <h1 className={styles.title}>Autores</h1>
        <h2 className={styles.subtitle}>Nuestros expertos</h2>
        <p className={styles.description}>
          Aquí podrás ver nuestro equipo al completo
        </p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/authors?sort=createdAt:desc`,
      axiosConfig
    );

    const reviews = response.data.data;

    return { props: { reviews } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { reviews: [] } };
  }
}

export default Authors;
