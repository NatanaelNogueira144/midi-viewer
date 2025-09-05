import { RoutesProvider } from "../data/contexts/RoutesContext";
import AppRoutes from "./app.routes";

export default function Routes() {
    return (
        <RoutesProvider>
            <AppRoutes />
        </RoutesProvider>
    );
}