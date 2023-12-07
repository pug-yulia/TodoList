import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";
import TabApp from "./TabApp";

test("renders TabApp component with Welcome message", () => {
  render(<TabApp />);

  // By default, the "Welcome" message should be displayed
  const welcomeMessage = screen.getByText(/Welcome/i);
  expect(welcomeMessage).toBeInTheDocument();

  // Check that the "Home" tab is selected
  const homeTab = screen.getByText(/Home/i);
  expect(homeTab).toHaveAttribute("aria-selected", "true");

  // FireEvent to change the tab
  fireEvent.click(screen.getByText(/TODOS/i));

  // "Welcome" message is not present
  expect(welcomeMessage).not.toBeInTheDocument();

  // "TODOS" tab is selected
  const todosTab = screen.getByText(/TODOS/i);
  expect(todosTab).toHaveAttribute("aria-selected", "true");
});

test("add todo and clear todos", () => {
  render(<App />);

  // Simulate user input
  fireEvent.change(screen.getByLabelText("Description"), {
    target: { value: "Test Todo" },
  });
  fireEvent.change(screen.getByLabelText("Priority"), {
    target: { value: "Low" },
  });
  fireEvent.click(screen.getByText("Add"));

  // Assert that the todo is added
  const addedTodoDescription = screen.getByText("Test Todo");
  expect(addedTodoDescription).toBeInTheDocument();

  // Click the Clear button
  fireEvent.click(screen.getByText("Clear"));

  // Assert that there are no todos left
  const noTodosText = screen.queryByText("Test Todo");
  expect(noTodosText).toBeNull();
});
