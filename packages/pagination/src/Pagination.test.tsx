import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  describe("Basic Rendering", () => {
    test("renders with default props", () => {
      render(<Pagination count={10} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    test("renders page buttons", () => {
      render(<Pagination count={5} />);
      expect(screen.getByLabelText("Página 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 2")).toBeInTheDocument();
    });

    test("renders previous and next buttons by default", () => {
      render(<Pagination count={5} />);
      expect(screen.getByLabelText("Página anterior")).toBeInTheDocument();
      expect(screen.getByLabelText("Página siguiente")).toBeInTheDocument();
    });

    test("hides previous button when hidePrevButton is true", () => {
      render(<Pagination count={5} hidePrevButton />);
      expect(
        screen.queryByLabelText("Página anterior"),
      ).not.toBeInTheDocument();
    });

    test("hides next button when hideNextButton is true", () => {
      render(<Pagination count={5} hideNextButton />);
      expect(
        screen.queryByLabelText("Página siguiente"),
      ).not.toBeInTheDocument();
    });
  });

  describe("First and Last Buttons", () => {
    test("shows first button when showFirstButton is true", () => {
      render(<Pagination count={10} showFirstButton />);
      expect(
        screen.getByLabelText("Ir a la primera página"),
      ).toBeInTheDocument();
    });

    test("shows last button when showLastButton is true", () => {
      render(<Pagination count={10} showLastButton />);
      expect(
        screen.getByLabelText("Ir a la última página"),
      ).toBeInTheDocument();
    });

    test("does not show first/last buttons by default", () => {
      render(<Pagination count={10} />);
      expect(
        screen.queryByLabelText("Ir a la primera página"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText("Ir a la última página"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Page Navigation", () => {
    test("handles page click", () => {
      const handleChange = jest.fn();
      render(<Pagination count={5} onChange={handleChange} />);

      const page2 = screen.getByLabelText("Página 2");
      fireEvent.click(page2);

      expect(handleChange).toHaveBeenCalledWith(expect.anything(), 2);
    });

    test("handles next button click", () => {
      const handleChange = jest.fn();
      render(<Pagination count={5} page={2} onChange={handleChange} />);

      const nextButton = screen.getByLabelText("Página siguiente");
      fireEvent.click(nextButton);

      expect(handleChange).toHaveBeenCalledWith(expect.anything(), 3);
    });

    test("handles previous button click", () => {
      const handleChange = jest.fn();
      render(<Pagination count={5} page={3} onChange={handleChange} />);

      const prevButton = screen.getByLabelText("Página anterior");
      fireEvent.click(prevButton);

      expect(handleChange).toHaveBeenCalledWith(expect.anything(), 2);
    });

    test("handles first button click", () => {
      const handleChange = jest.fn();
      render(
        <Pagination
          count={10}
          page={5}
          showFirstButton
          onChange={handleChange}
        />,
      );

      const firstButton = screen.getByLabelText("Ir a la primera página");
      fireEvent.click(firstButton);

      expect(handleChange).toHaveBeenCalledWith(expect.anything(), 1);
    });

    test("handles last button click", () => {
      const handleChange = jest.fn();
      render(
        <Pagination
          count={10}
          page={5}
          showLastButton
          onChange={handleChange}
        />,
      );

      const lastButton = screen.getByLabelText("Ir a la última página");
      fireEvent.click(lastButton);

      expect(handleChange).toHaveBeenCalledWith(expect.anything(), 10);
    });

    test("works as uncontrolled component", () => {
      render(<Pagination count={5} defaultPage={1} />);

      const page2 = screen.getByLabelText("Página 2");
      fireEvent.click(page2);

      expect(page2).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Disabled State", () => {
    test("disables all buttons when disabled is true", () => {
      render(<Pagination count={5} disabled />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    test("disables previous button on first page", () => {
      render(<Pagination count={5} page={1} />);
      const prevButton = screen.getByLabelText("Página anterior");
      expect(prevButton).toBeDisabled();
    });

    test("disables next button on last page", () => {
      render(<Pagination count={5} page={5} />);
      const nextButton = screen.getByLabelText("Página siguiente");
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Boundary and Sibling Counts", () => {
    test("respects boundaryCount", () => {
      render(<Pagination count={20} page={10} boundaryCount={2} />);
      expect(screen.getByLabelText("Página 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 19")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 20")).toBeInTheDocument();
    });

    test("respects siblingCount", () => {
      render(<Pagination count={20} page={10} siblingCount={2} />);
      expect(screen.getByLabelText("Página 8")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 9")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 10")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 11")).toBeInTheDocument();
      expect(screen.getByLabelText("Página 12")).toBeInTheDocument();
    });

    test("shows ellipsis for gaps", () => {
      render(
        <Pagination count={20} page={10} boundaryCount={1} siblingCount={1} />,
      );
      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBeGreaterThan(0);
    });
  });

  describe("Sizes and Variants", () => {
    test("accepts size prop", () => {
      const { container } = render(<Pagination count={5} size="small" />);
      expect(container).toBeInTheDocument();
    });

    test("accepts shape prop", () => {
      const { container } = render(<Pagination count={5} shape="circular" />);
      expect(container).toBeInTheDocument();
    });

    test("accepts variant prop", () => {
      const { container } = render(<Pagination count={5} variant="outlined" />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Custom Render", () => {
    test("uses custom renderItem when provided", () => {
      const renderItem = jest.fn((item) => (
        <button key={item.page}>Custom {item.page}</button>
      ));

      render(<Pagination count={3} renderItem={renderItem} />);

      expect(renderItem).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    test("uses nav element", () => {
      render(<Pagination count={5} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    test("sets aria-current on selected page", () => {
      render(<Pagination count={5} page={3} />);
      const page3 = screen.getByLabelText("Página 3");
      expect(page3).toHaveAttribute("aria-current", "page");
    });

    test("has proper aria-labels on navigation buttons", () => {
      render(<Pagination count={5} showFirstButton showLastButton />);
      expect(
        screen.getByLabelText("Ir a la primera página"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Ir a la última página"),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Página anterior")).toBeInTheDocument();
      expect(screen.getByLabelText("Página siguiente")).toBeInTheDocument();
    });
  });
});

describe("Pagination: API común", () => {
  it("onPageChange recibe solo el número de página", () => {
    const onPageChange = jest.fn();
    render(<Pagination count={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Página 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("navegación con nombre en español y página actual marcada", () => {
    render(<Pagination count={3} page={2} />);
    expect(
      screen.getByRole("navigation", { name: "Paginación" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Página 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("button", { name: "Página siguiente" }),
    ).toBeInTheDocument();
  });

  it("acepta size sm igual que small", () => {
    const { container, rerender } = render(<Pagination count={3} size="sm" />);
    const a = container.querySelector("button")?.className;
    rerender(<Pagination count={3} size="small" />);
    expect(container.querySelector("button")?.className).toBe(a);
  });
});
