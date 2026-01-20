import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";

export default function ProductCard({ data, setProducts,setPid }) {
  // console.log("hi")
  const handleEdit = () => {
    console.log(data.id);
     setPid(data.id);
  }
  const handleDelete = () => {
    const stored = localStorage.getItem("product");
    const tempData = JSON.parse(stored);
    // console.log(tempData);
    // const newData = tempData.filter(product => product.name != data.name)
    const newArray = tempData.filter((obj) => obj.id !== data.id);
    localStorage.setItem("product", JSON.stringify(newArray));
    setProducts(newArray);
  };
  return (
    <div className="max-w-fit rounded overflow-hidden shadow-lg bg-blue-500   min-h-1/3">
      <div className="px-6 py-2 flex items-center justify-between gap-4">
        <div className="font-bold text-xl mb-2 text-white">{data.name}</div>
        <div className="flex gap-2">
          <MdModeEdit onClick={handleEdit} color="black" size={15} className="cursor-pointer" />
          <FaTrash
            onClick={handleDelete}
            color="red"
            size={15}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-col gap-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Price: {data.price}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Category: {data.category}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Quantity: {data.quantity}
        </span>
        <div className="flex flex-wrap justify-center items-center">

          {
              parseInt(data.quantity) === 0 && 
              <span className=" text-center bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Out Of stocks
        </span>
          }
           {
              parseInt(data.quantity) < 5 && parseInt(data.quantity) > 0 && 
              <span className=" text-center bg-orange-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Limited Stocks
        </span>
          }
           {
              parseInt(data.price) > 500 && 
              <span className=" text-center bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Premium
        </span>
          }
          </div>

      </div>
    </div>
  );
}
