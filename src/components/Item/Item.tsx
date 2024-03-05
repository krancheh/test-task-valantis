import { ItemType } from "../../types"
import styles from "./Item.module.scss";


interface IProps {
    item: ItemType;
}

const Item = (props: IProps) => {
    const { item } = props;

    return (
        <div className={styles.item}>
            <span className={styles.id} title={item.id}>id: {item.id}</span>
            {
                item.brand
                    ? <p className={styles.brand}>{item.brand}</p>
                    : <p className={styles.noBrand}>Бренд не указан</p>
            }
            <h5 className={styles.product}>{item.product}</h5>
            <span className={styles.price}>{item.price + " руб."}</span>
            <button className="button">Купить</button>
        </div>
    )
}

export default Item