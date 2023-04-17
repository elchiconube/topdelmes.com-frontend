import Image from 'next/image'
import styles from '../styles/Card.module.css'
import { Clock } from "@phosphor-icons/react";
import imdbLogo from '../public/imdb-logo.png'
import metascoreLogo from '../public/metascore-logo.png'
import {updatePosterUrl, formatVotes} from '../utils'

const Card = ({ item }) => {
  return (
    <div>
      <figure className={styles.figure}>
        <Image className={styles.poster} src={updatePosterUrl(item.poster_url)} alt={`${item.title} Cartel`} width={562} height={834} />
      </figure>
      <div className={styles.header}>
        <h3 itemprop="name">{item.title}</h3>
        <time dateTime={item.pub_year} className={styles.time}>{item.pub_year}</time>
      </div>
      <footer className={styles.footer}>
        <div className={styles.data}>
          {item.runtime !== 0 && <p><Clock color="#e2d703" size={16} /> {item.runtime} min.</p>}
          {item.metascore !== 0 && <p><Image src={metascoreLogo} width={21} height={21} alt='Metascore Logo' />{item.metascore}</p>}
          <p><Image src={imdbLogo} width={21} height={21} alt='IMDB Logo' />{item.rating} ({formatVotes(item.votes)})</p>
        </div>
      </footer>
    </div>)
}

export default Card


