import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App.jsx";
import { reset } from "../src/data/api.js";

beforeEach(() => reset());
afterEach(() => cleanup());

const at = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe("app", () => {
  it("shows the tickets on the home page", async () => {
    at("/");
    expect(await screen.findByText("Invoice shows the wrong currency")).toBeTruthy();
  });

  it("opens one ticket", async () => {
    at("/tickets/t4");
    expect(await screen.findByText("Password reset email never arrives")).toBeTruthy();
    expect(await screen.findByText("It was in spam. Fixed the sender record.")).toBeTruthy();
  });

  it("lists customers", async () => {
    at("/customers");
    expect(await screen.findByText("chen@meridian.test")).toBeTruthy();
  });

  it("says when a page does not exist", () => {
    at("/nowhere");
    expect(screen.getByText("Page not found")).toBeTruthy();
  });
});
