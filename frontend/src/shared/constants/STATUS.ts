export const STATUS = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
