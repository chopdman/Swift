import { useState } from "react";
import ProductCard from "./ProductCard";

export default function Products({setPid}) {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("product");
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center gap-10 flex-wrap p-10">
      {products.length > 0 ? (
        products.map((pr, idx) => {
          return (
            <div key={pr.id} >
              <ProductCard data={pr} setPid={setPid} setProducts={setProducts}/>
            </div>
          
          );
        })
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
