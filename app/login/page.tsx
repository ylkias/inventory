"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import { autenticar } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!usuario || !senha) {
  //     setErro("Preencha todos os campos.");
  //     return;
  //   }

  //   if (usuario === "admin" && senha === "admin123") {
  //     router.push("/dashboard");
  //   } else {
  //     setErro("Usuário ou senha inválidos.");
  //   }
  // };

  

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!usuario || !senha) {
    setErro("Preencha todos os campos.");
    return;
  }

  const res = await autenticar(usuario, senha);
  if (res.sucesso) {
    router.push("/dashboard");
  } else {
    setErro(res.erro || "Erro ao autenticar.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <FaUser className="text-2xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Acesso ao Sistema</h2>
          <p className="text-sm text-gray-500">Insira suas credenciais para continuar</p>
        </div>

        {erro && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Usuário</label>
            <div className="flex items-center border rounded px-3 py-2 mt-1 bg-gray-50">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="Digite seu usuário"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Senha</label>
            <div className="flex items-center border rounded px-3 py-2 mt-1 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Gestão de Termos • Grupo Newland
        </p>
      </div>
    </div>
  );
}
