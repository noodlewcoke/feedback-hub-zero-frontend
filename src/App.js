import logo from "./images/Mobile2Logo.svg";
import "./App.css";
import {
  CustomFileInput,
  FileInput,
  TextInput,
  TextLargeInput,
} from "./components/Input-Components";
import { SplitScreenBackground } from "./components/Background";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import io from "socket.io-client";
import { TicketConfirmation } from "./components/SubmitMessages";

const SOCKET_ID = "https://feedback-hub-zero-backend.onrender.com";

function App() {
  const [name, setName] = useState("isouzd");
  const [email, setEmail] = useState("isouzd@gmail.com");
  const [category, setCategory] = useState("cat");
  const [server, setServer] = useState("ser");
  const [characterName, setCharacterName] = useState("char");
  const [subject, setSubject] = useState("sub");
  const [description, setDescription] = useState("desc");
  const [files, setFiles] = useState([]);

  const [ticketId, setTicketId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    console.log("New status", statusMessage)
  }, [statusMessage])

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io(SOCKET_ID);

    // Listen for the 'ticket_created' event from the backend
    socket.on("ticket_created", (data) => {
      setTicketId(data.ticket_id);
      setStatusMessage(data.message);
      console.log("Ticket id:", data.ticket_id)
      console.log("Message:", data.message)
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData for the feedback submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('category', category);
    formData.append('server', server);
    formData.append('characterName', characterName);
    formData.append('subject', subject);
    formData.append('description', description);
    
    
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await fetch(SOCKET_ID + '/submit-feedback', {
            method: 'POST',
            body: formData,
            mode: 'cors'
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
};

  return (
    <>
      <SplitScreenBackground />
      <div className="flex flex-col items-center py-2  gap-5 pb-10">
        {/* <div className="absolute bg-original w-1/2 left-1/2"></div> */}
        <NavBar />
        <TicketConfirmation ticketId={ticketId} message={statusMessage}/>
        <main className="flex flex-wrap items-center w-full mx-auto max-w-[1200px] bg-white rounded-xl shadow-sm p-5 gap-4">
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

            <TextInput
              labelName={"Category"}
              placeHolder={"Category"}
              inputSetVariable={setCategory}
            />
            <TextInput
              labelName={"Server"}
              placeHolder={"Server"}
              inputSetVariable={setServer}
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
            // type="submit"
            disabled={ticketId!== null}
              className="btn bg-primary hover:bg-primary/90 text-white font-semibold"
              onClick={(e) => {
                // navigator("/status");
                handleSubmit(e)
              }}
            >
              Create Ticket
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
