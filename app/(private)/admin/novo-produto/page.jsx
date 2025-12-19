'use client';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Package,
  DollarSign,
  Percent,
  Hash,
  Scale,
  Tag,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Camera,
  ArrowLeft
} from 'lucide-react';
import SiteFooter from '@/components/Footer'; 

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
    beneficios: '',
    modoUso: '',
    ingredientes: '',
    sabor: '',
    quantidadeEstoque: '',
    imagem: null,
    disponivel: true,
    destaque: false,
    emPromocao: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('A imagem deve ter menos de 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, imagem: file }));
    }
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

      if (formData.precoKz && parseFloat(formData.precoKz) <= 0) {
        throw new Error('O preço deve ser maior que zero');
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

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
          beneficios: '',
          modoUso: '',
          ingredientes: '',
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

  const calcularPrecoComDesconto = () => {
    if (formData.precoKz && formData.desconto) {
      const preco = parseFloat(formData.precoKz);
      const desconto = parseFloat(formData.desconto);
      return (preco - (preco * desconto / 100)).toFixed(2);
    }
    return formData.precoKz;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Cadastrar Produto</h1>
                <p className="text-gray-400 mt-2">
                  Adicione novos suplementos ao seu catálogo - GymShop Angola
                </p>
              </div>
              <button
                onClick={() => router.push('/produtos')}
                className="px-5 py-2.5 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-colors flex items-center self-start sm:self-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Produtos
              </button>
            </div>
            
          </div>

          {/* Mensagens de status */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-900/20 to-black border border-red-700/50 rounded-xl">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-300">{errorMessage}</span>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-900/20 to-black border border-green-700/50 rounded-xl">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-300">{successMessage}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <div className="p-2 bg-green-500/20 rounded-lg mr-3">
                  <Package className="h-5 w-5 text-green-400" />
                </div>
                Informações Básicas do Produto
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome do Produto */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome do Produto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                    placeholder="Ex: Whey Protein Concentrado 1kg"
                    required
                  />
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Marca
                  </label>
                  <select
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                  >
                    <option value="" className="bg-black">Selecione uma marca</option>
                    {marcasSuplementos.map(marca => (
                      <option key={marca} value={marca} className="bg-black">{marca}</option>
                    ))}
                  </select>
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Categoria <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                    required
                  >
                    <option value="" className="bg-black">Selecione uma categoria</option>
                    {categoriasSuplementos.map(categoria => (
                      <option key={categoria} value={categoria} className="bg-black">{categoria}</option>
                    ))}
                  </select>
                </div>

                {/* Sabor */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sabor (Opcional)
                  </label>
                  <input
                    type="text"
                    name="sabor"
                    value={formData.sabor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                    placeholder="Ex: Chocolate, Baunilha, Morango"
                  />
                </div>
              </div>
            </div>

            {/* Preços e Estoque */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <div className="p-2 bg-green-500/20 rounded-lg mr-3">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
                Preços e Estoque
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Preço em Kz */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preço (Kz) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-green-400 font-bold">Kz</span>
                    </div>
                    <input
                      type="number"
                      name="precoKz"
                      value={formData.precoKz}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Desconto */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Desconto (%)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Percent className="h-4 w-4 text-green-400" />
                    </div>
                    <input
                      type="number"
                      name="desconto"
                      value={formData.desconto}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                  {formData.desconto && (
                    <div className="mt-2 p-2 bg-green-900/30 border border-green-700/50 rounded-lg">
                      <p className="text-sm font-medium text-green-300">
                        Preço final: <span className="text-white">Kz {calcularPrecoComDesconto()}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Estoque */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quantidade em Estoque <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-4 w-4 text-green-400" />
                    </div>
                    <input
                      type="number"
                      name="quantidadeEstoque"
                      value={formData.quantidadeEstoque}
                      onChange={handleChange}
                      min="0"
                      className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Peso/Medida */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Peso/Quantidade
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      name="peso"
                      value={formData.peso}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      className="flex-1 px-4 py-3 bg-black border border-gray-700 text-white rounded-l-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                      placeholder="Ex: 1000"
                    />
                    <select
                      name="unidadeMedida"
                      value={formData.unidadeMedida}
                      onChange={handleChange}
                      className="px-4 py-3 bg-black border border-l-0 border-gray-700 text-white rounded-r-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                    >
                      <option value="g" className="bg-black">g</option>
                      <option value="kg" className="bg-black">kg</option>
                      <option value="mg" className="bg-black">mg</option>
                      <option value="ml" className="bg-black">ml</option>
                      <option value="L" className="bg-black">L</option>
                      <option value="un" className="bg-black">un</option>
                    </select>
                  </div>
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    SKU (Código do Produto)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-4 w-4 text-green-400" />
                    </div>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                      placeholder="Ex: WHEY-PROT-001"
                    />
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="mt-6 flex flex-wrap gap-6">
                <label className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="disponivel"
                      checked={formData.disponivel}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </div>
                  <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">Disponível para venda</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="destaque"
                      checked={formData.destaque}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </div>
                  <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">Produto em Destaque</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="emPromocao"
                      checked={formData.emPromocao}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </div>
                  <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">Em Promoção</span>
                </label>
              </div>
            </div>

            {/* Imagem do Produto */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <div className="p-2 bg-green-500/20 rounded-lg mr-3">
                  <Camera className="h-5 w-5 text-green-400" />
                </div>
                Imagem do Produto
              </h2>
              
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-8 hover:border-green-500/50 transition-all duration-300 bg-black/50">
                {formData.imagem ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(formData.imagem)}
                      alt="Preview"
                      className="mx-auto h-48 w-48 object-contain rounded-lg border border-gray-700"
                    />
                    <p className="mt-4 text-sm text-gray-300">
                      {formData.imagem.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imagem: null }))}
                      className="mt-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      Remover imagem
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-400 mb-2 text-center">Arraste e solte ou clique para fazer upload</p>
                    <p className="text-gray-500 text-sm mb-4 text-center">
                      PNG, JPG, WEBP até 5MB. Recomendado: 800x800px
                    </p>
                    <label className="px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 cursor-pointer transition-all duration-200 font-medium">
                      <span>Selecionar Imagem</span>
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

            {/* Descrição e Detalhes */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Descrição e Detalhes do Produto
              </h2>
              
              <div className="space-y-6">
               
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição do Produto <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
                    placeholder="Descreva o produto de forma atrativa para os clientes..."
                    required
                  />
                </div>
                
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-800">
              <button
                type="button"
                onClick={() => router.push('/produtos')}
                className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cadastrando...
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
      </div>
      
      
      <Footer />
    </div>
  );
}