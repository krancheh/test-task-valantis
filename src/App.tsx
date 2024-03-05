import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ItemsPage from "./pages/ItemsPage/ItemsPage";
import HomePage from "./pages/HomePage";


const App = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="test-task-valantis" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="items" element={<ItemsPage />} />
        </Route>
    ));

    return (
        <RouterProvider router={router} />
    )
}

export default App