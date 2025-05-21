
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-purple-500 to-purple-700 text-black px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Error Heading */}
        <h1 className="text-4xl font-bold">Oops!! 404 - Page Not Found</h1>

        {/* Error Description */}
        <p className="text-lg max-w-[600px] text-center">
          Sorry, we couldn't find what you're looking for. Please check the URL
          or head back home!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
