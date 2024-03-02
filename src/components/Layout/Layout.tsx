import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import styles from "./Layout.module.scss";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.content}>
                <div className="wrapper"><Outlet /></div>
            </main>
        </div>
    )
}

export default Layout