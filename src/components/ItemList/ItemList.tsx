import { ItemType } from "../../types";
import Item from "../Item/Item";
import styles from "./ItemList.module.scss";

interface IProps {
    items: ItemType[];
}

const ItemList = (props: IProps) => {
    const { items } = props;

    return (
        <div className={styles.itemList}>
            {
                items.map(item => <Item key={item.id} item={item} />)
            }
        </div>
    )
}

export default ItemList