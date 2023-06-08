import Layout from "@/components/Layout";
import styles from "@/styles/Author.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosConfig, markdownToHtml } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import ReviewList from "@/components/ReviewList";

const Review = ({ author }) => {
  const { isFallback } = useRouter();

  if (isFallback || !author) {
    return <div>Cargando...</div>;
  }

  console.log({ author });

  const body = markdownToHtml(author.attributes.bio);

  return (
    <Layout>
      <Head>
        <title>{`Página de ${author.attributes.fullname} | TopDelMes`}</title>
        <meta name="description" content={``} />
        <meta name="keywords" content={``} />
        <link
          rel="canonical"
          href={`https://topdelmes.com/autores/${author.attributes.slug}`}
        />
      </Head>
      <Breadcrumb
        maxWidth={900}
        links={[
          { href: "https://topdelmes.com/", name: "Inicio" },
          { href: "https://topdelmes.com/autores", name: "Autores" },
          {
            href: `https://topdelmes.com/autores/${author.attributes.slug}`,
            name: author.attributes.fullname,
          },
        ]}
      />
      <div
        className={styles.section}
        itemProp="author"
        itemScope
        itemType="http://schema.org/Person"
      >
        <article>
          <figure>
            <Image
              alt={author.attributes.fullname}
              src={author.attributes.avatar}
              width={120}
              height={120}
            />
          </figure>
          <h2 className={styles.subtitle}>
            Periodista especialista en críticas de cine y series
          </h2>
          <h1 className={styles.title}>{author.attributes.fullname}</h1>

          <div
            itemProp="articleBody"
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </article>
      </div>

      <ReviewList reviews={author.attributes.reviews.data} />
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
