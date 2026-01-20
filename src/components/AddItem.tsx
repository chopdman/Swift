import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

type Inputs = {
  name: string;
  category: string;
  quantity: number;
  price: number;
};
export default function AddItem({ setShowForm, pid,setPid }) {
    const localData = JSON.parse(localStorage.getItem("product")!);
    // if(Array.isArray(localData)){
const filtterData = localData?.filter(product => product.id ==pid);
    console.log(filtterData,pid);
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name:pid== null? "" : filtterData[0].name,
      category: pid== null ? "":filtterData[0].category,
      quantity:pid== null? 0:filtterData[0].quantity,
      price: pid== null?0:filtterData[0].price,
    },
  });
  const onSubmit = (data: Inputs) => {
    if (pid) {
        const newData = localData.filter(product => product.id !== pid);
        console.log(pid);
        newData.push({...data,id:pid});
        console.log(newData);
        localStorage.setItem("product",JSON.stringify(newData));
        setShowForm(0);
        // setPid(null);
        location.reload();
        return;
    }
    const product = localStorage.getItem("product");
    console.log(JSON.parse(product!));
    if (!product) {
      localStorage.setItem("product", JSON.stringify([{ ...data, id: 0 }]));
    } else {
      let setData = [];
      if (Array.isArray(JSON.parse(product))) {
        setData.push(...JSON.parse(product));
        setData.push({ ...data, id: JSON.parse(product).length });
      } else {
        setData = [{ ...JSON.parse(product) }, { ...data, id: 1 }];
      }
      localStorage.clear();

      localStorage.setItem("product", JSON.stringify(setData));
      console.log(setData, localStorage.getItem("product"));
    }
    setShowForm(0);
    setPid();
  };

  return (
    <div className=" fixed top-0 w-screen h-screen bg-black/35 flex items-center justify-center z-50">
      <div className="bg-white p-10 relative">
        <p
          onClick={() =>{ setShowForm(0);
            setPid();
            location.reload();
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
                {...register("name")}
              />
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
                {...register("category")}
              />
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
                {...register("price")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Quantity
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="200"
                {...register("quantity")}
              />
            </div>
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
