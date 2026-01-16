'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';

import {
  User,
  Mail,
  Phone,
  Shield,
  Save,
  Eye,
  EyeOff,
  Camera,
  Bell,
  Lock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Key,
  Globe,
  Users,
  Package,
  Settings,
  LogOut
} from 'lucide-react';

export default function AdminProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Dados do admin (em um app real, viria de um contexto ou API)
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

  const [stats, setStats] = useState({
    produtosCadastrados: 156,
    vendasHoje: 24,
    clientesAtivos: 432,
    pedidosPendentes: 12
  });

  useEffect(() => {
    // Simulação de carregamento de dados
    const loadAdminData = async () => {
      // Em um app real, buscar dados da API
      setFormData({ ...adminData });
    };
    loadAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('A imagem deve ter menos de 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecione uma imagem válida');
      return;
    }

    setFormData((prev) => ({ ...prev, foto: file }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Validação básica
      if (!formData.nome.trim()) {
        throw new Error('O nome é obrigatório');
      }

      if (!formData.email.trim()) {
        throw new Error('O email é obrigatório');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Email inválido');
      }

      // Simulação de API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Atualizar dados locais
      setAdminData({ ...formData });
      
      setSuccessMessage('Perfil atualizado com sucesso!');
      
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao atualizar perfil');
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (!passwordData.senhaAtual) {
        throw new Error('Digite sua senha atual');
      }

      if (!passwordData.novaSenha) {
        throw new Error('Digite a nova senha');
      }

      if (passwordData.novaSenha.length < 6) {
        throw new Error('A nova senha deve ter pelo menos 6 caracteres');
      }

      if (passwordData.novaSenha !== passwordData.confirmarSenha) {
        throw new Error('As senhas não coincidem');
      }

      // Simulação de API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage('Senha alterada com sucesso!');
      setPasswordData({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
      });
      
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao alterar senha');
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, foto: null }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-green-400 
                  transition-colors duration-200 mb-4 group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>Voltar</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="text-green-400">P</span>ERFIL DO ADMIN
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Gerencie suas informações e configurações
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Admin • Nível 3</span>
              </div>
            </div>
          </div>

          {/* Tabs de navegação */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${activeTab === 'personal' 
                  ? 'bg-green-500 text-black' 
                  : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <User className="h-4 w-4" />
              Informações Pessoais
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${activeTab === 'security' 
                  ? 'bg-green-500 text-black' 
                  : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <Lock className="h-4 w-4" />
              Segurança
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${activeTab === 'preferences' 
                  ? 'bg-green-500 text-black' 
                  : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <Settings className="h-4 w-4" />
              Preferências
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Mensagens */}
        {errorMessage && (
          <div className="mb-6 p-4 border border-red-500/30 rounded-xl bg-red-900/10 backdrop-blur-sm 
            animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="font-medium text-red-300">{errorMessage}</p>
                <p className="text-sm text-red-400/80 mt-1">Verifique os dados e tente novamente</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 border border-green-500/30 rounded-xl bg-green-900/10 backdrop-blur-sm 
            animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-green-300">{successMessage}</p>
                <p className="text-sm text-green-400/80 mt-1">Alterações salvas com sucesso</p>
              </div>
            </div>
          </div>
        )}

        {/* Grid principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna esquerda - Informações e estatísticas */}
          <div className="lg:col-span-1 space-y-8">
            {/* Card do perfil */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500/30 
                    mx-auto relative">
                    {formData.foto ? (
                      <Image
                        src={URL.createObjectURL(formData.foto)}
                        alt="Foto do admin"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 
                        flex items-center justify-center">
                        <User className="h-16 w-16" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 bg-green-500 text-black p-2 
                    rounded-full cursor-pointer hover:bg-green-600 transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {formData.foto && (
                  <button
                    onClick={removeImage}
                    className="text-sm text-red-400 hover:text-red-300 mb-4"
                  >
                    Remover foto
                  </button>
                )}

                <h3 className="text-2xl font-bold">{formData.nome}</h3>
                <p className="text-green-400 font-medium">{formData.cargo}</p>
                <p className="text-gray-400 text-sm mt-2">ID: {formData.id}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                  <Mail className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                  <Phone className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Telefone</p>
                    <p className="font-medium">{formData.telefone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                  <Calendar className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Membro desde</p>
                    <p className="font-medium">{formatDate(formData.dataCadastro)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                  <Globe className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Último acesso</p>
                    <p className="font-medium">{formatDateTime(formData.ultimoAcesso)}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-2">
            {activeTab === 'personal' && (
              <div className="space-y-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <User className="h-5 w-5 text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold">
                      <span className="text-green-400">I</span>NFORMAÇÕES PESSOAIS
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nome Completo <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Seu nome completo"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                            focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                            transition-all duration-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cargo
                        </label>
                        <input
                          type="text"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleChange}
                          placeholder="Seu cargo"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                            focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                            transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                            focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                            transition-all duration-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Telefone <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          placeholder="+244 123 456 789"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                            focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                            transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                          text-black font-bold rounded-xl hover:from-green-600 hover:to-emerald-700
                          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                          transform hover:scale-[1.02] active:scale-[0.98]
                          flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Salvando...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5" />
                            <span>Salvar Alterações</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Key className="h-5 w-5 text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold">
                      <span className="text-green-400">A</span>LTERAR SENHA
                    </h2>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Senha Atual <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="senhaAtual"
                            value={passwordData.senhaAtual}
                            onChange={handlePasswordChange}
                            placeholder="Digite sua senha atual"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                              focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                              transition-all duration-200 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                              hover:text-green-400"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nova Senha <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="novaSenha"
                            value={passwordData.novaSenha}
                            onChange={handlePasswordChange}
                            placeholder="Mínimo 6 caracteres"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                              focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                              transition-all duration-200 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                              hover:text-green-400"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirmar Nova Senha <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="password"
                          name="confirmarSenha"
                          value={passwordData.confirmarSenha}
                          onChange={handlePasswordChange}
                          placeholder="Digite novamente a nova senha"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                            focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                            transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-xl border border-green-500/20">
                      <p className="text-sm text-green-400 font-medium mb-2">
                        Requisitos da senha:
                      </p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${passwordData.novaSenha.length >= 6 ? 'bg-green-500' : 'bg-gray-600'}`} />
                          Mínimo 6 caracteres
                        </li>
                        <li className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${/[A-Z]/.test(passwordData.novaSenha) ? 'bg-green-500' : 'bg-gray-600'}`} />
                          Pelo menos uma letra maiúscula
                        </li>
                        <li className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${/\d/.test(passwordData.novaSenha) ? 'bg-green-500' : 'bg-gray-600'}`} />
                          Pelo menos um número
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                          text-black font-bold rounded-xl hover:from-green-600 hover:to-emerald-700
                          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                          transform hover:scale-[1.02] active:scale-[0.98]
                          flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Alterando...</span>
                          </>
                        ) : (
                          <>
                            <Key className="h-5 w-5" />
                            <span>Alterar Senha</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold">
                      <span className="text-green-400">S</span>EGURANÇA
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="font-medium">Verificação em duas etapas</p>
                        <p className="text-sm text-gray-400">Proteção adicional para sua conta</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-yellow-400">Não ativada</span>
                        <button className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg 
                          hover:bg-green-500/20 transition-colors">
                          Ativar
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="font-medium">Sessões ativas</p>
                        <p className="text-sm text-gray-400">Dispositivos conectados à sua conta</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg 
                        transition-colors">
                        Gerenciar
                      </button>
                    </div>

                    <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl">
                      <p className="font-medium text-red-400 mb-2">Zona de perigo</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Ações nesta seção não podem ser desfeitas
                      </p>
                      <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg 
                        hover:bg-red-500/30 transition-colors flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Encerrar todas as sessões
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Bell className="h-5 w-5 text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold">
                      <span className="text-green-400">N</span>OTIFICAÇÕES
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl 
                      hover:bg-gray-800 transition-colors cursor-pointer">
                      <div>
                        <p className="font-medium">Notificações por email</p>
                        <p className="text-sm text-gray-400">Receba atualizações importantes</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-all duration-300 relative
                        ${formData.notificacoes ? 'bg-green-500' : 'bg-gray-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300
                          ${formData.notificacoes ? 'left-7' : 'left-1'}`} />
                      </div>
                      <input
                        type="checkbox"
                        name="notificacoes"
                        checked={formData.notificacoes}
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl 
                      hover:bg-gray-800 transition-colors cursor-pointer">
                      <div>
                        <p className="font-medium">Modo escuro</p>
                        <p className="text-sm text-gray-400">Tema escuro para o painel</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-all duration-300 relative
                        ${formData.temaEscuro ? 'bg-green-500' : 'bg-gray-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300
                          ${formData.temaEscuro ? 'left-7' : 'left-1'}`} />
                      </div>
                      <input
                        type="checkbox"
                        name="temaEscuro"
                        checked={formData.temaEscuro}
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Idioma do painel
                        </label>
                        <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                          focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                          transition-all duration-200">
                          <option>Português (Brasil)</option>
                          <option>Português (Portugal)</option>
                          <option>English</option>
                          <option>Español</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Fuso horário
                        </label>
                        <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                          focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                          transition-all duration-200">
                          <option>Luanda (GMT+1)</option>
                          <option>Lisboa (GMT+0)</option>
                          <option>Londres (GMT+0)</option>
                          <option>Nova York (GMT-5)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800 flex justify-end">
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          notificacoes: true,
                          temaEscuro: true
                        });
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                        text-black font-bold rounded-xl hover:from-green-600 hover:to-emerald-700
                        transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                        flex items-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Salvar Preferências
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}