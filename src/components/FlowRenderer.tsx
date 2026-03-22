import React from 'react';
import { useModalFlow } from '../hooks/useModalFlow';
import { flows } from '../config/flowsConfig';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- StepWrapper ---
// This component wraps each step to ensure consistent layout/animation if needed
const StepWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {children}
    </div>
  );
};

// --- FlowRenderer ---
export const FlowRenderer: React.FC = () => {
  const { activeFlow, currentStep, closeModal, nextStep, prevStep, flowData } = useModalFlow();

  if (!activeFlow) return null;

  const flowSteps = flows[activeFlow];
  const step = flowSteps[currentStep];

  if (!step) return null;

  const isFirst = currentStep === 0;
  const isLast = currentStep === flowSteps.length - 1;

  const stepProps = {
    currentStep,
    totalSteps: flowSteps.length,
    onClose: closeModal,
    onNext: nextStep,
    onBack: prevStep,
    isFirst,
    isLast,
    flowData,
  };

  // If the step provides its own render function
  if ('render' in step) {
    return (
      <StepWrapper>
        {step.render(stepProps)}
      </StepWrapper>
    );
  }

  const { title, subtitle, content, nextLabel } = step as any;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${activeFlow}-${currentStep}`}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col h-full"
      >
        <StepWrapper>
          <div className="flex flex-col h-full">
            {/* Step Header */}
            <div className="relative pb-6 border-b border-black/5 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-black/60 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                  Progress: {Math.round(((currentStep + 1) / flowSteps.length) * 100)}%
                  <span className="mx-2 text-black/20">|</span>
                  Page {currentStep + 1} of {flowSteps.length}
                </div>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-black leading-tight">
                {title}
              </h3>
              {subtitle && <p className="text-[10px] font-black text-black/40 mt-1 uppercase tracking-widest leading-relaxed">{subtitle}</p>}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-h-[200px]">
              {content}
            </div>

            {/* Step Footer */}
            <div className="mt-10 pt-6 border-t border-black/10 flex items-center justify-between gap-4">
              <div className="flex gap-3">
                {!isFirst && (
                  <button
                    onClick={prevStep}
                    className="flex items-center justify-center gap-2 border-2 border-black/10 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-black/50 hover:border-black hover:text-black transition-all active:scale-95"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
              </div>
              
              <button
                onClick={nextStep}
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg group border-2 border-black active:scale-95"
              >
                 {isLast ? "Complete" : (nextLabel || "Next Step")}
                 {!isLast && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>
        </StepWrapper>
      </motion.div>
    </AnimatePresence>
  );
};
