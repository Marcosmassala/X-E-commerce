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
  ArrowLeft
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
    emPromocao: false
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

    setFormData((prev) => ({ ...prev, imagem: file }));
  };

  const calcularPrecoComDesconto = () => {
    if (formData.precoKz && formData.desconto) {
      const preco = parseFloat(formData.precoKz);
      const desconto = parseFloat(formData.desconto);
      return (preco - (preco * desconto) / 100).toFixed(2);
    }
    return formData.precoKz;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (!formData.nome || !formData.categoria || !formData.precoKz) {
        throw new Error('Preencha os campos obrigatórios');
      }

      if (parseFloat(formData.precoKz) <= 0) {
        throw new Error('O preço deve ser maior que zero');
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage('Produto cadastrado com sucesso!');

      setTimeout(() => {
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
          emPromocao: false
        });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao cadastrar produto');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Cadastrar Produto</h1>
            <p className="text-gray-400 mt-1">
              Adicione novos suplementos ao catálogo
            </p>
          </div>
          <button
            onClick={() => router.push('/produtos')}
            className="flex items-center px-5 py-2.5 border border-gray-700 rounded-xl hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>
        </div>

        {/* Mensagens */}
        {errorMessage && (
          <div className="mb-6 p-4 border border-red-700/50 rounded-xl bg-red-900/20">
            <div className="flex items-center text-red-300">
              <AlertCircle className="h-5 w-5 mr-2" />
              {errorMessage}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 border border-green-700/50 rounded-xl bg-green-900/20">
            <div className="flex items-center text-green-300">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              {successMessage}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="flex items-center text-xl font-semibold mb-6">
              <Package className="h-5 w-5 text-green-400 mr-2" />
              Informações do Produto
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome do produto"
                className="input"
                required
              />

              <select
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="input"
              >
                <option value="">Selecione a marca</option>
                {marcasSuplementos.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Imagem */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="flex items-center text-xl font-semibold mb-6">
              <Camera className="h-5 w-5 text-green-400 mr-2" />
              Imagem do Produto
            </h2>

            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              {formData.imagem ? (
                <div>
                  <div className="relative mx-auto h-48 w-48">
                    <div className="relative mx-auto h-48 w-48">
                     <Image
                     src={URL.createObjectURL(formData.imagem)}
                     alt="Preview"
                     fill
                     sizes="192px"
                     className="object-contain rounded-lg border border-gray-700"
                     unoptimized
                    />
                  </div>

                  </div>
                  <p className="mt-4 text-sm">{formData.imagem.name}</p>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                  <label className="cursor-pointer bg-green-500 text-black px-6 py-3 rounded-lg">
                    Selecionar Imagem
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center bg-green-500 text-black px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Cadastrar Produto
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
