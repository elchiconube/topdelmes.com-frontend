import styles from "../styles/ReviewList.module.css";
import { limitDescription, postFormatDate, sortByField } from "@/utils";
import popcorn from "@/public/popcorn.webp";
import Image from "next/image";

const ReviewList = ({ reviews = [] }) => {
  const items = sortByField("publishedAt", reviews, false);

  return (
    <ul className={styles.list}>
      {items.map((review) => (
        <li
          key={review.id}
          className={styles.item}
          itemScope
          itemType="http://schema.org/Article"
        >
          <article className={styles.article}>
            <figure>
              <a href={`/analisis/${review.attributes.slug}`} itemProp="url">
                <Image
                  itemProp="image"
                  loading={"lazy"}
                  alt={review.attributes.title}
                  src={review.attributes?.image || popcorn}
                  quality={100}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </a>
            </figure>
            <div className={styles.container}>
              <h2 itemProp="headline">
                <a href={`/analisis/${review.attributes.slug}`}>
                  Análisis {review.attributes.title}
                </a>
              </h2>
              <time
                dateTime={review.attributes.publishedAt}
                itemProp="datePublished"
              >
                {postFormatDate(review.attributes.publishedAt)}
              </time>
              <p itemProp="description">
                {limitDescription(review.attributes.description)}
              </p>
              <div
                itemProp="author"
                itemScope
                itemType="http://schema.org/Person"
              >
                <meta
                  itemProp="url"
                  content={`https://topdelmes.com/autores/${review.attributes.author?.data.attributes.slug}`}
                />

                <meta
                  itemProp="name"
                  content={review.attributes.author?.data.attributes.fullname}
                />
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
