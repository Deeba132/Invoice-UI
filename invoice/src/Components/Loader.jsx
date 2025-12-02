import { Spinner } from "@material-tailwind/react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Spinner size="xxl" />
    </div>
  );
}
