import Image from 'next/image'
import styles from '../styles/Card.module.css'
import { Clock, Star } from "@phosphor-icons/react";
import imdbLogo from '../public/imdb-logo.png'

const Card = ({ item, year }) => {
  return (
    <div>
      <figure className={styles.figure}>
        <Image className={styles.poster} src={item.poster_url} alt={`${item.title} Cartel`} width={562} height={834} />
      </figure>
      <div className={styles.header}>
        <h3>{item.title}</h3>
        <time dateTime={item.pub_year} className={styles.time}>{item.pub_year}</time>
      </div>
    
      <footer className={styles.footer}>
        <div className={styles.data}>
          {item.runtime !== 0 && <p><Clock color="#e2d703" size={16} /> {item.runtime} min.</p>}
          <p><Image src={imdbLogo} width={21} height={21} alt='IMDB Logo' />{item.rating} ({item.votes})</p>
        </div>
      </footer>
    </div>)
}

export default Card


