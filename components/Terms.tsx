"use client";

interface TermsProps {
  onNovaAssinatura: () => void;
}

export default function Terms({ onNovaAssinatura }: TermsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Termos</h1>
          <p className="text-gray-600">Criação, assinatura e gerenciamento de termos de responsabilidade.</p>
        </div>

        <div>
          <button
            onClick={onNovaAssinatura}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Nova Assinatura
          </button>
        </div>
      </div>

      {/* Conteúdo futuro */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <p className="text-gray-500 text-sm">
          📄 Em breve: listagem e filtros de termos, ações de envio, histórico de assinaturas...
        </p>
      </div>
    </div>
  );
}
