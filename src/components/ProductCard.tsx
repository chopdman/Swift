import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function ProductCard({ data, setProducts, setPid }) {
  const handleEdit = () => {
    setPid(data.id);
  };
  const handleDelete = () => {
    const stored = localStorage.getItem("product");
    const products = stored ? JSON.parse(stored) : [];
    // console.log(tempData);
    const updated = products.filter((obj) => obj.id !== data.id);
    localStorage.setItem("product", JSON.stringify(updated));
    setProducts(updated);
  };
  return (
    <div className="rounded shadow-lg bg-blue-500 w-64">
      <div className="px-4 py-2 flex items-center justify-between">
        <h2 className="font-bold text-lg  text-white truncate">{data.name}</h2>
        <div className="flex gap-2">
          <MdModeEdit
            onClick={handleEdit}
            size={16}
            className="cursor-pointer text-black"
          />
          <FaTrash
            onClick={handleDelete}
            size={16}
            className="cursor-pointer text-red-600"
          />
        </div>
      </div>
      <div className="px-4 pb-4  flex flex-col gap-2">
        <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm ">
          Price: ₹{data.price}
        </span>
        <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm ">
          Category: {data.category}
        </span>
        <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm ">
          Quantity: {data.quantity}
        </span>
        <div className="flex flex-wrap justify-center gap-w mt-2">
          {parseInt(data.quantity) === 0 && (
            <span className="  bg-red-500 rounded-full px-3 py-1 text-xs text-white ">
              Out Of stocks
            </span>
          )}
          {parseInt(data.quantity) < 5 && parseInt(data.quantity) > 0 && (
            <span className="  bg-orange-400 rounded-full px-3 py-1 text-xs text-white">
              Limited Stocks
            </span>
          )}
          {parseInt(data.price) > 500 && (
            <span className="  bg-green-400  rounded-full px-3 py-1 text-xs text-white">
              Premium
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
