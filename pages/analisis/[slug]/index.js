import Layout from "@/components/Layout";
import styles from "@/styles/Review.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosConfig, markdownToHtml, postFormatDate } from "@/utils";
import removeMarkdown from "markdown-to-text";
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
    director,
    updatedAt,
    author,
    contents,
    rate = 6,
  } = review.attributes;

  const reviewBody = markdownToHtml(body);

  const relatedContent =
    contents.data.length > 0 ? contents.data[0].attributes : null;
  const articleAuthor = author.data.attributes;

  const breadCrumbTitle = relatedContent ? relatedContent.title : title;

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
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <Link itemProp="item" href="https://topdelmes.com/">
              <span itemProp="name">Inicio</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          »
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <Link itemProp="item" href="https://topdelmes.com/analisis">
              <span itemProp="name">Análisis</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          »
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <Link
              itemProp="item"
              href={`https://topdelmes.com/analisis/${slug}`}
            >
              <span itemProp="name">{breadCrumbTitle}</span>
            </Link>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
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
          <meta dateTime={updatedAt} itemProp="dateModified" />
          <p
            className={styles.author}
            itemProp="author"
            itemScope
            itemType="http://schema.org/Person"
          >
            {articleAuthor ? (
              <Link itemProp="url" href={`/autores/${articleAuthor.slug}`}>
                <span itemProp="name">{articleAuthor.fullname}</span>
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
          itemProp="articleBody"
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
      {relatedContent ? (
        <footer itemScope itemType="http://schema.org/Movie">
          <meta itemProp="name" content={relatedContent.title} />
          <meta itemProp="image" content={relatedContent.poster} />
          <meta itemProp="description" content={relatedContent.description} />
          <meta itemProp="director" content={director} />
          <meta itemProp="dateCreated" content={relatedContent.createdAt} />
          <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <meta itemProp="price" content="0.00" />
            <meta itemProp="priceCurrency" content="$" />
            <div
              itemProp="seller"
              itemScope
              itemType="http://schema.org/Person"
            >
              <meta itemProp="name" content={articleAuthor.fullname} />
            </div>
          </div>
          <div itemProp="review" itemScope itemType="http://schema.org/Review">
            <div
              itemProp="author"
              itemScope
              itemType="http://schema.org/Person"
            >
              <meta
                itemProp="url"
                content={`https://topdelmes.com/autores/${articleAuthor.slug}`}
              />

              <meta itemProp="name" content={articleAuthor.fullname} />
            </div>
            <div
              itemProp="reviewRating"
              itemScope
              itemType="http://schema.org/Rating"
            >
              <meta itemProp="bestRating" content="10" />
              <meta itemProp="worstRating" content="0" />
              <meta itemProp="ratingValue" content={rate} />
            </div>
            <meta itemProp="name" content={relatedContent.title} />
            <meta itemProp="reviewBody" content={removeMarkdown(body)} />
          </div>
        </footer>
      ) : null}
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
