import { Toaster } from "sonner";

const App = () => {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <h1 className="text-emerald-500">Esoko</h1>
            <Toaster richColors position="top-right" />
        </div>
    );
};

export default App;
