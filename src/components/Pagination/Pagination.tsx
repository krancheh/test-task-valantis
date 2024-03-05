import { UpdateParams } from "../../pages/ItemsPage/ItemsPage";
import styles from "./Pagination.module.scss";

interface IProps {
    currentPage: number;
    totalPages: number;
    updateFetchParams: (params: UpdateParams) => void;
}

const Pagination = (props: IProps) => {
    const { currentPage, totalPages, updateFetchParams } = props;

    const goToPage = (page: number) => {
        const newOffset = Math.max(0, Math.min(page, totalPages - 1));
        updateFetchParams({ offset: newOffset.toString() })
    }

    return (
        <div className={styles.pagination}>
            <nav className={styles.content}>
                <button title="На первую страницу" className={styles.pageButton} disabled={currentPage <= 0} onClick={() => goToPage(0)}>{"<<"}</button>
                <button title="На предыдущую страницу" className={styles.pageButton} disabled={currentPage <= 0} onClick={() => goToPage(currentPage - 1)}>{"<"}</button>
                <button title="Текущая страница" className={styles.pageButton}>{currentPage + 1}</button>
                <button title="На следующую страницу" className={styles.pageButton} disabled={currentPage >= totalPages - 1} onClick={() => goToPage(currentPage + 1)}>{">"}</button>
                <button title="На последнюю страницу" className={styles.pageButton} disabled={currentPage >= totalPages - 1} onClick={() => goToPage(totalPages - 1)}>{">>"}</button>
            </nav>
        </div>
    )
}

export default Pagination