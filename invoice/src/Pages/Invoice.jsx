/* eslint-disable react/prop-types */
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Invoice({ customerId }) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch(
      `https://invoice-backend-production-bcd0.up.railway.app/api/add/items/all`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, [customerId]);

  const Printref = React.useRef(null);

  const handleSubmit = async () => {
    const element = Printref.current;
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const ImageProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (ImageProperties.height * pdfWidth) / ImageProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4" ref={Printref}>
        <div className="min-h-screen bg-slate-400">
          <Typography as="div" type="h3">
            {`${localStorage.getItem("name")}`}
          </Typography>
          <Typography as="div" type="h6">
            {`${localStorage.getItem("phone")}`}
          </Typography>
          <Typography as="div">{`${localStorage.getItem(
            "address"
          )}`}</Typography>
        </div>
        <div>
          <h2>Invoice</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Button size="sm" color="red" onClick={handleSubmit}>
        Download Pdf
      </Button>
    </>
  );
}
