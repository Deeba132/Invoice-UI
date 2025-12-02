import { Button, Typography } from "@material-tailwind/react";
import Fieldd from "../ui/Fieldd";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Fieldd name={`Login`} />
      </div>
      <Typography variant="small">
        New User? Then Register{" "}
        <Button
          size="sm"
          className="bg-green-500"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Typography>
    </>
  );
}
