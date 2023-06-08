import styles from "@/styles/Reviews.module.css";
import Link from "next/link";

const Pagination = ({ pagination }) =>
  pagination && (
    <div className={styles.pagination}>
      {pagination.page > 1 && (
        <Link
          href={`/analisis?page=${pagination.page - 1}`}
          className={styles.pagination_text}
        >
          Anterior
        </Link>
      )}
      {Array.from(Array(pagination.pageCount).keys()).map((_, i) => {
        const count = i + 1;
        return pagination.page === count ? (
          <i key={i} className={styles.pagination_current}>
            {count}
          </i>
        ) : (
          <Link
            className={styles.pagination_link}
            key={i}
            href={`/analisis?page=${i + 1}`}
          >
            {i + 1}
          </Link>
        );
      })}
      {pagination.page < pagination.pageCount && (
        <Link
          href={`/analisis?page=${pagination.page + 1}`}
          className={styles.pagination_text}
        >
          Siguiente
        </Link>
      )}
    </div>
  );

export default Pagination;
