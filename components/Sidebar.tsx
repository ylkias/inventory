"use client";

import { Shield, BarChart3, Package, FileText, Brain, Settings, BookOpen } from "lucide-react";

interface SidebarProps {
  selected: string;
  setSelected: (id: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "inventory", label: "Inventário", icon: Package },
  { id: "operations", label: "Operações", icon: FileText },
  { id: "terms", label: "Termos", icon: FileText },
  { id: "intelligence", label: "Inteligência", icon: Brain },
  { id: "settings", label: "Configurações", icon: Settings },
  { id: "wiki", label: "Wiki", icon: BookOpen },
];

export default function Sidebar({ selected, setSelected }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-2">
        <Shield className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-lg font-bold text-gray-900">Gestão de Termos</h1>
          <p className="text-xs text-gray-500">Maturidade traz Inovação  </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="px-4 pb-4 flex-1">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                selected === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
