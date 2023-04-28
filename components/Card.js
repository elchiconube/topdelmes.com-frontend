import Image from "next/image";
import styles from "../styles/Card.module.css";
import { Clock } from "@phosphor-icons/react";
import imdbLogo from "../public/imdb-logo.png";
import metascoreLogo from "../public/metascore-logo.png";
import { updatePosterUrl, formatVotes } from "../utils";

const Card = ({ item }) => {
  return (
    <div>
      <figure className={styles.figure}>
        <Image
          itemProp="image"
          className={styles.poster}
          src={updatePosterUrl(item.poster_url)}
          alt={`${item.title} Cartel`}
          width={280}
          height={415}
        />
      </figure>
      <div className={styles.header}>
        <h3 itemProp="name">{item.title}</h3>
      </div>
      <footer className={styles.footer}>
        <div className={styles.data}>
          <time className={styles.time} dateTime={item.pub_year}>
            {item.pub_year}
          </time>
          <div className={styles.data}>
            {item.metascore !== 0 && (
              <p>
                <Image
                  src={metascoreLogo}
                  width={16}
                  height={16}
                  alt="Metascore Logo"
                />
                {item.metascore}
              </p>
            )}
            <p>
              <Image src={imdbLogo} width={21} height={21} alt="IMDB Logo" />
              {item.rating} ({formatVotes(item.votes)})
            </p>
          </div>
        </div>
        <div className={styles.data}>
          {item.runtime !== 0 && (
            <p>
              <Clock color="#e2d703" size={16} /> {item.runtime} min.
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Card;
