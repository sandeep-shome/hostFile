import { toast } from "react-hot-toast";

export const successMessege = (msg) => toast.success(msg);
export const errorMessege = (msg) => toast.error(msg);
export const loadingMessege = (msg) => toast.loading(msg);
