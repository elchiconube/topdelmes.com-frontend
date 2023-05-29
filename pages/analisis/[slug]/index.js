import Layout from "@/components/Layout";
import styles from "@/styles/Review.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosConfig, markdownToHtml, postFormatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import metascoreLogo from "@/public/metascore-logo.png";
import imdbLogo from "@/public/imdb-logo.png";
import YoutubeVideo from "@/components/YoutubeVideo";

const Review = ({ review }) => {
  const { isFallback } = useRouter();

  if (isFallback || !review) {
    return <div>Cargando...</div>;
  }

  const {
    title,
    metascore,
    trailer,
    slug,
    body,
    image,
    publishedAt,
    author,
    rate = 6,
  } = review.attributes;

  const reviewBody = markdownToHtml(body);

  return (
    <Layout>
      <Head>
        <title>{`Análisis de ${title} | TopDelMes`}</title>
        <meta
          name="description"
          content={`Descubre el análisis de ${title}. Lee nuestra crítica detallada y entérate de por qué no te puedes perder.`}
        />
        <meta
          name="keywords"
          content={`análisis ${title}, crítica ${title}, reseña ${title}, serie ${title}, comedia, tribunal, opinión ${title}, calificación ${title}, imdb`}
        />
        <link
          rel="canonical"
          href={`https://www.topdelmes.com/analisis/${slug}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@topdelmes_" />
        <meta
          name="twitter:title"
          content={`Análisis de ${title} | TopDelMes`}
        />
        <meta
          name="twitter:description"
          content={`Descubre el análisis de ${title}. Lee nuestra crítica detallada y entérate de por qué no te puedes perder.`}
        />
        <meta name="twitter:image" content={image} />

        <meta
          property="og:title"
          content={`Análisis de ${title} | TopDelMes`}
        />
        <meta
          property="og:description"
          content={`Descubre el análisis de ${title}. Lee nuestra crítica detallada y entérate de por qué no te puedes perder.`}
        />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.topdelmes.com/analisis/${slug}`}
        />
        <meta property="og:site_name" content="TopDelMes" />
      </Head>

      <nav className={styles.breadcrumb}>
        <i>»</i> <Link href="/analisis">Análisis</Link>
      </nav>
      <article
        className={styles.article}
        itemScope
        itemType="http://schema.org/Article"
      >
        <h1 itemProp="headline">{title}</h1>
        <div className={styles.pre}>
          <time dateTime={publishedAt} itemProp="datePublished">
            {postFormatDate(publishedAt)}
          </time>
          <p
            className={styles.author}
            itemProp="author"
            itemScope
            itemType="http://schema.org/Person"
          >
            {author ? (
              <Link
                itemProp="url"
                href={`/autores/${author.data.attributes.slug}`}
              >
                <span itemProp="name">{author.data.attributes.fullname}</span>
              </Link>
            ) : (
              <span itemProp="name">TopDelMes</span>
            )}
          </p>
        </div>
        {image && (
          <figure className={styles.figure}>
            <Image
              itemProp="image"
              src={image}
              width={862}
              height={465}
              alt={`Análisis ${title}`}
            />
          </figure>
        )}
        <div className={styles.data}>
          {metascore && (
            <p>
              <Image
                src={metascoreLogo}
                width={16}
                height={16}
                alt="Metascore Logo"
              />
              {metascore}
            </p>
          )}
          <p>
            <Image src={imdbLogo} width={30} height={30} alt="IMDB Logo" />
            {rate}
          </p>
        </div>
        <div
          itemprop="articleBody"
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: reviewBody }}
        />
        <p className={styles.actions}>
          <Link
            href={"/analisis"}
            className={styles.cta}
            title={"Accede a todos los análisis"}
          >
            Ver más análisis
          </Link>
        </p>
        {trailer && <YoutubeVideo url={trailer} />}
      </article>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?filters[slug][$eq]=${slug}&populate=*`,
      axiosConfig
    );

    const review = response.data.data[0];

    return { props: { review } };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return { props: { review: null } };
  }
}

export default Review;
