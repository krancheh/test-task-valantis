import { useRef } from "react";
import { FilterParams } from "../../types";


interface IProps {
    setFilter: (filter: FilterParams) => void;
}

const SearchBar = (props: IProps) => {
    const { setFilter } = props;

    const searchRef = useRef<HTMLInputElement>(null);

    // Фильтр по названию
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const product = searchRef.current.value;

        if (product) {
            return setFilter({ product });
        }

        return setFilter(null);
    }

    return (
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
            <label htmlFor="search">Поиск: </label>
            <input className="input" id="search" ref={searchRef} />
            <button className="button" type="submit">Найти</button>
        </form>
    )
}

export default SearchBar