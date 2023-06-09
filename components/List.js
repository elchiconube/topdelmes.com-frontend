import styles from "../styles/List.module.css";
import Card from "./Card";

const List = ({ items, dataprop }) => {
  const getDirector = (item) =>
    item?.reviews?.data[0]?.attributes?.director || null;

  return (
    <ul
      className={styles.container}
      itemScope
      itemType="http://schema.org/ItemList"
    >
      {items.map((item, position) => (
        <li
          key={item.id}
          itemProp="itemListElement"
          itemScope
          itemType={`http://schema.org/${dataprop}`}
        >
          <meta itemProp="position" content={position + 1} />
          {getDirector(item) && (
            <meta itemProp="director" content={getDirector(item)} />
          )}
          <Card ranking={position + 1} item={item} />
        </li>
      ))}
    </ul>
  );
};

export default List;
