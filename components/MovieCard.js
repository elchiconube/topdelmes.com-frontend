import Image from "next/image";
import metascoreLogo from "@/public/metascore-logo.png";
import imdbLogo from "@/public/imdb-logo.png";
import styles from "@/styles/MovieCard.module.css";
import { postFormatDate } from "@/utils";
const MovieCard = ({ movie, director }) => (
  <div className={styles.movie}>
    <figure>
      <Image
        itemProp="image"
        src={movie.poster}
        width={300}
        height={450}
        alt={`Portada de ${movie.title}`}
      />
    </figure>
    <div>
      <h3 className={styles.title}>{movie.title}</h3>
      {director && <p>Director: {director}</p>}
      <p>
        <Image src={imdbLogo} width={30} height={30} alt="IMDB Logo" />
        {movie.imdb}/10
      </p>
      {movie.metascore && (
        <p>
          <Image
            src={metascoreLogo}
            width={30}
            height={30}
            alt="Metascore Logo"
          />
          {movie.metascore}/100
        </p>
      )}

      {movie.genre && <p>Género: {movie.genre}</p>}
      {movie.pub_year && <p>Fecha: {movie.pub_year}</p>}
      {movie.runtime && <p>Duración: {movie.runtime}</p>}
      {movie.description && <p>Descripción 🇺🇸: {movie.description}</p>}
      <p>Última actualización: {postFormatDate(movie.updatedAt)}</p>
    </div>
  </div>
);

export default MovieCard;
