import { NavLink, Route, Routes } from "react-router-dom";
import Tickets from "./pages/Tickets.jsx";
import TicketDetail from "./pages/TicketDetail.jsx";
import Customers from "./pages/Customers.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="shell">
      <header className="top">
        <span className="brand">Helpdesk</span>
        <nav>
          <NavLink to="/" end>Tickets</NavLink>
          <NavLink to="/customers">Customers</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Tickets />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
