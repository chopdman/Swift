import { useEffect, useState } from "react";

export default function Stat() {
  const data = localStorage.getItem("product");

  const [totalData, setTotalData] = useState(() => {
    return data ? JSON.parse(data).length : 0;
  });
  const [lowStocks, setLowStocks] = useState(() => {
    return data ? JSON.parse(data).filter((p) => p.quantity < 5).length : 0;
  });
  const [totalValue, setTotalValue] = useState(() => {
    return data
      ? JSON.parse(data).reduce((acc, p) => {
          console.log(acc, p.price);
          return acc + parseInt(p.price);
        }, 0)
      : 0;
  });

  return (
    <div className="mt-20 bg-white">
      <div className=" flex flex-wrap items-center justify-evenly bg-none ">
        <span  className=" text-2xl border p-4 rounded bg-yellow-200">Total Product: {totalData}</span>
        <span className=" text-2xl border p-4 rounded bg-red-200">Low Stocks: {lowStocks}</span>
        <span className=" text-2xl border p-4 rounded bg-green-300">Total Value: {totalValue}</span>
      </div>
    </div>
  );
}
