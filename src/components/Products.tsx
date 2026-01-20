import { useState } from "react";
import ProductCard from "./ProductCard";

export default function Products({setPid}) {
const stored = localStorage.getItem("product");
  const [products, setProducts] = useState(() => {
    
    return stored ? JSON.parse(stored) : [];
  });

  const handleSearch = (e) => {
    console.log(e.target.value);
    setProducts(()=>{
        JSON.parse(stored).filter(p=> p.name.toLowerCase().includes(e.target.value)).map(p=> p);
    })
    console.log(products);
  }

  return (
    <div className="bg-white mt-10 relative w-screen">
        <input type="text" placeholder="search" className="border rounded absolute right-7 p-1" onChange={handleSearch}/>
    <div className="w-screen h-screen bg-white flex items-center justify-center gap-10 flex-wrap p-10 ">
      {products?.length > 0 ? (
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
    </div>
  );
}
