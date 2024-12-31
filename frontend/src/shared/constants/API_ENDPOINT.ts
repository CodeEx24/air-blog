const ROOT_API = "/api";

const API_ENDPOINT = {
  POSTS: {
    PATH: `${ROOT_API}/posts`,
    CREATE: "/",
    READ: "/",
    UPDATE: "/:id",
    DELETE: "/:id",

    ID: "/:id",
    SLUG: "/slug/:slug",
  },
};

export { API_ENDPOINT };
