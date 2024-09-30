import { useState, useEffect } from "react";
import { SplitScreenBackground } from "./components/Background";
import { FeedbackItem } from "./components/DeveloperComponents";
import NavBar from "./NavBar";
import { MdKeyboardArrowDown } from "react-icons/md";
import { devPageIndices } from "./entries";

const SOCKET_ID = process.env.REACT_APP_API_URL;

function DeveloperPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [selectedOption, setSelectedOption] = useState("name");

  useEffect(() => {
    fetch(SOCKET_ID + "/fetch-tickets", {
      method: "POST",
      body: {},
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        const result = data;
        console.log(result);
        setTickets(data.tickets);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SplitScreenBackground />
      <div className="flex flex-col items-center py-2  gap-5 pb-10">
        <NavBar />
        <main className="flex flex-wrap items-center w-full mx-auto max-w-[1200px] bg-white rounded-xl shadow-sm p-5 gap-4">
          <div className="grid grid-cols-8 overflow-auto w-full rounded-lg bg-white shadow-lg gap-3 px-2">
            <TableColumn
              name={"STATUS"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
            <TableColumn
              name={"DEVELOPER"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
            <TableColumn
              name={"CATEGORY"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
            <TableColumn
              name={"SUBJECT"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
            <TableColumn
              name={"SERVER"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
            <TableColumn
              name={"TICKETID"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
            <TableColumn
              name={"USERNAME"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
            <TableColumn
              name={"CHARNAME"}
              selected={selectedOption}
              setSelect={setSelectedOption}
            />
          </div>
          {tickets
            // .sort((a, b) => a[selectedOption][0] - b[selectedOption][0])
            .map((ticket, index) => (
              <FeedbackItem key={ticket.ticket_id} ticketItems={ticket} />
            ))}
        </main>
      </div>
    </>
  );
}

function TableColumn({ name, selected, setSelect }) {
  const handleClick = (event) => {
    event.preventDefault();

    // setSelect(devPageIndices[name]);
  };

  return (
    <h1 className="flex items-center gap-1 font-semibold" onClick={handleClick}>
      {name}

      {/* <a className={`${selected !== devPageIndices[name] && "hidden"}`}> */}
      <a className={`hidden`}>
        <MdKeyboardArrowDown />
      </a>
    </h1>
  );
}

export default DeveloperPage;
