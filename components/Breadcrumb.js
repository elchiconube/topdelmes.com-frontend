import styles from "@/styles/Breadcrumb.module.css";
import Link from "next/link";
import { Fragment } from "react";
import { limitBreadcrumb } from "@/utils";

const Breadcrumb = ({ links, maxWidth = 700 }) => (
  <nav className={styles.breadcrumb}>
    <ol
      itemScope
      itemType="http://schema.org/BreadcrumbList"
      style={{ maxWidth }}
    >
      {links.map((link, index) => (
        <Fragment key={index}>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <Link itemProp="item" href={link.href} title={link.name}>
              <span>{limitBreadcrumb(link.name)}</span>
            </Link>
            <meta itemProp="name" content={link.name} />
            <meta itemProp="position" content={index + 1} />
          </li>
          {index < links.length - 1 && <>»</>}
        </Fragment>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
