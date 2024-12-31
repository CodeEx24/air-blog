import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./PostTableRowActions";
import { statuses } from "./DataOptions";
import Typography from "../../common/Typography";
import { DataTableColumnHeader } from "../../common/table/DataTableColumnHeader";
import { TablePost } from "@/shared/schema/postSchema";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { STATUS } from "@/shared/constants/STATUS";

export const postColumns: ColumnDef<TablePost>[] = [
  {
    id: "author_image",
    accessorKey: "author_image",
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={row.getValue("author_image")} />
            <AvatarFallback>
              {(row.getValue("author") as string)[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Typography className="line-clamp-2 text-sm font-semibold py-0">
            {row.getValue("author")}
          </Typography>
        </div>
      );
    },
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <Typography className="line-clamp-2 text-sm font-semibold py-0">
          {" "}
          {row.getValue("title")}
        </Typography>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div
            className={`size-3 rounded-xl ${
              row.getValue("status") === STATUS.Draft
                ? "bg-yellow-300"
                : row.getValue("status") === STATUS.Published
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          ></div>
          <Typography className="text-sm font-semibold">
            {row.getValue("status")}
          </Typography>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const rawDate = row.getValue("created_at") as string;

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(rawDate));

      return (
        <Typography className="text-sm font-semibold">
          {formattedDate}
        </Typography>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export interface PostFilter {
  author?: string;
  title?: string;
}

export const postFilterConfig: {
  placeholder: string;
  key: keyof PostFilter;
}[] = [
  { placeholder: "Author Name", key: "author" },
  { placeholder: "Title", key: "title" },
];

export const facetConfig = [
  { key: "status", title: "Status", options: statuses },
];
