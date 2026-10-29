import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { STATUSES, listCustomers, listTickets } from "../data/api.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Tickets() {
  const [status, setStatus] = useState("");
  const [tickets, setTickets] = useState(null);
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    listTickets({ status: status || undefined }).then(setTickets);
  }, [status]);

  useEffect(() => {
    listCustomers().then((rows) => setCustomers(Object.fromEntries(rows.map((c) => [c.id, c]))));
  }, []);

  return (
    <section>
      <div className="row">
        <h1>Tickets</h1>
        <label>
          Status{" "}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      {tickets === null ? (
        <p className="muted">Loading…</p>
      ) : tickets.length === 0 ? (
        <p className="muted">No tickets.</p>
      ) : (
        <ul className="list">
          {tickets.map((t) => (
            <li key={t.id}>
              <Link to={`/tickets/${t.id}`}>{t.subject}</Link>
              <span className="muted">{customers[t.customerId]?.name ?? ""}</span>
              <StatusBadge status={t.status} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
