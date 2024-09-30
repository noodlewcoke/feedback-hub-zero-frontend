import { categories, servers } from "../entries";
import { useContext } from "react";
import { TicketContext } from "../contextProviders";
import { useNavigate } from "react-router-dom";

export function FeedbackItem({ ticketItems }) {
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
  } = useContext(TicketContext);

  const navigator = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    setTicketNumber(ticketItems.ticket_id);
    setName(ticketItems.name);
    setEmail(ticketItems.email);
    setCategory(ticketItems.category);
    setServer(ticketItems.server);
    setCharacterName(ticketItems.characterName);
    setSubject(ticketItems.subject);
    setDescription(ticketItems.description);
    setTicketStatus(ticketItems.status);
    setDeveloper(ticketItems.developer ? ticketItems.developer : "-")
    navigator("/process-ticket");
  };

  return (
    <div
      className="grid grid-cols-8 overflow-auto w-full rounded-lg bg-white shadow-lg gap-3 px-2 h-12 cursor-pointer border-2 hover:border-blue-800"
      onClick={handleClick}
    >
      <h1 className="overflow-auto">{ticketItems.status}</h1>
      <h1 className="overflow-auto">
        {ticketItems.developer ? ticketItems.developer : "-"}
      </h1>
      <h1 className="overflow-auto">{categories[ticketItems.category - 1]}</h1>
      <h1 className="overflow-auto">{ticketItems.subject}</h1>
      <h1 className="overflow-auto">{servers[ticketItems.server - 1]}</h1>
      <h1 className="overflow-auto">{ticketItems.ticket_id}</h1>
      <h1 className="overflow-auto">{ticketItems.name}</h1>
      <h1 className="overflow-auto">{ticketItems.characterName}</h1>
    </div>
  );
}
