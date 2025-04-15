// src/componentes/MovingBlocks/index.tsx
import { useState, useEffect } from 'react';
import { BlockProps } from '../../types';
import './styles.css';

interface MovingBlocksProps {
  movementAmount: number;
}

const MovingBlocks = ({ movementAmount }: MovingBlocksProps) => {
  const [blocks, setBlocks] = useState<BlockProps[]>([]);
  
  // Cores disponíveis para os blocos
  const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63'];
  
  // Gerar blocos iniciais
  useEffect(() => {
    const initialBlocks: BlockProps[] = [];
    
    // Criar 50 blocos com posições aleatórias
    for (let i = 0; i < 50; i++) {
      initialBlocks.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        number: Math.floor(Math.random() * 5) + 1,
        animate: false
      });
    }
    
    setBlocks(initialBlocks);
  }, []);
  
  // Atualizar blocos quando houver movimento
  useEffect(() => {
    if (movementAmount <= 0) return;
    
    // Quantidade de blocos a animar baseada no valor da doação
    const blocksToAnimate = Math.min(Math.floor(movementAmount / 10), blocks.length);
    
    // Atualizar blocos com novas posições
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      
      // Embaralhar array para pegar blocos aleatórios
      for (let i = newBlocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newBlocks[i], newBlocks[j]] = [newBlocks[j], newBlocks[i]];
      }
      
      // Animar os blocos selecionados
      for (let i = 0; i < blocksToAnimate; i++) {
        newBlocks[i] = {
          ...newBlocks[i],
          top: Math.random() * 100,
          left: Math.random() * 100,
          animate: true
        };
      }
      
      return newBlocks;
    });
    
    // Resetar animação após um tempo
    const timer = setTimeout(() => {
      setBlocks(prevBlocks => 
        prevBlocks.map(block => ({
          ...block,
          animate: false
        }))
      );
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [movementAmount, blocks.length]);
  
  return (
    <div className="moving-blocks-container">
      {blocks.map(block => (
        <div
          key={block.id}
          className={`block ${block.animate ? 'animate' : ''}`}
          style={{
            backgroundColor: block.color,
            top: `${block.top}%`,
            left: `${block.left}%`,
            transform: `scale(${block.number * 0.3})`,
            transition: block.animate ? 'all 2s ease-in-out' : 'none'
          }}
        />
      ))}
    </div>
  );
};

export default MovingBlocks;