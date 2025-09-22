import { isLogado } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  if (!isLogado()) redirect("/login");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard</h1>
      <a href="/logout" className="text-blue-600 underline">Sair</a>
    </div>
  );
}
