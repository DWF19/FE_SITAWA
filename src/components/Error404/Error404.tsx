import { useNavigate } from "react-router-dom";
const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
      {/*
      This example requires updating your template:

      ```
      <html class="h-full">
      <body class="h-full">
      ```
    */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-[#06D001]">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 ">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={
                sessionStorage.getItem("role") === "kecamatan"
                  ? () => navigate("/beranda")
                  : sessionStorage.getItem("role") === "admin"
                  ? () => navigate("/dashboard")
                  : () => navigate("/")
              }
              className="rounded-md bg-custom-gradient px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error404;
