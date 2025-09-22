"use client";
import { X, PenTool } from "lucide-react";

interface SignatureModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignatureModal({ open, onClose }: SignatureModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Assinatura Digital</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Aqui entra o formulário e canvas de assinatura (vou migrar do seu código depois) */}
          <p className="text-gray-600">Formulário de assinatura digital.</p>

          <div className="flex justify-end pt-4 border-t mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <PenTool className="h-4 w-4" />
              <span>Finalizar Assinatura</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
