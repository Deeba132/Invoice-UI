import { Button } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
export default function Buttoned({ smalld, onClick }) {
  if (!smalld)
    return (
      <div className="flex w-full flex-col gap-4 bg-red-900">
        <Button isFullWidth variant="ghost" onClick={onClick}>
          Ghost Block Level Button
        </Button>
      </div>
    );
  else
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <Button color="warning">Warning</Button>
      </div>
    );
}
