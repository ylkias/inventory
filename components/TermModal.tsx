"use client";
import { X, Printer, Download } from "lucide-react";

interface TermModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TermModal({ open, onClose }: TermModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Visualizar Termo</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Conteúdo do termo */}
          <div className="space-y-6">
            <p className="text-gray-600">Informações do termo de responsabilidade.</p>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Printer className="h-4 w-4" />
                <span>Imprimir</span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Baixar PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
