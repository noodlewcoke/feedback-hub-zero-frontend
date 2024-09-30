import logo from "./images/Mobile2Logo.svg";
import "./App.css";
import {
  CustomFileInput,
  FileInput,
  TextInput,
  TextLargeInput,
  SelectInput,
} from "./components/Input-Components";
import { SplitScreenBackground } from "./components/Background";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { categories, servers } from "./entries";
import { TicketConfirmation } from "./components/SubmitMessages";
import { TicketContext } from "./contextProviders";

const SOCKET_ID = process.env.REACT_APP_API_URL;

function App() {
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
    files,
    setFiles,
    setTicketStatus,
    setDeveloperNote
  } = useContext(TicketContext);

  useEffect(() => {
    setTicketNumber(null)
    setName("")
    setEmail("")
    setCategory(null)
    setServer(null)
    setCharacterName("")
    setSubject("")
    setDescription("")
    setFiles([])
    setTicketStatus("")
    setDeveloperNote("")

  }, [])

  const [statusMessage, setStatusMessage] = useState("");

  const [isValid, setIsValid] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    console.log("New status", statusMessage);
  }, [statusMessage]);

  useEffect(() => {
    console.log(category, server);
    if (category && server) {
      setIsValid(true);
    }
  }, [category, server]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("category", category);
    formData.append("server", server);
    formData.append("characterName", characterName);
    formData.append("subject", subject);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(SOCKET_ID + "/submit-feedback", {
        method: "POST",
        body: formData,
        mode: "cors",
      });
      const result = await response.json();
      console.log(result);
      setTicketNumber(result.ticket_id);
      setStatusMessage(result.message);
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
        <TicketConfirmation ticketId={ticketNumber} message={statusMessage} />
        <form
          className="flex flex-wrap items-center w-full mx-auto max-w-[1200px] bg-white rounded-xl shadow-sm p-5 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full">
            <label className="text-blue-900 font-semibold text-xl">
              Create Ticket
            </label>
          </div>
          <div className="flex flex-wrap w-full ">
            <TextInput
              labelName={"Name"}
              placeHolder={"Name"}
              inputSetVariable={setName}
            />
            <TextInput
              labelName={"Email"}
              placeHolder={"Email"}
              inputSetVariable={setEmail}
            />

            <SelectInput
              labelName={"Category"}
              placeHolder={"Category"}
              inputSetVariable={setCategory}
              options={categories}
            />

            <SelectInput
              labelName={"Server"}
              placeHolder={"Server"}
              inputSetVariable={setServer}
              options={servers}
            />

            <TextInput
              labelName={"Character Name"}
              placeHolder={"In-Game Character Name"}
              inputSetVariable={setCharacterName}
            />
          </div>
          <TextInput
            labelName={"Subject"}
            placeHolder={"Subject"}
            inputSetVariable={setSubject}
          />
          <TextLargeInput
            labelName={"Description"}
            placeHolder={"Description"}
            inputSetVariable={setDescription}
            wFull={true}
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
              type="submit"
              disabled={ticketNumber !== null || !isValid}
              className="btn bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
