import { useState } from "react";

export default function Itemform() {
  const [pname, setpname] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuant] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://invoice-backend-production-bcd0.up.railway.app/api/add/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: pname,
            price: price,
            quantity: quantity,
          }),
        }
      );
      if (!res.ok) throw new Error("Data is invalid");
      const data = await res.json();
      console.log("Item added:", data.message);
      setOpen(false); // close modal after successful submit
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        className="rounded-md bg-slate-800 py-2 px-4 text-sm text-white ml-2"
        type="button"
        onClick={() => setOpen(true)}
      >
        Add Items
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="m-2.5 flex justify-center items-center text-white h-24 rounded-md bg-slate-800">
              <h3 className="text-2xl">Add Items</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Product"
                  value={pname}
                  onChange={(e) => setpname(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Unit price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuant(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
