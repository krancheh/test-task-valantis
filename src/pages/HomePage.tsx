import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className="hero">
            <h1 style={{ marginBottom: "15px" }}>Добро пожаловать</h1>
            <Link className='button' to="/items">Перейти в каталог</Link>
        </div>
    )
}

export default HomePage