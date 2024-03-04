import { useState } from "react";
import { UpdateParams } from "../../pages/ItemsPage";
import styles from "./Pagination.module.scss";

interface IProps {
    currentPage: number;
    totalPages: number;
    updateFetchParams: (params: UpdateParams) => void;
}

const Pagination = (props: IProps) => {
    const { currentPage, totalPages, updateFetchParams } = props;

    const toNextPage = () => {
        if (currentPage < totalPages) {
            const newOffset = currentPage + 1;
            updateFetchParams({ offset: newOffset.toString() });
        }
    }

    const toLastPage = () => {
        if (currentPage < totalPages) {
            const newOffset = totalPages - 1;
            updateFetchParams({ offset: newOffset.toString() });
        }
    }

    const toPreviosPage = () => {
        if (currentPage > 0) {
            const newOffset = currentPage - 1;
            updateFetchParams({ offset: newOffset.toString() });
        }
    }

    const toFirstPage = () => {
        if (currentPage > 0) {
            updateFetchParams({ offset: "0" });
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