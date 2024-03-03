import styles from "./Pagination.module.scss";

interface IProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination = (props: IProps) => {
    const { currentPage, totalPages, onPageChange } = props;

    const toNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const toLastPage = () => {
        if (currentPage < totalPages) {
            onPageChange(totalPages - 1);
        }
    }

    const toPreviosPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1)
        }
    }

    const toFirstPage = () => {
        if (currentPage > 0) {
            onPageChange(0);
        }
    }

    return (
        <div className={styles.pagination}>
            <nav className={styles.content}>
                <button className={styles.pageButton} disabled={currentPage <= 0} onClick={toFirstPage}>{"<<"}</button>
                <button className={styles.pageButton} disabled={currentPage <= 0} onClick={toPreviosPage}>{"<"}</button>
                <button className={styles.pageButton}>{currentPage + 1}</button>
                <button className={styles.pageButton} disabled={currentPage >= totalPages - 1} onClick={toNextPage}>{">"}</button>
                <button className={styles.pageButton} disabled={currentPage >= totalPages - 1} onClick={toLastPage}>{">>"}</button>
            </nav>
        </div>
    )
}

export default Pagination