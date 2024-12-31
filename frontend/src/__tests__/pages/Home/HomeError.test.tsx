import HomePage from "@/pages/Home";
import { pageRender } from "@/utils/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { handlersError } from "../../mocks/handlers";
import { server } from "../../mocks/server";

server.use(handlersError[0]);
describe("HomePage Error State", () => {
  it("should handle error state", async () => {
    pageRender(<HomePage />);

    await waitFor(() => {
      const cell = screen.getByRole("cell", {
        name: /no results/i,
      });

      expect(cell).toBeInTheDocument();
    });
  });
});
