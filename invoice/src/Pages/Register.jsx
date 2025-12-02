import { useNavigate } from "react-router-dom";
import Fieldd from "../ui/Fieldd";
import { Button, Typography } from "@material-tailwind/react";

export default function Register() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-red-500">Register</h3>
        <Fieldd name={`Register`} />
      </div>
      <Typography variant="small">
        Already Registered then LogIn{" "}
        <Button
          onClick={() => navigate("/login")}
          size="sm"
          className="bg-green-600"
        >
          LogIn
        </Button>
      </Typography>
    </>
  );
}
