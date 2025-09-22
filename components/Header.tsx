"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  selectedModule: string;
  setShowSignatureModal: (open: boolean) => void;
}

const moduleLabels: Record<string, string> = {
  dashboard: "Dashboard",
  inventory: "Inventário",
  operations: "Operações",
  terms: "Termos",
  intelligence: "Inteligência",
  settings: "Configurações",
  wiki: "Wiki",
};

export default function Header({ selectedModule, setShowSignatureModal }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between">
      {/* Esquerda: botão mobile + título */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => alert("Abrir menu lateral no mobile")}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          title="Abrir menu"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {moduleLabels[selectedModule] || "Módulo"}
        </h2>
      </div>

      {/* Direita: ações globais (só em "terms") */}
      {/* {selectedModule === "terms" && (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSignatureModal(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Nova Assinatura
          </button>
        </div>
      )} */}
    </header>
  );
}
