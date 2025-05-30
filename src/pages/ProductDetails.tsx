import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/queries/useAuth";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const { data: product, isLoading } = useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            const response = await api.get<Product>(`/products/${id}`);
            return response.data;
        },
    });

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate("/auth/login", { state: { from: `/products/${id}` } });
            return;
        }
        // TODO: Implement add to cart functionality
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.name} ${index + 2}`}
                                className="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-75"
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-semibold">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground">
                        {product.description}
                    </p>
                    <div className="space-y-4">
                        <Button
                            size="lg"
                            className="w-full"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                        {!isAuthenticated && (
                            <p className="text-sm text-muted-foreground text-center">
                                Please log in to add items to your cart
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
