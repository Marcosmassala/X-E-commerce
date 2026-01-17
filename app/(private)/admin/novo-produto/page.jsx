'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Footer from '@/components/Footer';

import {
  Upload,
  Package,
  DollarSign,
  Percent,
  Hash,
  Tag,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Camera,
  ArrowLeft,
  Scale,
  FileText,
  Star,
  Zap,
  Shield
} from 'lucide-react';

export default function CadastrarProdutoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categoriasSuplementos = [
    'Proteína',
    'Creatina',
    'Pré-treino',
    'BCAA',
    'Glutamina',
    'Vitaminas',
    'Termogênicos',
    'Aminoácidos',
    'Hipercalóricos',
    'Colágeno',
    'Ômega-3',
    'Multivitamínicos'
  ];

  const marcasSuplementos = [
    'Growth Supplements',
    'Integral Médica',
    'Max Titanium',
    'Probiotica',
    'Darkness',
    'New Millen',
    'Optimum Nutrition',
    'MuscleTech',
    'Dux Nutrition',
    'Adaptogen',
    'Natural One',
    'Outra'
  ];

  const saboresSuplementos = [
    'Chocolate',
    'Baunilha',
    'Morango',
    'Cookies & Cream',
    'Limão',
    'Frutas Vermelhas',
    'Café',
    'Natural',
    'Banana',
    'Coco'
  ];

  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    categoria: '',
    precoKz: '',
    precoOriginalKz: '',
    desconto: '',
    sku: '',
    peso: '',
    unidadeMedida: 'g',
    descricao: '',
    sabor: '',
    quantidadeEstoque: '',
    imagem: null,
    disponivel: true,
    destaque: false,
    emPromocao: false,
    garantia: '30',
    tempoEntrega: '2-5'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('A imagem deve ter menos de 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecione uma imagem válida');
      return;
    }

    setFormData((prev) => ({ ...prev, imagem: file }));
    setErrorMessage('');
  };

  const calcularPrecoComDesconto = () => {
    if (formData.precoKz && formData.desconto) {
      const preco = parseFloat(formData.precoKz);
      const desconto = parseFloat(formData.desconto);
      const precoFinal = (preco - (preco * desconto) / 100).toFixed(2);
      return new Intl.NumberFormat('pt-AO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(precoFinal);
    }
    return formData.precoKz;
  };

  const formatKz = (value) => {
    if (!value) return '0,00 Kz';
    return new Intl.NumberFormat('pt-AO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Validação
    if (!formData.nome.trim()) {
      setErrorMessage('O nome do produto é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!formData.categoria) {
      setErrorMessage('Selecione uma categoria');
      setIsLoading(false);
      return;
    }

    if (!formData.precoKz || parseFloat(formData.precoKz) <= 0) {
      setErrorMessage('Preço inválido');
      setIsLoading(false);
      return;
    }

    if (!formData.imagem) {
      setErrorMessage('Adicione uma imagem do produto');
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccessMessage('🎉 Produto cadastrado com sucesso! Redirecionando...');

      setTimeout(() => {
        router.push('/produtos');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao cadastrar produto');
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imagem: null }));
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
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="text-green-400">C</span>ADASTRAR PRODUTO
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Adicione novos suplementos premium ao seu catálogo
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Cadastro seguro</span>
              </div>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="font-bold">1</span>
              </div>
              <span className="text-sm font-medium">Informações</span>
            </div>
            <div className="h-px w-8 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                <span className="text-gray-400">2</span>
              </div>
              <span className="text-sm text-gray-400">Detalhes</span>
            </div>
            <div className="h-px w-8 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                <span className="text-gray-400">3</span>
              </div>
              <span className="text-sm text-gray-400">Finalizar</span>
            </div>
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
                <p className="text-sm text-red-400/80 mt-1">Verifique os campos e tente novamente</p>
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
                <p className="text-sm text-green-400/80 mt-1">Seu produto será listado em breve</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Grid principal */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna esquerda - Informações básicas */}
            <div className="lg:col-span-2 space-y-8">
              {/* Seção 1: Informações básicas */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Package className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold">
                    <span className="text-green-400">I</span>NFORMAÇÕES BÁSICAS
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome do Produto <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Ex: Creatina Monohidratada 300g"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                        focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                        transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Marca <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                        focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                        transition-all duration-200 appearance-none"
                      required
                    >
                      <option value="">Selecione uma marca</option>
                      {marcasSuplementos.map((m) => (
                        <option key={m} value={m} className="bg-gray-800">{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Categoria <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                        focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                        transition-all duration-200 appearance-none"
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categoriasSuplementos.map((c) => (
                        <option key={c} value={c} className="bg-gray-800">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sabor
                    </label>
                    <select
                      name="sabor"
                      value={formData.sabor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                        focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                        transition-all duration-200 appearance-none"
                    >
                      <option value="">Selecione um sabor</option>
                      {saboresSuplementos.map((s) => (
                        <option key={s} value={s} className="bg-gray-800">{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Descrição <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      placeholder="Descreva os benefícios, modo de uso e características do produto..."
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                        focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                        transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Seção 2: Preço e estoque */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold">
                    <span className="text-green-400">P</span>REÇO E ESTOQUE
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preço (Kz) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        Kz
                      </div>
                      <input
                        type="number"
                        name="precoKz"
                        value={formData.precoKz}
                        onChange={handleChange}
                        placeholder="0,00"
                        min="0"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                          focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                          transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Desconto (%)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        %
                      </div>
                      <input
                        type="number"
                        name="desconto"
                        value={formData.desconto}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        max="100"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                          focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                          transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preço com Desconto
                    </label>
                    <div className="px-4 py-3 bg-gray-800 border border-green-500/30 rounded-xl
                      text-green-400 font-bold text-lg">
                      {calcularPrecoComDesconto() || '0,00'} Kz
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quantidade em Estoque
                    </label>
                    <input
                      type="number"
                      name="quantidadeEstoque"
                      value={formData.quantidadeEstoque}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                        focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                        transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Peso
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        placeholder="300"
                        min="0"
                        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                          focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                          transition-all duration-200"
                      />
                      <select
                        name="unidadeMedida"
                        value={formData.unidadeMedida}
                        onChange={handleChange}
                        className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                          focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                          transition-all duration-200"
                      >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="L">L</option>
                        <option value="un">un</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SKU (Código)
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="EX: CRET-300G-MAX"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
                        focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none
                        transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna direita - Imagem e opções */}
            <div className="space-y-8">
              {/* Upload de imagem */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Camera className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold">
                    <span className="text-green-400">I</span>MAGEM
                  </h2>
                </div>

                <div className="text-center">
                  {formData.imagem ? (
                    <div className="space-y-4">
                      <div className="relative h-64 w-full rounded-xl overflow-hidden border-2 border-green-500/30">
                        <Image
                          src={URL.createObjectURL(formData.imagem)}
                          alt="Preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 384px"
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400 truncate">
                          {formData.imagem.name}
                        </span>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-3 py-1 text-sm text-red-400 hover:text-red-300 
                            hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer group">
                      <div className="border-2 border-dashed border-gray-700 rounded-xl p-8
                        hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300">
                        <div className="p-4 bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4
                          group-hover:bg-green-500/10 transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 group-hover:text-green-400" />
                        </div>
                        <p className="font-medium mb-2">Clique para upload</p>
                        <p className="text-sm text-gray-400">
                          PNG, JPG até 5MB
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Recomendado: 800×800px
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Opções */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Zap className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold">
                    <span className="text-green-400">O</span>PÇÕES
                  </h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl
                    hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center
                        ${formData.destaque ? 'bg-green-500 border-green-500' : 'border-gray-600'}`}>
                        {formData.destaque && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <span className="font-medium">Produto em Destaque</span>
                        <p className="text-sm text-gray-400">Aparecer na homepage</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      name="destaque"
                      checked={formData.destaque}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl
                    hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center
                        ${formData.emPromocao ? 'bg-green-500 border-green-500' : 'border-gray-600'}`}>
                        {formData.emPromocao && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <span className="font-medium">Em Promoção</span>
                        <p className="text-sm text-gray-400">Mostrar badge de desconto</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      name="emPromocao"
                      checked={formData.emPromocao}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl
                    hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center
                        ${formData.disponivel ? 'bg-green-500 border-green-500' : 'border-red-500'}`}>
                        {formData.disponivel ? 
                          <CheckCircle2 className="h-3 w-3 text-white" /> : 
                          <AlertCircle className="h-3 w-3 text-white" />
                        }
                      </div>
                      <div>
                        <span className="font-medium">Disponível</span>
                        <p className="text-sm text-gray-400">Visível para clientes</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      name="disponivel"
                      checked={formData.disponivel}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Pré-visualização do preço */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/20 
                rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-green-400">Pré-visualização</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Preço Original:</span>
                    <span className="text-lg font-bold">{formatKz(formData.precoKz)}</span>
                  </div>
                  {formData.desconto && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Desconto:</span>
                      <span className="text-red-400 font-bold">{formData.desconto}%</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Preço Final:</span>
                      <span className="text-2xl font-bold text-green-400">
                        {calcularPrecoComDesconto() || '0,00'} Kz
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="sticky bottom-6 bg-black/80 backdrop-blur-sm rounded-2xl p-4 
            border border-gray-800 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-700 rounded-xl hover:bg-gray-800
                  transition-colors duration-200 w-full sm:w-auto"
              >
                Cancelar
              </button>
              
              <div className="flex gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      nome: '',
                      marca: '',
                      categoria: '',
                      precoKz: '',
                      precoOriginalKz: '',
                      desconto: '',
                      sku: '',
                      peso: '',
                      unidadeMedida: 'g',
                      descricao: '',
                      sabor: '',
                      quantidadeEstoque: '',
                      imagem: null,
                      disponivel: true,
                      destaque: false,
                      emPromocao: false,
                      garantia: '30',
                      tempoEntrega: '2-5'
                    });
                    setErrorMessage('');
                  }}
                  className="px-6 py-3 border border-gray-700 rounded-xl hover:bg-gray-800
                    transition-colors duration-200 w-full sm:w-auto"
                >
                  Limpar Formulário
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                    text-black font-bold rounded-xl hover:from-green-600 hover:to-emerald-700
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                    transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto
                    flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Cadastrando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Cadastrar Produto</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}