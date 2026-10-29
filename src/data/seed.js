// Starting data. The app keeps a copy in memory and changes that copy,
// so a page reload brings this back.

export const customers = [
  { id: "c1", name: "Ada Obi", email: "ada@northwind.test", plan: "team" },
  { id: "c2", name: "Bayo Lawal", email: "bayo@harbor.test", plan: "starter" },
  { id: "c3", name: "Chen Wu", email: "chen@meridian.test", plan: "scale" },
  { id: "c4", name: "Dana Reyes", email: "dana@foxglove.test", plan: "team" },
];

export const tickets = [
  {
    id: "t1",
    subject: "Invoice shows the wrong currency",
    customerId: "c1",
    status: "open",
    priority: "high",
    createdAt: "2026-10-20T09:12:00Z",
    comments: [{ by: "Ada Obi", body: "October's invoice is in USD. We pay in EUR.", at: "2026-10-20T09:12:00Z" }],
  },
  {
    id: "t2",
    subject: "Can't add a second admin",
    customerId: "c2",
    status: "pending",
    priority: "normal",
    createdAt: "2026-10-21T14:40:00Z",
    comments: [{ by: "Bayo Lawal", body: "The invite button is greyed out.", at: "2026-10-21T14:40:00Z" }],
  },
  {
    id: "t3",
    subject: "Export to CSV cuts off at 1,000 rows",
    customerId: "c3",
    status: "open",
    priority: "normal",
    createdAt: "2026-10-22T08:05:00Z",
    comments: [],
  },
  {
    id: "t4",
    subject: "Password reset email never arrives",
    customerId: "c4",
    status: "closed",
    priority: "high",
    createdAt: "2026-10-18T17:30:00Z",
    comments: [
      { by: "Dana Reyes", body: "Tried three times.", at: "2026-10-18T17:30:00Z" },
      { by: "Support", body: "It was in spam. Fixed the sender record.", at: "2026-10-19T10:02:00Z" },
    ],
  },
];
