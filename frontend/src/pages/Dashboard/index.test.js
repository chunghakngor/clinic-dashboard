import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent, fireEvent } from "@testing-library/user-event";
import Component from "./index";

test("Dashboard Test", () => {
  render(<Component />);
  screen.getByText("Dashboard");
});
