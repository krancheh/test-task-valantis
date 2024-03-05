import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ItemsPage from "./pages/ItemsPage/ItemsPage";
import HomePage from "./pages/HomePage";


const App = () => {
    const router = createHashRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="items" element={<ItemsPage />} />
        </Route>
    ));

    return (
        <RouterProvider router={router} />
    )
}

export default App