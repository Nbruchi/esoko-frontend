import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Welcome to Esoko</h1>
                <p className="text-xl text-muted-foreground">
                    Your one-stop shop for all your needs
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link to="/products">Browse Products</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/auth/register">Create Account</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
