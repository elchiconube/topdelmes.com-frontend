import styles from "@/styles/TimeMachine.module.css";
import Link from "next/link";
import Image from "next/image";
import pattern from "@/public/pattern.png";

const TimeMachine = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const startYear = 1990;
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const year =
    Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;
  let month = months[Math.floor(Math.random() * months.length)];
  if (year === currentYear) {
    month = months.slice(0, currentMonth)[
      Math.floor(Math.random() * (currentMonth + 1))
    ];
  }

  return (
    <section className={styles.section}>
      <Image
        alt="Pattern"
        src={pattern}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <header>
        <span className={styles.subtitle}>
          Descubre películas y series al azar
        </span>
        <h2 className={styles.title}>
          ¡Sorpresa viaja en nuestra máquina del tiempo!
        </h2>
      </header>
      <div>
        <p>
          ¿Buscas algo nuevo y emocionante para ver, pero no sabes por dónde
          empezar? ¡Tenemos la solución perfecta para ti! Haz clic en el
          cualquiera de los botones a continuación y te llevaremos a una
          selección aleatoria de películas o series de un año y mes al azar.
          ¡Explora el maravilloso mundo del cine y la televisión y descubre
          tesoros ocultos que quizás te hayas perdido! No esperes más, ¡la
          aventura cinematográfica te espera!
        </p>
      </div>
      <footer className={styles.actions}>
        <Link className={styles.cta} href={`/mejores/series/${year}/${month}`}>
          Soy más de series
        </Link>
        <Link
          className={styles.cta}
          href={`/mejores/peliculas/${year}/${month}`}
        >
          Hoy me apetece películas
        </Link>
      </footer>
    </section>
  );
};

export default TimeMachine;
