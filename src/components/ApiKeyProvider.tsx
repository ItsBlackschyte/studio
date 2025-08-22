
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ApiKeyDialog from './ApiKeyDialog';

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  openDialog: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, openDialog }}>
      {children}
      <ApiKeyDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSave={handleSaveApiKey}
      />
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}
