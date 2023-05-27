import Layout from "@/components/Layout";
import styles from "@/styles/Author.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosConfig, markdownToHtml } from "@/utils";
import Link from "next/link";

const Review = ({ author }) => {
  const { isFallback } = useRouter();

  if (isFallback || !author) {
    return <div>Cargando...</div>;
  }

  const body = markdownToHtml(author.attributes.bio);

  return (
    <Layout>
      <Head>
        <title>{`Página de ${author.attributes.fullname} | TopDelMes`}</title>
        <meta name="description" content={``} />
        <meta name="keywords" content={``} />
        <link
          rel="canonical"
          href={`https://www.topdelmes.com/autores/${author.attributes.slug}`}
        />
      </Head>

      <nav className={styles.breadcrumb}>
        <i>»</i> <Link href="/autores">Autores</Link>
      </nav>

      <article>
        <h1>{author.attributes.fullname}</h1>

        <div
          itemProp="articleBody"
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </article>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/authors?filters[slug][$eq]=${slug}&populate=*`,
      axiosConfig
    );

    const author = response.data.data[0];

    return { props: { author } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { author: null } };
  }
}

export default Review;
