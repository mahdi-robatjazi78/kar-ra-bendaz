import { toast } from "react-hot-toast";

export default function Toast(
  msg: string,
  success: boolean = true,
  customized: boolean = false,
  icon?: string
) {
  if (customized) {
    toast(msg, {
      icon: icon
        ? icon
        : !icon && success
        ? "✅"
        : !icon && !success
        ? "✖️"
        : "👻",
      style: {
        borderRadius: "10px",
        border: "1px solid var(--borders)",
        padding: "5px 10px",
        background: "var(--header)",
        color: "white",
      },
    });
  } else {
    if (success) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }
}
