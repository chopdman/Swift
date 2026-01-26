import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Products({ setPid }) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("product");
    const parsed = stored ? JSON.parse(stored) : [];

    setAllProducts(parsed);
    setAllProducts(parsed);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = search.toLowerCase().trim();
      if (!value) {
        setProducts(allProducts);
      } else {
        const filtered = allProducts.filter((p) =>
          p.name.toLowerCase().includes(value),
        );
        setProducts(filtered);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, allProducts]);

  return (
    <div className="bg-geay-50 min-h-screen w-full px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1  className="text-2xl font-semibold text-gray-800">
          Products
        </h1>
        <input
          type="text"
          placeholder="search"
          className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((pr) => {
            return (
              <ProductCard
                data={pr}
                key={pr.id}
                setPid={setPid}
                setProducts={setAllProducts}
              />
            );
          })
        ) : (
          <p className="text-gray-400 text-lg">No products found</p>
        )}
      </div>
    </div>
  );
}
