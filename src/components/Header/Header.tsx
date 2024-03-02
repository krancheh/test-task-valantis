import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

interface NavLinkStatus {
    isActive: boolean;
}

const Header = () => {
    const activeLinkClassname = `${styles.text} ${styles.active}`;

    const handleNavLinkClassname = (status: NavLinkStatus) => status.isActive ? activeLinkClassname : styles.text;

    return (
        <div className={styles.header}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Link to="/" className={styles.text}>
                        <h3>MyShop</h3>
                    </Link>

                    <nav>
                        <NavLink to="/items" className={handleNavLinkClassname}>Каталог</NavLink>
                        <NavLink to="/brands" className={handleNavLinkClassname}>Бренды</NavLink>
                    </nav>

                    <div className={styles.user}>
                        <p>Пользователь</p>
                        <div className={styles.avatar} title="Аватар">A</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header