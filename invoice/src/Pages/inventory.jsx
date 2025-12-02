import { Card, Typography } from "@material-tailwind/react";
import Itemform from "../ui/Itemform";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Name", "Price", "Quantity", "Actions"];

export default function DefaultTable() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  // Fetch items
  const fetchItems = async () => {
    try {
      const res = await fetch(
        "https://invoice-backend-production-bcd0.up.railway.app/api/add/items/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("No data available");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Delete item
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://invoice-backend-production-bcd0.up.railway.app/api/add/items/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete");
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValues({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
  };

  // Save edit
  const handleSave = async (id) => {
    try {
      const res = await fetch(
        `https://invoice-backend-production-bcd0.up.railway.app/api/add/items/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editValues),
        }
      );
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setData(data.map((item) => (item.id === id ? updated : item)));
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={item.id}>
                <td className={classes}>
                  {editingId === item.id ? (
                    <input
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues({ ...editValues, name: e.target.value })
                      }
                    />
                  ) : (
                    <Typography variant="small">{item.name}</Typography>
                  )}
                </td>
                <td className={classes}>
                  {editingId === item.id ? (
                    <input
                      value={editValues.price}
                      onChange={(e) =>
                        setEditValues({ ...editValues, price: e.target.value })
                      }
                    />
                  ) : (
                    <Typography variant="small">{item.price}</Typography>
                  )}
                </td>
                <td className={classes}>
                  {editingId === item.id ? (
                    <input
                      value={editValues.quantity}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          quantity: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography variant="small">{item.quantity}</Typography>
                  )}
                </td>
                <td className={classes}>
                  {editingId === item.id ? (
                    <>
                      <button
                        className="text-green-600 font-bold mr-2"
                        onClick={() => handleSave(item.id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-gray-600 font-bold"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-blue-600 font-bold mr-2"
                        onClick={() => startEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 font-bold"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add new items form */}
      <Itemform />
    </Card>
  );
}
