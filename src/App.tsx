import { useState } from "react";
import AddItem from "./components/AddItem";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Stat from "./components/Stat";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [pid, setPid] = useState<number | null>(null);

  const isFormOpen = showForm || pid !== null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar setShowForm={() => setShowForm(true)} />
      {!isFormOpen && <Stat />}
      <div className="p-6">
        {isFormOpen ? (
          <AddItem setShowForm={setShowForm} pid={pid} setPid={setPid} />
        ) : (
          <Products setPid={setPid} />
        )}
      </div>
    </div>
  );
}

export default App;
