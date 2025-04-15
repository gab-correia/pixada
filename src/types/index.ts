// src/types/index.ts
export interface Donator {
    id: number;
    name: string;
    amount: number;
    timestamp?: string;
  }
  
  export interface BlockProps {
    id: number;
    color: string;
    top: number;
    left: number;
    number: number;
    animate?: boolean;
  }