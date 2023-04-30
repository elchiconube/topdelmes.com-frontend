import styles from "../styles/List.module.css";
import Card from "./Card";

const List = ({ items, dataprop }) => {
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
          itemProp="position"
          content={position + 1}
        >
          <Card ranking={position + 1} item={item} />
        </li>
      ))}
    </ul>
  );
};

export default List;
