import styles from "@/styles/Previous.module.css";
import Link from "next/link";
import { getPreviousMonths, getPreviousYears } from "@/utils";

const PreviousYears = () => {
  const { series, movies } = getPreviousYears("series");

  return (
    <section className={styles.section}>
      <header>
        <p className={styles.subtitle}>
          Descubre las mejores series y películas de años anteriores
        </p>
        <h2 className={styles.title}>
          Mejores series y películas de años anteriores
        </h2>
      </header>
      <div className={styles.multiple_list}>
        <div>
          <h3>Series mejor valoradas por año</h3>
          <ul>
            {series.map(({ url, year }) => (
              <li key={year}>
                <Link href={url}>
                  Las mejores series estrenadas en de {year}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Películas mejor valoradas por año</h3>
          <ul>
            {movies.map(({ url, year }) => (
              <li key={year}>
                <Link href={url}>
                  Las mejores películas estrenadas en {year}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PreviousYears;
