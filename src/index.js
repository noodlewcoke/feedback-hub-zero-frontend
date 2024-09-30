import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketStatus from "./ticketStatus";
import SearchTicket from "./searchTicket";
import { TicketController } from "./contextProviders";
import DeveloperPage from "./developerPage";
import ProcessTicket from "./processTicket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TicketController>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/status" element={<TicketStatus />} />
          <Route path="/search" element={<SearchTicket />} />
          <Route path="/developer" element={<DeveloperPage />} />
          <Route path="/process-ticket" element={<ProcessTicket />} />
        </Routes>
      </TicketController>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
