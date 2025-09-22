"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Inventory() {
  const [inventoryTab, setInventoryTab] = useState("items");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Inventário</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Item</span>
        </button>
      </div>

      {/* Tabs, filtros e tabelas (coloque aqui depois) */}
      <p className="text-gray-600">Listagem de equipamentos, filtros e termos associados.</p>
    </div>
  );
}
