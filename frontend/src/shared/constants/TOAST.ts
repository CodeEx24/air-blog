export type ToastType = "Success" | "Error" | "Info" | "Warning";

export const TOAST_TYPE = {
    SUCCESS: "Success" as ToastType,
    ERROR: "Error" as ToastType,
    INFO: "Info" as ToastType,
    WARNING: "Warning" as ToastType,
};

export interface ToastOptions {
    type: ToastType;
    message: string;
    title: string;
}
