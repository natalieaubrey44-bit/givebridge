import React, { useEffect } from 'react';
import { useModalFlow } from '../hooks/useModalFlow';
import { FlowRenderer } from './FlowRenderer';
import { X } from 'lucide-react';
import { flows } from '../config/flowsConfig';
import { motion, AnimatePresence } from 'motion/react';

export const GlobalModal: React.FC = () => {
  const { isOpen, closeModal, activeFlow, currentStep } = useModalFlow();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !activeFlow) return null;

  const currentStepData = flows[activeFlow]?.[currentStep];
  const isWide = currentStepData?.wide || false;

  return (
    <div 
      className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-4" 
      onClick={closeModal}
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
      />
      
      {/* Modal Container */}
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          maxWidth: isWide ? '900px' : '512px' 
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 flex w-full max-h-[calc(100dvh-1.5rem)] min-w-0 flex-col overflow-hidden rounded-[40px] border-4 border-white bg-brand-cream p-1 shadow-[0_32px_120px_rgba(0,0,0,0.3)] sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[48px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-brand-cream relative flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[36px] p-3 sm:rounded-[44px] sm:p-5">
          {/* Abstract subtle background gradient */}
          <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-brand-lime/20 via-brand-lime/5 to-transparent pointer-events-none" />
          
          {/* Close button */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 size-8 flex items-center justify-center rounded-full border-2 border-black/5 bg-white text-black hover:bg-black hover:text-white transition-all shadow-sm active:scale-90 sm:top-6 sm:right-6 sm:size-9"
          >
            <X size={14} className="sm:size-4" />
          </button>

          <div className="relative z-10 min-w-0">
            <FlowRenderer />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
