"use client";

import { useState } from 'react';
import ResumoPedido from './resumo-pedido';
import ListaItens from './lista-itens';
import Navbar from '../../../components/Navbar';

export default function Carrinho() {
  const [itens, setItens] = useState([
    {
      id: 1,
      nome: "Whey Protein 100% Pure - 2kg",
      marca: "ProteMax",
      sabor: "Chocolate",
      preco: 25000,
      quantidade: 1,
      imagem: "/images/whey-protein.jpg",
      estoque: 10
    },
    {
      id: 2,
      nome: "Creatina Monohidratada - 300g",
      marca: "CreatineKing",
      sabor: "Neutro",
      preco: 15000,
      quantidade: 2,
      imagem: "/images/creatina.jpg",
      estoque: 15
    },
    {
      id: 3,
      nome: "BCAA 2:1:1 - 300g",
      marca: "AminoForce",
      sabor: "Limão",
      preco: 12000,
      quantidade: 1,
      imagem: "/images/bcaa.jpg",
      estoque: 8
    }
  ]);

  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    
    setItens(itens.map(item => 
      item.id === id 
        ? { ...item, quantidade: Math.min(novaQuantidade, item.estoque) }
        : item
    ));
  };

  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const calcularSubtotal = () => {
    return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coluna Principal - Itens do Carrinho */}
            <div className="lg:col-span-2">
              <ListaItens 
                itens={itens} 
                onAtualizarQuantidade={atualizarQuantidade}
                onRemoverItem={removerItem}
              />
            </div>

            {/* Sidebar - Resumo do Pedido */}
            <div className="lg:col-span-1">
              <ResumoPedido 
                itens={itens}
                subtotal={calcularSubtotal()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}