import Layout from "@/components/Layout";
import Head from "next/head";
import styles from "@/styles/Authors.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosConfig, limitDescription } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

const Authors = ({ authors }) => {
  const { isFallback } = useRouter();

  console.log(authors);

  if (isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{`Autores | TopDelMes`}</title>
        <meta name="description" content={`  `} />
        <meta name="keywords" content={``} />
        <link rel="canonical" href={`https://topdelmes.com/autores`} />
      </Head>

      <Breadcrumb
        maxWidth={900}
        links={[
          {
            href: "https://topdelmes.com/",
            name: "Inicio",
          },
          {
            href: "https://topdelmes.com/autores",
            name: "Autores",
          },
        ]}
      />

      <div className={styles.section}>
        <h2 className={styles.subtitle}>Nuestros expertos</h2>
        <h1 className={styles.title}>Autores</h1>
        <p className={styles.description}>
          Aquí podrás ver nuestro equipo al completo
        </p>

        <div className={styles.authors}>
          {authors.map((author) => (
            <address className={styles.author} key={author.id}>
              <Link href={`/autores/${author.attributes.slug}`}>
                <Image
                  src={author.attributes.avatar}
                  width={120}
                  height={120}
                  alt={author.attributes.fullname}
                />
                <h3>{author.attributes.fullname}</h3>
              </Link>
              <p>Periodista. Especialidad en crítica de cine y series</p>
            </address>
          ))}
        </div>
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

    const authors = response.data.data;

    return { props: { authors } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { authors: [] } };
  }
}

export default Authors;
