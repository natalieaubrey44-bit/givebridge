import React, { createContext, useContext, useState, useCallback } from 'react';

export type FlowKey = 'neilFlow' | 'liamFlow' | 'ariaFlow' | 'donationFlow' | 'supportFlow' | null;

interface ModalFlowContextType {
  activeFlow: FlowKey;
  currentStep: number;
  isOpen: boolean;
  flowData: any;
  openFlow: (flow: FlowKey, initialStep?: number, data?: any) => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

const ModalFlowContext = createContext<ModalFlowContextType | undefined>(undefined);

export const ModalFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeFlow, setActiveFlow] = useState<FlowKey>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [flowData, setFlowData] = useState<any>(null);

  const openFlow = useCallback((flow: FlowKey, initialStep = 0, data = null) => {
    setActiveFlow(flow);
    setCurrentStep(initialStep);
    setFlowData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Reset after some delay to avoid flicker during close animation if any
    setTimeout(() => {
      setActiveFlow(null);
      setCurrentStep(0);
      setFlowData(null);
    }, 300);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const setStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  return (
    <ModalFlowContext.Provider
      value={{
        activeFlow,
        currentStep,
        isOpen,
        flowData,
        openFlow,
        closeModal,
        nextStep,
        prevStep,
        setStep,
      }}
    >
      {children}
    </ModalFlowContext.Provider>
  );
};

export const useModalFlow = () => {
  const context = useContext(ModalFlowContext);
  if (context === undefined) {
    throw new Error('useModalFlow must be used within a ModalFlowProvider');
  }
  return context;
};
