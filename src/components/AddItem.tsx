import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

type Inputs = {
  name: string;
  category: string;
  quantity: number;
  price: number;
};
export default function AddItem({ setShowForm, pid, setPid }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      category: "",
      quantity: 0,
      price: 0,
    },
    mode: "onBlur",
  });
  useEffect(() => {
    if (pid !== null) {
      const products = JSON.parse(localStorage.getItem("product") || "[]");
      const product = products.find((p) => p.id === pid);

      if (product) {
        reset({
          name: product.name,
          category: product.category,
          quantity: product.quantity,
          price: product.price,
        });
      }
    }
  }, [pid, reset]);
  const onSubmit = (data: Inputs) => {
    const products = JSON.parse(localStorage.getItem("product") || "[]");

    if (pid !== null) {
      const updated = products.map((p) =>
        p.id === pid ? { ...data, id: pid } : p,
      );
      localStorage.setItem("product", JSON.stringify(updated));
    } else {
      localStorage.setItem(
        "product",
        JSON.stringify([...products, { ...data, id: Date.now() }]),
      );
    }
    setShowForm(0);
    setPid(null);
  };

  return (
    <div className=" fixed left-0 top-0 w-screen h-screen bg-black/35 flex items-center justify-center z-50">
      <div className="bg-white p-10 relative">
        <p
          onClick={() => {
            setShowForm(0);
            setPid(null);
          }}
          className=" absolute top-2 right-5 text-3xl cursor-pointer"
        >
          <RxCross2 />
        </p>
        <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Product Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Chips"
                {...register("name", {
                  required: "Product name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className=" text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Catergory
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Food"
                {...register("category", {
                  required: "Catergory is required",
                })}
              />
              {errors.category && (
                <p className=" text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="100"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Price must be greater than 0",
                  },
                })}
              />
              {errors.price && (
                <p className=" text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Quantity
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="200"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Quantity must be at least 1",
                  },
                })}
              />
              {errors.quantity && (
                <p className=" text-red-500 text-xs mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className=" bg-black text-white px-6 py-2 rounded"
          >
            {pid !== null ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
