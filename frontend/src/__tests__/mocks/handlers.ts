import { http, HttpResponse } from "msw";
import { baseUrl } from "@/pages/api/apiSlice";
import { API_ENDPOINT } from "@/shared/constants/API_ENDPOINT";

export const handlers = [
  http.get(
    `${baseUrl}${API_ENDPOINT.POSTS.PATH}${API_ENDPOINT.POSTS.READ}`,
    () => {
      return HttpResponse.json({
        success: true,
        data: {
          items: [
            {
              id: 1,
              author: "Prof. Elna Runte DDS",
              author_image:
                "https://images.pexels.com/photos/15502152/pexels-photo-15502152/free-photo-of-posed-photo-of-a-young-woman-in-a-black-hat-covered-in-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              title:
                "Quo nam sint illum doloribus corporis architecto blanditiis aliquid.",
              content:
                "Vitae vitae maiores reprehenderit dolorum. Quasi ab maxime inventore sit. Officia et rerum facilis quidem est dolor nam. Quos aut iure dolores omnis unde quia laborum.\n\nArchitecto eos modi et enim animi quia porro. Provident eaque et voluptatem voluptas praesentium quod quibusdam. Nihil fugit nostrum magni vel officia voluptatum doloremque. Error autem sint repellat corporis minima dolor.\n\nTotam ullam quos expedita consectetur dolorem dignissimos asperiores. Et quas sint qui sed et tempora accusamus. Vel ducimus molestiae cumque. Qui ipsum recusandae omnis est pariatur.",
              image:
                "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FQRjBHxegQniYOSzEKnF1&w=1920&q=75",
              slug: "commodi-delectus-sed-molestias-neque-incidunt",
              status: "Published",
              tags: "sample-tags",
              created_at: "2024-12-28 12:35:19",
              updated_at: "2024-12-28 12:35:19",
            },
          ],
          pagination: { pageIndex: 1, pageSize: 10 },
          pageCount: 1,
          totalRecords: 1,
        },
      });
    }
  ),
];

export const handlersError = [
  http.get(
    `${baseUrl}${API_ENDPOINT.POSTS.PATH}${API_ENDPOINT.POSTS.READ}`,
    () => {
      return HttpResponse.json({
        success: true,
        data: {
          items: [],
          pagination: { pageIndex: 1, pageSize: 10 },
          pageCount: 1,
          totalRecords: 0,
        },
      });
    }
  ),
];
