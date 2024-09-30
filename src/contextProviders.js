import { createContext, useState, useEffect, useContext } from "react";

const TicketContext = createContext();

function TicketController(props) {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(null);
  const [developer, setDeveloper] = useState(null);
  const [server, setServer] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [ticketStatus, setTicketStatus] = useState("");
  const [developerNote, setDeveloperNote] = useState("");

  return (
    <TicketContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
}

export { TicketContext, TicketController };
