'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Users, Database, RefreshCw, Shield } from 'lucide-react';

interface Config {
  ldapEnabled: boolean;
  ldapServer: string;
  ldapPort: string;
  ldapBaseDN: string;
  apiEnabled: boolean;
  apiKey: string;
  backupEnabled: boolean;
  backupFrequency: string;
}

export default function Settings() {
  const [systemConfig, setSystemConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/configuracoes');
      const data = await res.json();
      setSystemConfig(data);
    } catch (err) {
      console.error('Erro ao buscar configurações:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  if (loading || !systemConfig) {
    return <div className="text-gray-600">Carregando configurações...</div>;
  }

  // Aqui começa o conteúdo principal (já seguro para usar systemConfig)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <button
          onClick={() => {
            fetch('/api/configuracoes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(systemConfig),
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exemplo: LDAP */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Integração LDAP</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Habilitar LDAP</p>
                <p className="text-sm text-gray-500">Autenticação via Active Directory</p>
              </div>
              <input
                type="checkbox"
                checked={systemConfig.ldapEnabled}
                onChange={(e) =>
                  setSystemConfig({ ...systemConfig, ldapEnabled: e.target.checked })
                }
              />
            </div>
            {systemConfig.ldapEnabled && (
              <>
                <Input label="Servidor LDAP" value={systemConfig.ldapServer} onChange={(v) => setSystemConfig({ ...systemConfig, ldapServer: v })} />
                <Input label="Porta" value={systemConfig.ldapPort} onChange={(v) => setSystemConfig({ ...systemConfig, ldapPort: v })} />
                <Input label="Base DN" value={systemConfig.ldapBaseDN} onChange={(v) => setSystemConfig({ ...systemConfig, ldapBaseDN: v })} />
              </>
            )}
          </CardContent>
        </Card>

        {/* ...demais cards aqui */}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
      />
    </div>
  );
}
