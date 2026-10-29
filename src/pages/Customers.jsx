import { useEffect, useState } from "react";
import { listCustomers } from "../data/api.js";

export default function Customers() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    listCustomers().then(setCustomers);
  }, []);

  return (
    <section>
      <h1>Customers</h1>
      {customers === null ? (
        <p className="muted">Loading…</p>
      ) : (
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Plan</th></tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}><td>{c.name}</td><td>{c.email}</td><td>{c.plan}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
