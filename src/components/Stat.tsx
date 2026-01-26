export default function Stat() {
  const stored = localStorage.getItem("product");
  const products = stored ? JSON.parse(stored) : [];

  const totalProducts = products.length;
  const lowStocks = products.filter(
    (p) => p.quantity > 0 && p.quantity < 5,
  ).length;
  const outOfStock = products.filter((p) => p.quantity === 0).length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="mt-20 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className=" text-3xl font-semibold text-gray-800 mt-1">
            {totalProducts}
          </p>
        </div>
        <div className="bg-orange-50 rounded-xl shadow p-5 text-center">
          <p className="text-sm text-orange-600">Low Stock</p>
          <p className=" text-3xl font-semibold text-orange-800 mt-1">
            {lowStocks}
          </p>
        </div>
        <div className="bg-red-50 rounded-xl shadow p-5 text-center">
          <p className="text-sm text-red-500">Out of Stock</p>
          <p className=" text-3xl font-semibold text-red-800 mt-1">
            {outOfStock}
          </p>
        </div>
            <div className="bg-green-50 rounded-xl shadow p-5 text-center">
          <p className="text-sm text-green-600">Inventory Value</p>
          <p className=" text-3xl font-semibold text-green-800 mt-1">
            ₹ {totalValue}
          </p>
        </div>
      </div>
    </div>
  );
}
