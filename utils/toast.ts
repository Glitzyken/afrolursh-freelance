import { toast } from "vue-sonner";

export const successToast = (message: string, description?: string) => {
  return toast.success(message, { description });
};

export const failToast = (message: string, description?: string) => {
  return toast.error(message, { description });
};
