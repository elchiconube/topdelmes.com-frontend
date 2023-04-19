import Layout from '@/components/Layout';
import styles from '@/styles/Review.module.css'
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { markdownToHtml, postFormatDate} from '@/utils'
import Image from "next/image";
import Link from "next/link";
import metascoreLogo from "@/public/metascore-logo.png";
import imdbLogo from "@/public/imdb-logo.png";
import YoutubeVideo from "@/components/YoutubeVideo";

const Review = ({ review }) => {

    const { isFallback } = useRouter();

    if (isFallback) {
        return <div>Cargando...</div>;
    }

    const body = markdownToHtml(review.attributes.description);

    return (
        <Layout>
            <Head>
                <title>{`Análisis de ${review.attributes.title} | TopDelMes`}</title>
                <meta name="description" content={`Descubre el análisis de ${review.attributes.title}. Lee nuestra crítica detallada y entérate de por qué no te puedes perder.`} />
                <meta name="keywords" content={`análisis ${review.attributes.title}, crítica ${review.attributes.title}, reseña ${review.attributes.title}, serie ${review.attributes.title}, comedia, tribunal, opinión ${review.attributes.title}, calificación ${review.attributes.title}, TopDelMes`} />
                <link rel="canonical" href={`https://www.topdelmes.com/analisis/${review.attributes.slug}`} />
            </Head>

            <nav className={styles.breadcrumb}>
                <i>»</i> <Link href="/analisis">Análisis</Link>
            </nav>
            <article className={styles.article} itemScope itemType="http://schema.org/Article">
                <h1 itemProp="headline">
                    {review.attributes.title}
                </h1>
                <div className={styles.pre}>
                    <time dateTime={review.attributes.publishedAt} itemProp="datePublished">{postFormatDate(review.attributes.publishedAt)}</time>
                    <p itemProp="author" itemScope itemType="http://schema.org/Person">
                        <span itemProp="name">Oscar Bustos</span>
                    </p>
                </div>
                <figure className={styles.figure}>
                    <Image itemProp="image" src={review.attributes.cover_url} width={862} height={465} alt={`Análisis ${review.attributes.title}`} />
                </figure>
                <div className={styles.data}>
                    {review.attributes.metascore && <p><Image src={metascoreLogo} width={16} height={16} alt='Metascore Logo' />{review.attributes.metascore}</p>}
                    <p><Image src={imdbLogo} width={30} height={30} alt='IMDB Logo' />{review.attributes.imdb}</p>
                </div>
                <div itemprop="articleBody" className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
                <YoutubeVideo url={review.attributes.trailer_url} />
            </article>

        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { slug } = context.params;

    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_POST}/posts?filters[slug][$eq]=${slug}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_POST}`,
            }
        });

        const review = response.data.data[0];


        return { props: { review } };
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return { props: { review: null } };
    }
}

export default Review;
