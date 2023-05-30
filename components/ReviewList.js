import styles from "../styles/ReviewList.module.css";
import Image from "next/image";
import { limitDescription, postFormatDate, sortByField } from "@/utils";

const ReviewList = ({ reviews = [] }) => {
  const items = sortByField("publishedAt", reviews, false);

  return (
    <ul className={styles.list}>
      {items.map((review) => {
        const { image, slug, title, description, publishedAt } =
          review.attributes;

        return (
          <li key={review.id} itemScope itemType="http://schema.org/Article">
            <article className={styles.article}>
              <figure>
                <a href={`/analisis/${slug}`} itemProp="url">
                  {image && (
                    <Image
                      itemProp="image"
                      src={image}
                      width={384}
                      height={216}
                      alt={`Análisis ${title}`}
                    />
                  )}
                </a>
              </figure>

              <div className={styles.container}>
                <h2 itemProp="headline">
                  <a href={`/analisis/${slug}`}>Análisis {title}</a>
                </h2>
                <time dateTime={publishedAt} itemProp="datePublished">
                  {postFormatDate(publishedAt)}
                </time>
                {description && (
                  <p itemProp="description">{limitDescription(description)}</p>
                )}
                <div
                  itemProp="author"
                  itemScope
                  itemType="http://schema.org/Person"
                >
                  <meta itemProp="name" content="Oscar Bustos" />
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
