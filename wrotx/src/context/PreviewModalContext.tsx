import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface PreviewModalContextType {
  isOpen: boolean;
  defaultType: 'website' | 'voice';
  openPreviewModal: (type?: 'website' | 'voice') => void;
  closePreviewModal: () => void;
}

const PreviewModalContext = createContext<PreviewModalContextType | undefined>(undefined);

export const PreviewModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultType, setDefaultType] = useState<'website' | 'voice'>('website');

  const openPreviewModal = useCallback((type?: 'website' | 'voice') => {
    if (type) {
      setDefaultType(type);
    }
    setIsOpen(true);
  }, []);

  const closePreviewModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <PreviewModalContext.Provider value={{ isOpen, defaultType, openPreviewModal, closePreviewModal }}>
      {children}
    </PreviewModalContext.Provider>
  );
};

export const usePreviewModal = (): PreviewModalContextType => {
  const context = useContext(PreviewModalContext);
  if (!context) {
    throw new Error('usePreviewModal must be used within a PreviewModalProvider');
  }
  return context;
};
