import HomePage from "@/pages/Home";
import { pageRender } from "@/utils/test-utils";
import { screen, waitFor } from "@testing-library/react";

describe("HomePage", () => {
  it("should render posts data when fetched", async () => {
    pageRender(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Prof. Elna Runte DDS")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          "Quo nam sint illum doloribus corporis architecto blanditiis aliquid."
        )
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Published")).toBeInTheDocument();
    });
  });
});
