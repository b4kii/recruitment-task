import React, { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import AddressInput from "../components/AddressInput";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false)
      }, 1800)

      return () => clearTimeout(timer);
    }
  }, [error])

  return (
    <div className="bg-white w-[600px] p-10 grid gap-10">
      <AddressInput
        id="from"
        handleInputChange={setAddressFrom}
        value={addressFrom}
        placeholder="Street address postal code city country"
        error={error}
      >
        From
      </AddressInput>
      <AddressInput
        id="to"
        handleInputChange={setAddressTo}
        value={addressTo}
        placeholder="Street address postal code city country"
        error={error}
      >
        To
      </AddressInput>

      {error && <ErrorMessage error={error} message="Provide the data!" />}
      {/* <p className={`absolute top-0 left-1/2 bg-red-300 p-8 rounded-xl text-xl font-bold translate-x-[-50%] transition-all ${error ? "opacity-100 translate-y-[10rem]" : "opacity-0 translate-y-0"}`}>
          Provide the data!
        </p> */}
      <button
        className="bg-black text-white p-4 uppercase font-bold hover:bg-gray-700"
        onClick={() => {
          if (addressFrom !== "" && addressTo !== "") {
            navigate({
              pathname: "/map-result",
              search: createSearchParams({
                from: addressFrom,
                to: addressTo,
              }).toString(),
            });
            setError(null);
          } else {
            setError(true);
          }
        }}
      >
        Check route
      </button>
    </div>
  );
}
