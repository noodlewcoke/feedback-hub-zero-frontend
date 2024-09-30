import { useState, useEffect, useContext } from "react";
import { SplitScreenBackground } from "./components/Background";
import NavBar from "./NavBar";
import { TextInput, TextInputSearch } from "./components/Input-Components";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "./contextProviders";

const SOCKET_ID = process.env.REACT_APP_API_URL;

function SearchTicket() {
  const [ticketNumberQuery, setTicketNumberQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const {
    ticketNumber,
    setTicketNumber,
    name,
    setName,
    email,
    setEmail,
    category,
    setCategory,
    server,
    setServer,
    characterName,
    setCharacterName,
    subject,
    setSubject,
    description,
    setDescription,
    newDescription,
    setNewDescription,
    files,
    setFiles,
    ticketStatus,
    setTicketStatus,
  } = useContext(TicketContext);

  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // navigator("/status");

    const formData = new FormData();
    formData.append("ticketId", ticketNumberQuery);
    formData.append("email", emailQuery);

    // let formData = {
    //     ticketId: ticketNumber,
    //     email: email
    // }
    console.log(formData);
    try {
      const response = await fetch(SOCKET_ID + "/search-ticket", {
        method: "POST",
        body: formData,
        mode: "cors",
      });
      const result = await response.json();
      console.log(result);
      let ticketData = result.ticket_data;
      setTicketNumber(ticketData.ticket_id);
      setName(ticketData.name);
      setEmail(ticketData.email);
      setCategory(ticketData.category);
      setServer(ticketData.server);
      setCharacterName(ticketData.characterName);
      setSubject(ticketData.subject);
      setDescription(ticketData.description);
      setTicketStatus(ticketData.status);
      console.log("success")
      navigator("/status")
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      <SplitScreenBackground />
      <div className="flex flex-col items-center py-2  gap-5 pb-10">
        {/* <div className="absolute bg-original w-1/2 left-1/2"></div> */}
        <NavBar />
        <main className="absolute top-0 bottom-0 flex flex-wrap justify-center items-center w-full mx-auto max-w-[1200px] z-0 p-5 gap-4">
          <form
            className="flex flex-col min-w-64 w-96 bg-white shadow-sm rounded-xl py-5 px-3 gap-1"
            onSubmit={handleSubmit}
          >
            <h1 className="font-semibold text-2xl px-2">Search Your Ticket</h1>

            <TextInputSearch
              labelName={"Ticket Number"}
              placeHolder={"Enter Ticket Number"}
              inputSetVariable={setTicketNumberQuery}
            />

            <TextInputSearch
              labelName={"Email"}
              placeHolder={"Email address"}
              inputSetVariable={setEmailQuery}
            />

            <button
              type="submit"
              className="btn bg-primary hover:bg-primary/90 text-white font-semibold mx-[6px] mt-4"
            >
              Search
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default SearchTicket;
