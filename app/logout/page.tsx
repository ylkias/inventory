import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Logout() {
  logout();
  redirect("/login");
}