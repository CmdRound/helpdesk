import { beforeEach, describe, expect, it } from "vitest";
import { addComment, getTicket, listTickets, reset, setStatus } from "../src/data/api.js";

beforeEach(() => reset());

describe("tickets api", () => {
  it("lists newest first", async () => {
    const ids = (await listTickets()).map((t) => t.id);
    expect(ids).toEqual(["t3", "t2", "t1", "t4"]);
  });

  it("filters by status", async () => {
    const open = await listTickets({ status: "open" });
    expect(open.every((t) => t.status === "open")).toBe(true);
    expect(open).toHaveLength(2);
  });

  it("changes a status", async () => {
    await setStatus("t1", "closed");
    expect((await getTicket("t1")).status).toBe("closed");
  });

  it("refuses an unknown status", async () => {
    await expect(setStatus("t1", "lost")).rejects.toThrow("Unknown status");
  });

  it("adds a comment and refuses an empty one", async () => {
    await addComment("t3", { by: "Support", body: "  Looking into it.  " });
    expect((await getTicket("t3")).comments.at(-1).body).toBe("Looking into it.");
    await expect(addComment("t3", { by: "Support", body: "   " })).rejects.toThrow();
  });

  it("hands out copies, not the store", async () => {
    const t = await getTicket("t1");
    t.subject = "changed";
    expect((await getTicket("t1")).subject).not.toBe("changed");
  });
});
