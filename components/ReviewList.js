import styles from '../styles/ReviewList.module.css'
import Card from './Card'
import Image from "next/image";
import {postFormatDate} from "@/utils";

const ReviewList = ({ reviews }) => {
    return (
        <ul className={styles.list}>
            {reviews.map((review) => (
                <li key={review.id} className={styles.item} itemScope itemType="http://schema.org/Article">
                    <article className={styles.article}>
                        <figure style={{backgroundImage: `url("${review.attributes.cover_url}")`}}>
                            <a href={`/analisis/${review.attributes.slug}`} itemProp="url">
                                <Image itemProp="image" src={review.attributes.cover_url} width={384} height={216} alt={`Análisis ${review.attributes.title}`} />
                            </a>
                        </figure>
                        <div className={styles.container}>
                        <h2 itemProp="headline">
                            <a href={`/analisis/${review.attributes.slug}`}>{review.attributes.title}</a>
                        </h2>
                        <time dateTime={review.attributes.publishedAt} itemProp="datePublished">{postFormatDate(review.attributes.publishedAt)}</time>
                        <p itemProp="description">{review.attributes.excerpt}</p>
                        <div itemProp="author" itemScope itemType="http://schema.org/Person">
                            <meta itemProp="name" content="Oscar Bustos" />
                        </div>
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    )
}

export default ReviewList
