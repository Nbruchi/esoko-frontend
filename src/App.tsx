import { QueryProvider } from "./lib/provider";
import { StoreProvider } from "./store/provider";

const App = () => {
    return (
        <StoreProvider>
            <QueryProvider>App</QueryProvider>
        </StoreProvider>
    );
};

export default App;
