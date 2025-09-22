"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaExclamationTriangle } from "react-icons/fa";
import { autenticar } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    if (!usuario || !senha) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    const res = await autenticar(usuario, senha);
    if (res.sucesso) {
      router.push("/dashboard");
    } else {
      setErro(res.erro || "Erro ao autenticar.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <FaUser className="text-2xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Acesso ao Sistema
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Insira suas credenciais para continuar
          </p>
        </div>

        {erro && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 p-3 rounded text-sm">
            <FaExclamationTriangle />
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Usuário
            </label>
            <div className="flex items-center border rounded px-3 py-2 mt-1 bg-gray-50 dark:bg-slate-700">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-white"
                placeholder="Digite seu usuário"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Senha
            </label>
            <div className="flex items-center border rounded px-3 py-2 mt-1 bg-gray-50 dark:bg-slate-700">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-white"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition disabled:opacity-60 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                Carregando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Gestão de Termos • Grupo Newland
        </p>
      </div>
    </div>
  );
}
