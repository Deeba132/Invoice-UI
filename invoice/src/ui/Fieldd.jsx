import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Fieldd({ name }) {
  const [namsy, setName] = useState("");
  const [passy, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      name === "Login"
        ? "https://invoice-backend-production-bcd0.up.railway.app/api/auth/login"
        : "https://invoice-backend-production-bcd0.up.railway.app/api/auth/register";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: namsy,
          password: passy,
        }),
      });
      if (!res.ok) {
        throw new Error("Invalid username or password");
      }
      const data = await res.json();

      localStorage.setItem("expiry", Date.now() + 24 * 60 * 60 * 1000);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error();
    }
  };
  //use name prop if register post to the endpoint else post to another endpoint
  return (
    <div className="w-full max-w-lg px-4">
      <form onSubmit={handleSubmit}>
        <Fieldset className="space-y-6 rounded-xl bg-slate-950 p-6 sm:p-10">
          <Legend className="text-base/7 font-semibold text-white">
            {name}
          </Legend>
          <Field>
            <Label
              htmlFor="username"
              className="text-sm/6 font-medium text-white"
            >
              Username
            </Label>
            <Input
              id="username"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
              )}
              name="username"
              value={namsy}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <Label
              htmlFor="password"
              className="text-sm/6 font-medium text-white"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
              )}
              name="password"
              value={passy}
              onChange={(e) => setPass(e.target.value)}
            />
          </Field>
        </Fieldset>
        <Button
          variant="outline"
          className="bg-green-600 text-black font-bold"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
