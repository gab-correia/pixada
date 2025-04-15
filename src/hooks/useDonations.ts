// src/hooks/useDonations.ts
import { useState, useEffect } from 'react';
import { Donator } from '../types';

const useDonations = (initialDonations: Donator[] = []) => {
  const [donations, setDonations] = useState<Donator[]>(initialDonations);
  
  // Adicionar nova doação
  const addDonation = (name: string, amount: number): Donator => {
    const newDonation: Donator = {
      id: Date.now(),
      name: name || 'Anônimo',
      amount: parseFloat(amount.toString()),
      timestamp: new Date().toISOString()
    };
    
    setDonations(prev => [...prev, newDonation]);
    
    // Salvar no localStorage para persistência
    localStorage.setItem('donations', JSON.stringify([...donations, newDonation]));
    
    return newDonation;
  };
  
  // Carregar doações do localStorage
  useEffect(() => {
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      try {
        setDonations(JSON.parse(savedDonations));
      } catch (error) {
        console.error('Erro ao carregar doações:', error);
      }
    }
  }, []);
  
  return {
    donations,
    addDonation
  };
};

export default useDonations;