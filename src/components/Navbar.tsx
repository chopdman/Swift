export default function Navbar({ setShowForm }) {
  return (
    <div className="fixed top-0 w-screen h-15 bg-amber-50 border flex items-center justify-between px-10 ">
      <h2 className=" text-2xl">Swift Shop</h2>

      <button
        onClick={() => setShowForm(1)}
        className=" justify-end cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add +
      </button>
    </div>
  );
}
