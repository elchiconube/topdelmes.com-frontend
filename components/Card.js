import Image from "next/image";
import styles from "../styles/Card.module.css";
import { Clock } from "@phosphor-icons/react";
import imdbLogo from "../public/imdb-logo.png";
import metascoreLogo from "../public/metascore-logo.png";
import { updatePosterUrl, formatVotes, getToday } from "../utils";
import Link from "next/link";

const Card = ({ item, ranking }) => {
  const {
    title,
    poster,
    pub_year,
    metascore,
    imdb,
    votes,
    runtime,
    reviews,
    updatedAt,
  } = item.attributes;

  return (
    <div className={styles.container} data-ranking={ranking}>
      <figure className={styles.figure}>
        <Image
          loading="lazy"
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

          {runtime && runtime !== 0 && (
            <p>
              <Clock color="#e2d703" size={16} /> {runtime} min.
            </p>
          )}
        </div>
        {metascore && (
          <div className={styles.data}>
            <p>
              <Image
                src={metascoreLogo}
                width={16}
                height={16}
                alt="Metascore Logo"
              />
              Metascore
            </p>
            <p>Nota: {metascore}</p>
          </div>
        )}

        {imdb && (
          <div className={styles.data}>
            <p>
              <Image src={imdbLogo} width={21} height={21} alt="IMDB Logo" />
              IMDB
            </p>
            <p>
              Votos: {formatVotes(votes)} - Nota: {imdb}
            </p>
          </div>
        )}

        <div className={styles.center}>
          <p>Actualizado: {getToday(updatedAt)}</p>
        </div>
        {reviews?.data?.length > 0
          ? reviews.data.map((review) => (
              <Link
                key={review.id}
                className={styles.link}
                href={`/analisis/${review.attributes.slug}`}
              >
                Leer análisis: {review.attributes.rate}/10
              </Link>
            ))
          : null}
      </footer>
    </div>
  );
};

export default Card;
