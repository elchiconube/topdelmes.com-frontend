import styles from "@/styles/Breadcrumb.module.css";
import Link from "next/link";

const Breadcrumb = ({ links, maxWidth = 700 }) => (
  <nav className={styles.breadcrumb}>
    <ol
      itemScope
      itemType="http://schema.org/BreadcrumbList"
      style={{ maxWidth }}
    >
      {links.map((link, index) => (
        <>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <Link itemProp="item" href={link.href}>
              <span itemProp="name">{link.name}</span>
            </Link>
            <meta itemProp="position" content={index + 1} />
          </li>
          {index < links.length - 1 && <>»</>}
        </>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
