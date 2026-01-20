import { useState } from "react";
import AddItem from "./components/AddItem";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Products from "./components/Products";
import Stat from "./components/Stat";

function App() {
  const [showForm, setShowForm] = useState<number>(0);
  const [pid,setPid] =useState(null);

  return (
    <div className="bg-blue-100">
     <Navbar setShowForm={setShowForm}  />
     {showForm || pid === null &&  <Stat/> }
      <div className="w-screen h-screen flex justify-center items-center">
        {showForm || pid !== null  ? <AddItem setShowForm={setShowForm} pid={pid} setPid={setPid}  /> : <Products setPid={setPid} />}
      </div>
    </div>
  );
}

export default App;
