import styles from '../styles/List.module.css'
import Card from './Card'

const List = ({ items, dataprop }, position) => (<ul className={styles.container}>
  {items.map(item => (<li key={item.id} itemProp="itemListElement" itemScope
        itemType={`http://schema.org/${dataprop}`}><Card position={position + 1} item={item} /><meta itemProp="position" content={position + 1} /></li>))}
</ul>)

export default List