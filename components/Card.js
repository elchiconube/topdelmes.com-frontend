import Image from "next/image";
import styles from "../styles/Card.module.css";
import { Clock } from "@phosphor-icons/react";
import imdbLogo from "../public/imdb-logo.png";
import metascoreLogo from "../public/metascore-logo.png";
import { updatePosterUrl, formatVotes } from "../utils";
import Link from "next/link";

const Card = ({ item, ranking }) => {
  const { title, poster, pub_year, metascore, imdb, votes, runtime, reviews } =
    item.attributes;
  return (
    <div className={styles.container} data-ranking={ranking}>
      <figure className={styles.figure}>
        <Image
          itemProp="image"
          className={styles.poster}
          src={poster}
          alt={`${title} Cartel`}
          width={280}
          height={415}
        />
      </figure>
      <div className={styles.header}>
        <h3 itemProp="name">{title}</h3>
      </div>
      <footer className={styles.footer}>
        <div className={styles.data}>
          <time className={styles.time} dateTime={pub_year}>
            {pub_year}
          </time>
          <div className={styles.data}>
            {metascore !== 0 && (
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
              <Image src={imdbLogo} width={21} height={21} alt="IMDB Logo" />
              {imdb} ({formatVotes(votes)})
            </p>
          </div>
        </div>
        <div className={styles.data}>
          {runtime && runtime !== 0 && (
            <p>
              <Clock color="#e2d703" size={16} /> {runtime} min.
            </p>
          )}
        </div>
        {reviews?.data?.length > 0
          ? reviews.data.map((review) => (
              <Link
                className={styles.link}
                href={`/analisis/${review.attributes.slug}`}
              >
                Leer análisis
              </Link>
            ))
          : null}
      </footer>
    </div>
  );
};

export default Card;
