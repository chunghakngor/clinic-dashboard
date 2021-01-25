import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent, fireEvent } from "@testing-library/user-event";
import Component from "./index";

test("Error 404", () => {
  render(<Component />);
  screen.getByText("Error 404");
  screen.getByText("Something has gone wrong!!");
});
