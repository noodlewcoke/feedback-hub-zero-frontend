import { useState, useEffect } from "react";
import { SplitScreenBackground } from "./components/Background";
import NavBar from "./NavBar";
import { TextInput, TextInputSearch } from "./components/Input-Components";
import { useNavigate } from "react-router-dom";

function SearchTicket() {

    const [ticketNumber, setTicketNumber] = useState("");
    const [email, setEmail] = useState("");

    const navigator = useNavigate();

  return (
    <>
      <SplitScreenBackground />
      <div className="flex flex-col items-center py-2  gap-5 pb-10">
        {/* <div className="absolute bg-original w-1/2 left-1/2"></div> */}
        <NavBar />
        <main className="absolute top-0 bottom-0 flex flex-wrap justify-center items-center w-full mx-auto max-w-[1200px] z-0 p-5 gap-4">
            <div className="flex flex-col min-w-64 w-96 bg-white shadow-sm rounded-xl py-5 px-3 gap-1">
                <h1 className="font-semibold text-2xl px-2">Search Your Ticket</h1>

                <TextInputSearch labelName={"Ticket Number"} placeHolder={"Enter Ticket Number"} inputSetVariable={setTicketNumber} />

                <TextInputSearch labelName={"Email"} placeHolder={"Email address"} inputSetVariable={setEmail} />

                <button className="btn bg-primary hover:bg-primary/90 text-white font-semibold mx-[6px] mt-4" onClick={() => {navigator("/status")}}>Search</button>
            </div>
        </main>
      </div>
    </>
  );
}

export default SearchTicket;
