import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea,
} from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const [cusname, setcusname] = useState("");
  const [cusPhone, setcusPh] = useState(0);
  const [cusAdd, setcusAdd] = useState("");
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", cusname);
    localStorage.setItem("phone", cusPhone);
    localStorage.setItem("address", cusAdd);
    navigate("/invoice");
  };
  return (
    <div className="w-full max-w-7xl px-4">
      <Fieldset className="space-y-6 rounded-xl bg-slate-950 p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">
          Fill Customer Details
        </Legend>
        <Field>
          <Label
            htmlFor="Customername"
            className="text-sm/6 font-medium text-white"
          >
            Name
          </Label>
          <Input
            id="cusname"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            )}
            name="cusname"
            value={cusname}
            onChange={(e) => setcusname(e.target.value)}
          />
        </Field>
        <Field>
          <Label htmlFor="Phone" className="text-sm/6 font-medium text-white">
            Phone Number
          </Label>
          <Input
            id="Ph"
            type="Number"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            )}
            name="Ph"
            value={cusPhone}
            onChange={(e) => setcusPh(e.target.value)}
          />
        </Field>
        <Field>
          <Label htmlFor="Address" className="text-sm/6 font-medium text-white">
            Address
          </Label>
          <Textarea
            id="Addr"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            )}
            name="Address"
            value={cusAdd}
            onChange={(e) => setcusAdd(e.target.value)}
          />
        </Field>
      </Fieldset>
      <Button
        variant="outline"
        className="bg-green-600 text-black font-bold"
        onClick={(e) => handlesubmit(e)}
      >
        Submit
      </Button>
    </div>
  );
}
