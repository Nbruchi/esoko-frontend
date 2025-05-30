import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Product } from "@/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const ProductList = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await api.get<Product[]>("/products");
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <Card
                        key={product.id}
                        className="hover:shadow-lg transition-shadow"
                    >
                        <CardHeader>
                            <CardTitle className="line-clamp-2">
                                {product.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <p className="mt-4 text-lg font-semibold">
                                ${product.price.toFixed(2)}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link
                                to={`/products/${product.id}`}
                                className="w-full text-center text-primary hover:underline"
                            >
                                View Details
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
