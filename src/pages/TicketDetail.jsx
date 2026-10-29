import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { STATUSES, addComment, getCustomer, getTicket, setStatus } from "../data/api.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(undefined);
  const [customer, setCustomer] = useState(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getTicket(id).then((t) => {
      setTicket(t);
      if (t) getCustomer(t.customerId).then(setCustomer);
    });
  }, [id]);

  if (ticket === undefined) return <p className="muted">Loading…</p>;
  if (ticket === null) return <p>No ticket with that id. <Link to="/">Back to tickets</Link></p>;

  const changeStatus = async (status) => setTicket(await setStatus(ticket.id, status));

  const send = async (e) => {
    e.preventDefault();
    try {
      setTicket(await addComment(ticket.id, { by: "Support", body: draft }));
      setDraft("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <Link to="/" className="muted">← Tickets</Link>
      <div className="row">
        <h1>{ticket.subject}</h1>
        <StatusBadge status={ticket.status} />
      </div>
      <p className="muted">
        {customer ? `${customer.name} · ${customer.email}` : ""} · priority {ticket.priority}
      </p>

      <label>
        Status{" "}
        <select value={ticket.status} onChange={(e) => changeStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <h2>Comments</h2>
      {ticket.comments.length === 0 ? (
        <p className="muted">No comments yet.</p>
      ) : (
        <ul className="comments">
          {ticket.comments.map((c, i) => (
            <li key={i}>
              <strong>{c.by}</strong> <span className="muted">{new Date(c.at).toLocaleString()}</span>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={send} className="reply">
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a reply" rows={3} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Send reply</button>
      </form>
    </section>
  );
}
