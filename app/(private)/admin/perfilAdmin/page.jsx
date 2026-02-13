'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import AdminProfileCard from './cardPerfil';
import PersonalInfoTab from './infoTabela';
import SecurityTab from './tabelaSeguranca';
import PreferencesTab from './tabelaPreferencias';
import MessageAlert from './mensagem';
import { User, Shield, ArrowLeft, Settings } from 'lucide-react';

/* =====================================================
   COMPONENTE DE ABA (FORA DO RENDER ❗)
===================================================== */
function TabButton({ tab, icon: Icon, label, activeTab, onChange }) {
  const isActive = activeTab === tab;

  return (
    <button
      onClick={() => onChange(tab)}
      className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
        ${
          isActive
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20'
            : 'bg-gradient-to-br from-gray-900 to-black text-gray-300 hover:text-white border border-gray-800 hover:border-green-500/30'
        }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */
export default function AdminProfilePage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  const [adminData, setAdminData] = useState({
    id: 'ADM001',
    nome: 'Administrador',
    email: 'admin@fitnessstore.com',
    telefone: '+244 123 456 789',
    cargo: 'Administrador Principal',
    dataCadastro: '2024-01-15',
    ultimoAcesso: '2024-03-20 14:30:00',
    foto: null,
    notificacoes: true,
    temaEscuro: true
  });

  const [formData, setFormData] = useState({ ...adminData });

  const [passwordData, setPasswordData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  useEffect(() => {
    setFormData({ ...adminData });
  }, [adminData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('A imagem deve ter menos de 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Selecione uma imagem válida');
      return;
    }

    setFormData((prev) => ({ ...prev, foto: file }));
    setErrorMessage('');
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, foto: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (!formData.nome.trim()) throw new Error('O nome é obrigatório');
      if (!formData.email.trim()) throw new Error('O email é obrigatório');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) throw new Error('Email inválido');

      await new Promise((r) => setTimeout(r, 1500));
      setAdminData({ ...formData });
      setSuccessMessage('Perfil atualizado com sucesso!');
    } catch (err) {
      setErrorMessage(err.message || 'Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (!passwordData.senhaAtual) throw new Error('Digite sua senha atual');
      if (!passwordData.novaSenha) throw new Error('Digite a nova senha');
      if (passwordData.novaSenha.length < 6)
        throw new Error('A nova senha deve ter pelo menos 6 caracteres');
      if (passwordData.novaSenha !== passwordData.confirmarSenha)
        throw new Error('As senhas não coincidem');

      await new Promise((r) => setTimeout(r, 1500));
      setSuccessMessage('Senha alterada com sucesso!');
      setPasswordData({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Erro ao alterar senha');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

  const formatDateTime = (d) =>
    new Date(d).toLocaleString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto p-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </button>

          <h1 className="text-3xl font-bold mb-2">Perfil do Admin</h1>
          <p className="text-gray-400">Gerencie suas informações e segurança</p>

          <div className="flex flex-wrap gap-2 mt-6">
            <TabButton tab="personal" icon={User} label="Informações" activeTab={activeTab} onChange={setActiveTab} />
            <TabButton tab="security" icon={Shield} label="Segurança" activeTab={activeTab} onChange={setActiveTab} />
            <TabButton tab="preferences" icon={Settings} label="Preferências" activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <MessageAlert errorMessage={errorMessage} successMessage={successMessage} />

        <div className="grid lg:grid-cols-3 gap-8">
          <AdminProfileCard
            formData={formData}
            formatDate={formatDate}
            formatDateTime={formatDateTime}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
          />

          <div className="lg:col-span-2">
            {activeTab === 'personal' && (
              <PersonalInfoTab
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'security' && (
              <SecurityTab
                passwordData={passwordData}
                handlePasswordChange={handlePasswordChange}
                handlePasswordSubmit={handlePasswordSubmit}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'preferences' && (
              <PreferencesTab
                formData={formData}
                handleChange={handleChange}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
