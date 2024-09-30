import { useState, useEffect, useContext } from "react";
import { SplitScreenBackgroundVertical } from "./components/Background";
import { useNavigate } from "react-router-dom";
import { TextLargeInput, FileInput } from "./components/Input-Components";
import { TicketContext } from "./contextProviders";
import { categories, servers, developers, statusVariables } from "./entries";
import NavBar from "./NavBar";

const SOCKET_ID = process.env.REACT_APP_API_URL;

function ProcessTicket() {
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
    developer,
    setDeveloper,
    developerNote,
    setDeveloperNote,
  } = useContext(TicketContext);

  const [newDeveloper, setNewDeveloper] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [newNote, setNewNote] = useState("");

  const [isValid, setIsValid] = useState(false);

  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("ticket_id", ticketNumber);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("category", category);
    formData.append("server", server);
    formData.append("characterName", characterName);
    formData.append("subject", subject);
    formData.append("description", description);
    if (newDeveloper !== null && newDeveloper !== developer) {
      formData.append("developer", newDeveloper);
    }
    if (newStatus !== null && newStatus !== ticketStatus) {
      formData.append("status", newStatus);
    }
    else {
      formData.append("status", ticketStatus);
    }
    if (newNote !== "") {
        formData.append("developerNote", newNote);
    }

    try {
      const response = await fetch(SOCKET_ID + "/update-feedback", {
        method: "POST",
        body: formData,
        mode: "cors",
      });
      const result = await response.json();
      console.log(result);
      let updatedTicket = result.ticket;
      setDeveloper(updatedTicket.developer);
      setTicketStatus(updatedTicket.status);
      setDeveloperNote(updatedTicket.developerNote);
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      <SplitScreenBackgroundVertical />
      <main className="absolute flex flex-col w-full mx-auto my-auto top-0 bottom-0 left-0 right-0 max-w-[1200px] p-5 gap-4">
        <h1 className="text-white font-semibold px-7">
          Ticket - {ticketNumber}
        </h1>
        <div className="flex flex-col w-full bg-white p-5 rounded-xl shadow-2xl gap-4">
          <div className="flex flex-col w-full bg-white p-3 rounded-xl shadow-2xl gap-3 py-5">
            <h6 className="font-semibold">{name}</h6>

            <div className="flex flex-col">
              <h7>Category : {categories[category - 1]}</h7>
              <h7>Character Name : {characterName}</h7>
              <h7>Server : {servers[server - 1]}</h7>
            </div>

            <h7>
              Status : <h7 className="font-semibold">{ticketStatus}</h7>
            </h7>
            <h7>
              Active Developer : <h7 className="font-semibold">{developer}</h7>
            </h7>

            <div className="divider before:h-[1px] after:h-[1px]"></div>

            <div className="w-full h-20 overflow-auto">
              <h7>{description}</h7>
            </div>

            {developerNote !== "" && (
              <>
                <h1 className="font-semibold">Developer Note</h1>
                <div className="w-full h-20 overflow-auto">
                  <h7>{developerNote}</h7>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col w-full bg-white p-3 rounded-xl shadow-2xl gap-3 py-5">
            <div className="flex flex-col gap-3 w-full">
              <h1>Assign Developer</h1>
              <select
                className="select select-bordered select-md max-w-lg"
                onChange={(e) => {
                  setNewDeveloper(e.target.value);
                }}
              >
                <option disabled selected>
                  Select developer
                </option>
                {developers.map((option, index) => (
                  <option key={option + "132"} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h1>Change Status</h1>
              <select
                className="select select-bordered select-md max-w-lg"
                onChange={(e) => {
                  setNewStatus(e.target.value);
                }}
              >
                <option disabled selected>
                  Select status
                </option>
                {statusVariables.map((option, index) => (
                  <option key={option + "132"} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <TextLargeInput
              labelName={"Developer Note"}
              placeHolder={""}
              inputSetVariable={setNewNote}
            />

            <div className="flex justify-center w-full">
              <button
                disabled={
                  !(
                    (newDeveloper !== null && newDeveloper !== developer) ||
                    (newStatus !== null && newStatus !== ticketStatus) ||
                    newNote !== ""
                  )
                }
                className="btn bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                className="btn bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={(e) => {
                  navigator("/developer");
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProcessTicket;
