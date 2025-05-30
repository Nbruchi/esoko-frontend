import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import AppRoutes from "./routes";
import { AuthProvider } from "@/context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
                <Toaster richColors position="top-right" />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
