"use client";
import { useState } from "react";

export default function AjudaContent() {
  const faqs = [
    {
      pergunta: "Como rastrear meu pedido?",
      resposta: "Você pode rastrear seu pedido na aba 'Meus Pedidos' clicando em 'Ver Detalhes' no pedido desejado."
    },
    {
      pergunta: "Qual o prazo de entrega?",
      resposta: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização."
    },
    {
      pergunta: "Como devolver um produto?",
      resposta: "Entre em contato com nosso suporte em até 7 dias após o recebimento para solicitar a devolução."
    },
    {
      pergunta: "Quais formas de pagamento aceitamos?",
      resposta: "Aceitamos cartões de crédito, débito, PIX e boleto bancário."
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Central de Ajuda</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Encontre respostas para suas dúvidas ou entre em contato com nosso suporte
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.pergunta}</span>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {expandedIndex === index && (
                <div className="p-4 pt-0">
                  <p className="text-gray-600">{faq.resposta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contato */}
      <div className="max-w-3xl mx-auto bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">📧 E-mail</h3>
            <p className="text-gray-600">suporte@suplementos.com</p>
            <p className="text-sm text-gray-500">Respondemos em até 24h</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">📞 Telefone</h3>
            <p className="text-gray-600">(11) 9999-9999</p>
            <p className="text-sm text-gray-500">Segunda a sexta, 9h às 18h</p>
          </div>
        </div>
      </div>

      {/* Chat ao vivo (simulado) */}
      <div className="max-w-3xl mx-auto text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          Iniciar Chat ao Vivo
        </button>
        <p className="text-sm text-gray-500 mt-2">Disponível de segunda a sexta, 9h às 18h</p>
      </div>
    </div>
  );
}