import { createContext, useCallback, useContext, useState } from 'react';
import ConfirmationDialog from '@/components/Dialogs/ConfirmationDialog';

type ConfirmationDialogContextType = {
  confirm: () => Promise<boolean>;
};

const ConfirmationDialogContext = createContext<ConfirmationDialogContextType | undefined>(undefined);

export function ConfirmationDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [promiseDecision, setPromiseDecision] = useState<{ resolve: (value: boolean) => void, reject: (reason?: any) => void } | null>(null);

  const confirm = useCallback((): Promise<boolean> => {
    setIsOpen(true);
    return new Promise<boolean>((resolve, reject) => {
      setPromiseDecision({ resolve, reject });
    });
  }, []);

  const handleResolve = (value: boolean) => {
    promiseDecision?.resolve(value);
    setIsOpen(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ confirm }}>
      {children}
      <ConfirmationDialog
        isOpen={isOpen}
        promiseDecision={{
          resolve: handleResolve,
          reject: promiseDecision?.reject ?? (() => {}),
        }}
        setIsOpen={setIsOpen}
      />
    </ConfirmationDialogContext.Provider>
  );
}

export function useConfirmationDialog() {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error('useConfirmationDialog must be used within a ConfirmationDialogProvider');
  }
  return context.confirm;
}
