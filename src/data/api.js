// A pretend backend. Every call is async, like a real fetch, and returns
// copies so a page can't change the store by accident.
import * as seed from "./seed.js";

export const STATUSES = ["open", "pending", "closed"];

let db = fresh();

function fresh() {
  return structuredClone({ customers: seed.customers, tickets: seed.tickets });
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
const copy = (value) => structuredClone(value);

/** Puts the store back to the seed data. Tests call this. */
export function reset() {
  db = fresh();
}

export async function listTickets({ status } = {}) {
  await wait();
  const rows = status ? db.tickets.filter((t) => t.status === status) : db.tickets;
  return copy(rows).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getTicket(id) {
  await wait();
  const ticket = db.tickets.find((t) => t.id === id);
  return ticket ? copy(ticket) : null;
}

export async function setStatus(id, status) {
  await wait();
  if (!STATUSES.includes(status)) throw new Error(`Unknown status: ${status}`);
  const ticket = db.tickets.find((t) => t.id === id);
  if (!ticket) throw new Error(`No ticket ${id}`);
  ticket.status = status;
  return copy(ticket);
}

export async function addComment(id, { by, body }) {
  await wait();
  const ticket = db.tickets.find((t) => t.id === id);
  if (!ticket) throw new Error(`No ticket ${id}`);
  if (!body || !body.trim()) throw new Error("A comment needs some text.");
  ticket.comments.push({ by, body: body.trim(), at: new Date().toISOString() });
  return copy(ticket);
}

export async function listCustomers() {
  await wait();
  return copy(db.customers);
}

export async function getCustomer(id) {
  await wait();
  const customer = db.customers.find((c) => c.id === id);
  return customer ? copy(customer) : null;
}
