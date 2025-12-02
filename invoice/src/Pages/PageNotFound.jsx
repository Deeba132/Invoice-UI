/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Buttoned from "../ui/Buttoned";

export default function PageNotFound({ setB }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="px-4 lg:py-12">
        <div className="lg:flex lg:gap-4">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-blue-600 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Page not found
            </p>
            <Buttoned smalld={setB} onClick={() => navigate("/")}>
              Home
            </Buttoned>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2016/11/22/23/13/black-dog-1851106__340.jpg"
            alt="Error Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
