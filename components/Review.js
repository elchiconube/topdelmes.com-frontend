import Image from 'next/image'
import styles from '../styles/Review.module.css'
import imdbLogo from '../public/imdb-logo.png'
import metascoreLogo from '../public/metascore-logo.png'

const Review = ({ review }) => {
    return (
        <article>
            <figure>
                <Image itemProp="image" className={styles.poster} src={review.attributes.cover_url} alt={`${review.attributes.title} Cartel`} width={562} height={834} />
            </figure>
            <div >
                <h1 itemProp="name">{review.attributes.title}</h1>
            </div>
            <div>
                <p><Image src={metascoreLogo} width={16} height={16} alt='Metascore Logo' />5</p>
                <p><Image src={imdbLogo} width={21} height={21} alt='IMDB Logo' />5</p>
            </div>
            <footer >
            </footer>
        </article>)
}

export default Review


