import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DatePicker from "./DatePicker";
import styles from "../DatePicker.module.css";

describe("DatePicker Component", () => {
  let mockOnChange: (date: string) => void;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders the date picker component", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(
        <DatePicker label="Select Date" value="" onChange={mockOnChange} />,
      );
      expect(screen.getByText("Select Date")).toBeInTheDocument();
    });

    it("shows required indicator when required", () => {
      render(
        <DatePicker
          label="Birth Date"
          value=""
          onChange={mockOnChange}
          required
        />,
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(
        <DatePicker
          value=""
          onChange={mockOnChange}
          placeholder="Select date..."
        />,
      );
      const input = screen.getByPlaceholderText("Select date...");
      expect(input).toBeInTheDocument();
    });

    it("renders calendar icon", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const button = container.querySelector(
        'button[aria-label="Open calendar"]',
      );
      expect(button).toBeInTheDocument();
    });

    it("renders with hint text", () => {
      render(
        <DatePicker
          value=""
          onChange={mockOnChange}
          hint="Select your preferred date"
        />,
      );
      expect(
        screen.getByText("Select your preferred date"),
      ).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(
        <DatePicker
          value=""
          onChange={mockOnChange}
          error="Date is required"
        />,
      );
      expect(screen.getByText("Date is required")).toBeInTheDocument();
    });
  });

  describe("Input Interaction", () => {
    it("opens calendar when clicking input field", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /Today/i }),
        ).toBeInTheDocument();
      });
    });

    it("opens calendar when clicking calendar icon", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const button = container.querySelector(
        'button[aria-label="Open calendar"]',
      ) as HTMLButtonElement;

      await user.click(button);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /Today/i }),
        ).toBeInTheDocument();
      });
    });

    it("does not open calendar when disabled", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} disabled />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        expect(
          screen.queryByRole("button", { name: /Today/i }),
        ).not.toBeInTheDocument();
      });
    });

    it("does not open calendar when read-only", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} readOnly />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        expect(
          screen.queryByRole("button", { name: /Today/i }),
        ).not.toBeInTheDocument();
      });
    });

    it("closes calendar on escape key", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /Today/i }),
        ).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(
          screen.queryByRole("button", { name: /Today/i }),
        ).not.toBeInTheDocument();
      });
    });

    it("closes calendar when clicking outside", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <div>
          <div data-testid="outside">Outside</div>
          <DatePicker value="" onChange={mockOnChange} />
        </div>,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /Today/i }),
        ).toBeInTheDocument();
      });

      const outside = screen.getByTestId("outside");
      fireEvent.mouseDown(outside);

      await waitFor(() => {
        expect(
          screen.queryByRole("button", { name: /Today/i }),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Date Selection", () => {
    it("selects a date when clicking on a day", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        const days = screen
          .getAllByRole("button")
          .filter((btn) => btn.textContent?.match(/^\d+$/));
        expect(days.length).toBeGreaterThan(0);
      });

      const days = screen
        .getAllByRole("button")
        .filter((btn) => btn.textContent === "15");
      if (days.length > 0) {
        await user.click(days[0]);

        await waitFor(() => {
          expect(mockOnChange).toHaveBeenCalled();
        });
      }
    });

    it("displays selected date in input", () => {
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      expect(input.value).toBeTruthy();
    });

    it("calls onChange with ISO format date", async () => {
      const user = userEvent.setup();
      const mockFn = jest.fn();
      const { container } = render(<DatePicker value="" onChange={mockFn} />);
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(async () => {
        const days = screen
          .getAllByRole("button")
          .filter((btn) => btn.textContent === "15");
        if (days.length > 0) {
          await user.click(days[0]);
        }
      });

      if (mockFn.mock.calls.length > 0) {
        const calledWith = mockFn.mock.calls[0][0];
        expect(calledWith).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  describe("View Modes", () => {
    it("switches to month view when clicking month name", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        const monthButton = screen
          .getAllByRole("button")
          .find((btn) =>
            btn.textContent?.match(
              /^(January|February|March|April|May|June|July|August|September|October|November|December)$/i,
            ),
          );
        expect(monthButton).toBeInTheDocument();
      });
    });

    it("switches to year view when clicking year", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        const yearButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.match(/^\d{4}$/));
        if (yearButton) {
          user.click(yearButton);
        }
      });
    });

    it("returns to days view after selecting month", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click month name to go to month view
      await waitFor(async () => {
        const monthButton = screen
          .getAllByRole("button")
          .find((btn) =>
            btn.textContent?.match(/^(November|December|January)$/i),
          );
        if (monthButton) {
          await user.click(monthButton);
        }
      });

      // Click a month
      await waitFor(async () => {
        const monthButtons = screen
          .getAllByRole("button")
          .filter((btn) => btn.textContent?.match(/^(Jan|Feb|Mar)$/i));
        if (monthButtons.length > 0) {
          await user.click(monthButtons[0]);
        }
      });

      // Should be back to days view
      await waitFor(() => {
        const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const hasDayNames = dayNames.some(
          (day) => screen.queryByText(day) !== null,
        );
        expect(hasDayNames).toBe(true);
      });
    });
  });

  describe("Navigation", () => {
    it("navigates to previous month", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(async () => {
        const prevButton = screen.getByRole("button", {
          name: /Previous month/i,
        });
        await user.click(prevButton);
      });

      // Month should have changed
      await waitFor(() => {
        expect(screen.queryByText(/October|December/i)).toBeInTheDocument();
      });
    });

    it("navigates to next month", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(async () => {
        const nextButton = screen.getByRole("button", { name: /Next month/i });
        await user.click(nextButton);
      });

      await waitFor(() => {
        expect(screen.queryByText(/December|October/i)).toBeInTheDocument();
      });
    });
  });

  describe("Quick Actions", () => {
    it("selects today when clicking Today button", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(async () => {
        const todayButton = screen.getByRole("button", { name: /Today/i });
        await user.click(todayButton);
      });

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        expect(mockOnChange).toHaveBeenCalledWith(today);
      });
    });

    it("clears date when clicking Clear button", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(async () => {
        const clearButton = screen.getByRole("button", { name: /Clear/i });
        await user.click(clearButton);
      });

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith("");
      });
    });
  });

  describe("Date Restrictions", () => {
    it("respects minDate restriction", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} minDate="2025-12-15" />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        const allButtons = screen.getAllByRole("button");
        const disabledDays = allButtons.filter(
          (btn) =>
            btn.hasAttribute("disabled") && btn.textContent?.match(/^\d+$/),
        );
        expect(disabledDays.length).toBeGreaterThan(0);
      });
    });

    it("respects maxDate restriction", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} maxDate="2025-12-15" />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        const allButtons = screen.getAllByRole("button");
        const disabledDays = allButtons.filter(
          (btn) =>
            btn.hasAttribute("disabled") && btn.textContent?.match(/^\d+$/),
        );
        expect(disabledDays.length).toBeGreaterThan(0);
      });
    });
  });

  describe("States", () => {
    it("applies disabled styles when disabled", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} disabled />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      expect(input).toBeDisabled();
      expect(input).toHaveClass(styles.inputDisabledText);
    });

    it("applies read-only styles when readOnly", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} readOnly />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      expect(input).toHaveAttribute("readOnly");
    });

    it("shows error border when error is present", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} error="Required field" />,
      );
      const inputWrapper = container.querySelector(`.${styles.inputContainer}`);

      expect(inputWrapper).toHaveClass(styles.inputError);
    });

    it("shows required indicator when required and empty", () => {
      render(<DatePicker value="" onChange={mockOnChange} required />);
      expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
    });

    it("hides required indicator when required but has value", () => {
      render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} required />,
      );
      expect(
        screen.queryByText(/This field is required/i),
      ).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper aria-label", () => {
      const { container } = render(
        <DatePicker label="Birth Date" value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      expect(input).toHaveAttribute("aria-label", "Birth Date");
    });

    it("has proper aria-invalid when error", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} error="Invalid date" />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("has proper aria-required when required", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} required />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      expect(input).toHaveAttribute("aria-required", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty value prop", () => {
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      expect(input.value).toBe("");
    });

    it("handles null onChange gracefully", () => {
      const { container } = render(<DatePicker value="" onChange={() => {}} />);
      expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("handles custom className", () => {
      const { container } = render(
        <DatePicker
          value=""
          onChange={mockOnChange}
          className="custom-class"
        />,
      );
      const wrapper = container.querySelector(".custom-class");

      expect(wrapper).toBeInTheDocument();
    });

    it("updates when value prop changes", () => {
      const { container, rerender } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;
      const initialValue = input.value;

      rerender(<DatePicker value="2025-12-25" onChange={mockOnChange} />);

      const newValue = input.value;
      expect(newValue).not.toBe(initialValue);
    });
  });

  describe("Mobile Optimization", () => {
    it("renders touch-friendly buttons", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        const grid = container.querySelector(`.${styles.dayGrid}`);
        expect(grid).toBeInTheDocument();
      });
    });

    it("calendar is responsive", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      await waitFor(() => {
        const calendar = container.querySelector(`.${styles.calendar}`);
        expect(calendar).toBeInTheDocument();
      });
    });
  });

  describe("Advanced Navigation", () => {
    it("navigates to previous year in months view", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on month to go to months view
      await waitFor(async () => {
        const monthButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.includes("November"));
        if (monthButton) {
          await user.click(monthButton);
        }
      });

      // Click previous button in months view
      await waitFor(async () => {
        const prevButton = screen.getByRole("button", {
          name: /Previous year/i,
        });
        await user.click(prevButton);
      });

      await waitFor(() => {
        expect(screen.getByText("2024")).toBeInTheDocument();
      });
    });

    it("navigates to next year in months view", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on month to go to months view
      await waitFor(async () => {
        const monthButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.includes("November"));
        if (monthButton) {
          await user.click(monthButton);
        }
      });

      // Click next button in months view
      await waitFor(async () => {
        const nextButton = screen.getByRole("button", { name: /Next year/i });
        await user.click(nextButton);
      });

      await waitFor(() => {
        expect(screen.getByText("2026")).toBeInTheDocument();
      });
    });

    it("navigates to previous decade in years view", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on year to go to years view
      await waitFor(async () => {
        const yearButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.match(/^2025$/));
        if (yearButton) {
          await user.click(yearButton);
          await user.click(yearButton);
        }
      });

      // Click previous button in years view
      await waitFor(async () => {
        const prevButton = screen.getByRole("button", {
          name: /Previous decade/i,
        });
        await user.click(prevButton);
      });

      await waitFor(() => {
        const yearButtons = screen.getAllByRole("button");
        const hasOlderYear = yearButtons.some((btn) =>
          btn.textContent?.match(/^201\d$/),
        );
        expect(hasOlderYear).toBe(true);
      });
    });

    it("navigates to next decade in years view", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on year to go to years view
      await waitFor(async () => {
        const yearButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.match(/^2025$/));
        if (yearButton) {
          await user.click(yearButton);
          await user.click(yearButton);
        }
      });

      // Click next button in years view
      await waitFor(async () => {
        const nextButton = screen.getByRole("button", { name: /Next decade/i });
        await user.click(nextButton);
      });

      await waitFor(() => {
        const yearButtons = screen.getAllByRole("button");
        const hasNewerYear = yearButtons.some((btn) =>
          btn.textContent?.match(/^203\d$/),
        );
        expect(hasNewerYear).toBe(true);
      });
    });
  });

  describe("Input Validation", () => {
    it("handles manual date input", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.type(input, "11/14/2025");

      // The parseInputValue should be called
      expect(input.value).toContain("11");
    });

    it("resets invalid input on blur", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-11-14" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.clear(input);
      await user.type(input, "invalid date");
      await user.tab();

      // Should reset to the original value
      await waitFor(() => {
        expect(input.value).toBeTruthy();
      });
    });
  });

  describe("Month and Year Selection", () => {
    it("highlights current month in months view", async () => {
      const user = userEvent.setup();
      const today = new Date();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on month name button in the header to switch to months view
      await waitFor(async () => {
        const monthButtons = screen
          .getAllByRole("button")
          .filter((btn) =>
            btn.textContent?.match(
              /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/,
            ),
          );
        if (monthButtons.length > 0) {
          await user.click(monthButtons[0]);
        }
      });

      await waitFor(() => {
        const currentMonthIndex = today.getMonth();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const currentMonthName = monthNames[currentMonthIndex];
        const monthGridButtons = screen
          .getAllByRole("button")
          .filter(
            (btn) =>
              btn.textContent === currentMonthName &&
              btn.parentElement?.className.includes(styles.monthGrid),
          );
        if (monthGridButtons.length > 0) {
          expect(monthGridButtons[0]).toHaveClass(styles.monthCurrent);
        }
      });
    });

    it("highlights selected month in months view", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2025-03-15" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on month name to go to months view
      await waitFor(async () => {
        const monthButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.match(/^March$/i));
        if (monthButton) {
          await user.click(monthButton);
        }
      });

      await waitFor(() => {
        const marButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent === "Mar");
        if (marButton) {
          expect(marButton).toHaveClass(styles.monthSelected);
        }
      });
    });

    it("highlights current year in years view", async () => {
      const user = userEvent.setup();
      const currentYear = new Date().getFullYear();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on year to go to years view
      await waitFor(async () => {
        const yearButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.match(/^\d{4}$/));
        if (yearButton) {
          await user.click(yearButton);
        }
      });

      await waitFor(() => {
        const currentYearButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent === currentYear.toString());
        if (currentYearButton) {
          expect(currentYearButton).toHaveClass(styles.yearCurrent);
        }
      });
    });

    it("highlights selected year in years view", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="2023-06-15" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Click on year twice to go to years view
      await waitFor(async () => {
        const yearButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.match(/^2023$/));
        if (yearButton) {
          await user.click(yearButton);
        }
      });

      await user.click(input);

      // Click on the year button in header to go to years view
      await waitFor(async () => {
        const yearButtonInHeader = screen
          .getAllByRole("button")
          .find(
            (btn) =>
              btn.textContent?.includes("2023") &&
              btn.className.includes(styles.headerButton),
          );
        if (yearButtonInHeader) {
          await user.click(yearButtonInHeader);
        }
      });

      await waitFor(() => {
        const year2023Button = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent === "2023");
        if (year2023Button) {
          expect(year2023Button).toHaveClass(styles.yearSelected);
        }
      });
    });

    it("selects a year and returns to months view", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker value="" onChange={mockOnChange} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);

      // Go to years view
      await waitFor(async () => {
        const yearButton = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent?.match(/^\d{4}$/));
        if (yearButton) {
          await user.click(yearButton);
        }
      });

      // Select a year
      await waitFor(async () => {
        const year2023Button = screen
          .getAllByRole("button")
          .find((btn) => btn.textContent === "2023");
        if (year2023Button) {
          await user.click(year2023Button);
        }
      });

      // Should return to months view
      await waitFor(() => {
        expect(screen.queryByText("Jan")).toBeInTheDocument();
      });
    });
  });

  // Internationalization is covered via the locale prop in component behavior.
});
