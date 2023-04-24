import styles from "@/styles/Previous.module.css";
import Link from "next/link";
import { getPreviousMonths } from "@/utils";

const Previous = ({ type = false }) => {
  const { series, movies } = getPreviousMonths();

  return (
    <section className={styles.section}>
      <header>
        <p className={styles.subtitle}>
          Prueba a ver los ránkings en meses anteriores
        </p>
        <h2 className={styles.title}>Ránking de meses anteriores</h2>
      </header>
      <div className={styles.multiple_list}>
        {(!type || type === "series") && (
          <div>
            <h3>Series mejor valoradas</h3>
            <ul>
              {series.map(({ url, month, year }) => (
                <li key={month}>
                  <Link href={url}>
                    Las mejores series estrenadas en {month} de {year}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {(!type || type === "movies") && (
          <div>
            <h3>Películas mejor valoradas</h3>
            <ul>
              {movies.map(({ url, month, year }) => (
                <li key={month}>
                  <Link href={url}>
                    Las mejores películas estrenadas {month} de {year}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Previous;
