import { useState, useEffect, useContext } from "react";
import {
  SplitScreenBackground,
  SplitScreenBackgroundVertical,
} from "./components/Background";
import { useNavigate } from "react-router-dom";
import { TextLargeInput, FileInput } from "./components/Input-Components";
import { TicketContext } from "./contextProviders";
import { categories, servers } from "./entries";
import NavBar from "./NavBar";

const SOCKET_ID = process.env.REACT_APP_API_URL;

function TicketStatus() {
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

  const [showInvalid, setShowInvalid] = useState(false);

  const navigator = useNavigate();

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
            <TextLargeInput
              labelName={"Description"}
              placeHolder={""}
              inputSetVariable={setNewDescription}
            />
            <div className="w-full">
              <div className="flex md:flex-auto md:flex-grow-0 md:flex-shrink-0 md:w-1/2 w-full px-2">
                <p className="font-semibold px-2">
                  Attachments <small>(You can select multiple files)</small>
                </p>
              </div>
              <FileInput inputSetVariable={setFiles} />
            </div>
            <div className="flex justify-center w-full">
              <button
                className="btn bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={() => {
                  setShowInvalid(true);
                }}
              >
                Submit
              </button>
            </div>
            {showInvalid && (
              <div className="flex justify-center w-full">
                <h1 className="text-red-600">Not Implemented</h1>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default TicketStatus;
