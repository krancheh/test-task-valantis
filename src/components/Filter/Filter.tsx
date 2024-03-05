import { FormEventHandler, useState } from "react";
import { FilterParams } from "../../types";
import styles from "./Filter.module.scss";
import useFetchFields from "../../hooks/useFetchFields";


interface IProps {
    setFilter: (filter: FilterParams) => void;
}

const Filter = (props: IProps) => {
    const { setFilter } = props;

    const [selectedFilter, setSelectedFilter] = useState<string>(null);
    const [brand, setBrand] = useState<string>();
    const [price, setPrice] = useState<number>();

    const { fields, brands } = useFetchFields();


    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (selectedFilter === "brand" && brand) {
            return setFilter({ brand });
        }

        if (selectedFilter === "price" && price) {
            return setFilter({ price });
        }
        return setFilter(null);
    }

    const resetHandler = () => {
        setSelectedFilter(null);
        setBrand(null);
        setPrice(null);
        return setFilter(null);
    }

    return (
        <form className={styles.filter} onSubmit={submitHandler} onReset={resetHandler}>
            <h4 className={styles.title}>Параметры</h4>
            <label htmlFor="filter-list">
                <p>Фильтровать по:</p>
                <select
                    className="input"
                    id="filter-list"
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value={null}>Выберите фильтр</option>
                    {fields && fields.map(field => {
                        return <option key={field} value={field}>{field}</option>
                    })}
                </select>
            </label>


            <label htmlFor="brand-filter" className={selectedFilter !== "brand" ? styles.disabled : ""}>
                <p>Выберите бренд:</p>
                <select
                    className="input" id="brand-filter"
                    onChange={(e) => setBrand(e.target.value)}
                >
                    <option value={null}></option>
                    {brands && brands.map(brand => {
                        if (brand) return <option key={brand} value={brand}>{brand}</option>
                    })}
                </select>
            </label>

            <label htmlFor="price-filter" className={selectedFilter !== "price" ? styles.disabled : ""}>
                <p>Введите цену:</p>
                <input
                    className="input"
                    id="price-filter"
                    type="number"
                    min={0}
                    onChange={(e) => setPrice(+e.target.value)}
                />
                <span> руб.</span>
            </label>

            <div className={styles.buttons}>
                <button className="button" type="submit">Применить</button>
                <button className={"button " + styles.clearButton} type="reset">Очистить</button>
            </div>
        </form>
    )
}

export default Filter