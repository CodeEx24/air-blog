import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

server.events.on("request:start", ({ request }) => {
  console.log("API Called: ", request.method, request.url);
});
