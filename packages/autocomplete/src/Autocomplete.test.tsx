import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Autocomplete, { AutocompleteOption } from "./Autocomplete";

const mockOptions: AutocompleteOption[] = [
  { value: "1", label: "Option One", description: "First option" },
  { value: "2", label: "Option Two", description: "Second option" },
  { value: "3", label: "Option Three", description: "Third option" },
  { value: "4", label: "Disabled Option", disabled: true },
];

describe("Autocomplete Component", () => {
  describe("Rendering", () => {
    it("renders input with placeholder", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          placeholder="Search here..."
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Search here...");
    });

    it("renders label when provided", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          label="My Field"
          value={null}
          onChange={onChange}
          options={mockOptions}
        />,
      );

      expect(screen.getByText("My Field")).toBeInTheDocument();
    });

    it("displays required asterisk when required is true", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          label="Required Field"
          value={null}
          onChange={onChange}
          options={mockOptions}
          required
        />,
      );

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("displays hint text when provided", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          hint="This is a hint"
        />,
      );

      expect(screen.getByText("This is a hint")).toBeInTheDocument();
    });
  });

  describe("Selection", () => {
    it("displays selected option label in input", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value="2" onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId(
        "autocomplete-input",
      ) as HTMLInputElement;
      expect(input.value).toBe("Option Two");
    });
  });

  describe("Dropdown Behavior", () => {
    it("opens dropdown when input is focused", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      expect(screen.getByTestId("autocomplete-dropdown")).toBeInTheDocument();
    });

    it("displays all options when opened", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      expect(screen.getByText("Option One")).toBeInTheDocument();
      expect(screen.getByText("Option Two")).toBeInTheDocument();
      expect(screen.getByText("Option Three")).toBeInTheDocument();
      expect(screen.getByText("Disabled Option")).toBeInTheDocument();
    });
  });

  describe("Clear Functionality", () => {
    it("displays clear button when value is selected and clearable is true", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value="1"
          onChange={onChange}
          options={mockOptions}
          clearable
        />,
      );

      expect(screen.getByTestId("autocomplete-clear")).toBeInTheDocument();
    });

    it("does not display clear button when clearable is false", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value="1"
          onChange={onChange}
          options={mockOptions}
          clearable={false}
        />,
      );

      expect(
        screen.queryByTestId("autocomplete-clear"),
      ).not.toBeInTheDocument();
    });

    it("calls onChange with null when clear button is clicked", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value="1"
          onChange={onChange}
          options={mockOptions}
          clearable
        />,
      );

      const clearButton = screen.getByTestId("autocomplete-clear");
      fireEvent.click(clearButton);

      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe("Error and Warning States", () => {
    it("displays error message and applies error styles", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          error="This field is required"
        />,
      );

      expect(screen.getByText("This field is required")).toBeInTheDocument();
      const input = screen.getByTestId("autocomplete-input");
      expect(input).toHaveClass("border-red-500");
    });
  });

  describe("Disabled and ReadOnly States", () => {
    it("disables input when disabled prop is true", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          disabled
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      expect(input).toBeDisabled();
      expect(input).toHaveClass("disabled:bg-gray-100");
    });

    it("makes input readonly when readOnly prop is true", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          readOnly
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      expect(input).toHaveAttribute("readonly");
    });

    it("does not open dropdown when disabled", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          disabled
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      expect(
        screen.queryByTestId("autocomplete-dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("displays loading spinner when loading is true with empty options", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={[]} loading />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("displays inline loading spinner when loading with options", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          loading
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      // Loading spinner should be visible in the input area
      expect(input.nextElementSibling).toBeInTheDocument();
    });
  });

  describe("Callbacks", () => {
    it("calls onSearch callback when search term changes", () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const onSearch = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          onSearch={onSearch}
          searchable
          debounceMs={300}
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "test" } });

      // Fast-forward time to trigger debounced callback
      jest.advanceTimersByTime(300);

      expect(onSearch).toHaveBeenCalledWith("test");
      jest.useRealTimers();
    });
  });

  describe("Search Functionality", () => {
    it("filters options based on search term", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          searchable
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "Two" } });

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "Option Two";
        }),
      ).toBeInTheDocument();
      expect(screen.queryByText("Option One")).not.toBeInTheDocument();
      expect(screen.queryByText("Option Three")).not.toBeInTheDocument();
    });

    it("calls onSearch callback when search term changes", () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const onSearch = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          onSearch={onSearch}
          searchable
          debounceMs={300}
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "test" } });

      // Fast-forward time to trigger debounced callback
      jest.advanceTimersByTime(300);

      expect(onSearch).toHaveBeenCalledWith("test");
      jest.useRealTimers();
    });

    it("highlights matching text in search results", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          searchable
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "One" } });

      const highlightedElements = screen.getByText("One", { selector: "mark" });
      expect(highlightedElements).toBeInTheDocument();
      expect(highlightedElements).toHaveClass("bg-yellow-200");
    });

    it("shows all options when search is empty", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          searchable
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      expect(screen.getByText("Option One")).toBeInTheDocument();
      expect(screen.getByText("Option Two")).toBeInTheDocument();
      expect(screen.getByText("Option Three")).toBeInTheDocument();
    });
  });

  describe("Create New Option", () => {
    it("shows create option when onCreate is provided and no matches found", () => {
      const onChange = jest.fn();
      const onCreate = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          onCreate={onCreate}
          searchable
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "New Option" } });

      expect(screen.getByText(/Create "New Option"/)).toBeInTheDocument();
    });

    it("calls onCreate when create option is clicked", () => {
      const onChange = jest.fn();
      const onCreate = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          onCreate={onCreate}
          searchable
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "New Option" } });

      const createOption = screen.getByTestId("autocomplete-create");
      fireEvent.click(createOption);

      expect(onCreate).toHaveBeenCalledWith("New Option");
    });

    it("shows create option when onCreate provided with filtered results", () => {
      const onChange = jest.fn();
      const onCreate = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          onCreate={onCreate}
          searchable
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "Two" } });

      // Create button should show with border-top since there are filtered results
      expect(screen.getByTestId("autocomplete-create")).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    beforeEach(() => {
      Element.prototype.scrollIntoView = jest.fn();
    });

    it("highlights first option on arrow down", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: "ArrowDown" });

      const firstOption = screen.getByTestId("autocomplete-option-1");
      expect(firstOption).toHaveClass("bg-blue-50");
    });

    it("selects highlighted option on Enter key", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: "ArrowDown" });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(onChange).toHaveBeenCalledWith("1", mockOptions[0]);
    });

    it("closes dropdown on Escape key", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      expect(screen.getByTestId("autocomplete-dropdown")).toBeInTheDocument();

      fireEvent.keyDown(input, { key: "Escape" });
      expect(
        screen.queryByTestId("autocomplete-dropdown"),
      ).not.toBeInTheDocument();
    });

    it("opens dropdown on arrow down when closed", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.keyDown(input, { key: "ArrowDown" });

      expect(screen.getByTestId("autocomplete-dropdown")).toBeInTheDocument();
    });
  });

  describe("Toggle Button", () => {
    it("toggles dropdown when toggle button is clicked", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const toggleButton = screen.getByTestId("autocomplete-toggle");

      fireEvent.click(toggleButton);
      expect(screen.getByTestId("autocomplete-dropdown")).toBeInTheDocument();

      fireEvent.click(toggleButton);
      expect(
        screen.queryByTestId("autocomplete-dropdown"),
      ).not.toBeInTheDocument();
    });

    it("rotates chevron icon when dropdown is open", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const toggleButton = screen.getByTestId("autocomplete-toggle");
      fireEvent.click(toggleButton);

      const chevronIcon = toggleButton.querySelector("svg");
      expect(chevronIcon).toHaveClass("rotate-180");
    });
  });

  describe("Option Selection", () => {
    it("calls onChange with option value and object when option is clicked", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      const option = screen.getByTestId("autocomplete-option-2");
      fireEvent.click(option);

      expect(onChange).toHaveBeenCalledWith("2", mockOptions[1]);
    });

    it("does not select disabled option", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value={null} onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      const disabledOption = screen.getByTestId("autocomplete-option-4");
      fireEvent.click(disabledOption);

      expect(onChange).not.toHaveBeenCalled();
    });

    it("displays checkmark icon for selected option", () => {
      const onChange = jest.fn();
      render(
        <Autocomplete value="1" onChange={onChange} options={mockOptions} />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      const selectedOption = screen.getByTestId("autocomplete-option-1");
      expect(selectedOption.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Custom Icon", () => {
    it("renders custom icon when provided", () => {
      const onChange = jest.fn();
      const customIcon = <span data-testid="custom-icon">🔍</span>;
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          icon={customIcon}
        />,
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Custom Render Option", () => {
    it("uses custom renderOption when provided", () => {
      const onChange = jest.fn();
      const renderOption = (option: AutocompleteOption) => (
        <div data-testid={`custom-${option.value}`}>Custom: {option.label}</div>
      );

      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          renderOption={renderOption}
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);

      expect(screen.getByTestId("custom-1")).toBeInTheDocument();
      expect(screen.getByText("Custom: Option One")).toBeInTheDocument();
    });
  });

  describe("No Options State", () => {
    it('shows "No results found" when no options match search', () => {
      const onChange = jest.fn();
      render(
        <Autocomplete
          value={null}
          onChange={onChange}
          options={mockOptions}
          searchable
        />,
      );

      const input = screen.getByTestId("autocomplete-input");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "xyz" } });

      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });
});
