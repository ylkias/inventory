"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Inventory from "@/components/Inventory";
import Operations from "@/components/Operations";
import Terms from "@/components/Terms";
import Intelligence from "@/components/Intelligence";
import Settings from "@/components/Settings";
import Wiki from "@/components/Wiki";

import SignatureModal from "@/components/SignatureModal";
import TermModal from "@/components/TermModal";

export default function MainPage() {
  const [selectedModule, setSelectedModule] = useState("dashboard");

  // controle dos modais
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showTermModal, setShowTermModal] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar selected={selectedModule} setSelected={setSelectedModule} />

      {/* Área Principal */}
      <div className="flex-1 flex flex-col">
        <Header selectedModule={selectedModule} setShowSignatureModal={setShowSignatureModal} />

        <main className="flex-1 overflow-y-auto p-6">
          {selectedModule === "dashboard" && <Dashboard />}
          {selectedModule === "inventory" && <Inventory />}
          {selectedModule === "operations" && <Operations />}
          
          {selectedModule === "terms" && (
            <Terms onNovaAssinatura={() => setShowSignatureModal(true)} />
          )}

          {selectedModule === "intelligence" && <Intelligence />}
          {selectedModule === "settings" && <Settings />}
          {selectedModule === "wiki" && <Wiki />}
        </main>
      </div>

      {/* Modais */}
      <SignatureModal open={showSignatureModal} onClose={() => setShowSignatureModal(false)} />
      <TermModal open={showTermModal} onClose={() => setShowTermModal(false)} />
    </div>
  );
}
