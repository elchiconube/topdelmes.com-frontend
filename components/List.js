import styles from '../styles/List.module.css'
import Card from './Card'

const List = ({ items, year }) => (<ul className={styles.container}>
  {items.map(item => (<li key={item.id}><Card item={item} year={year} /></li>))}
</ul>)

export default List


