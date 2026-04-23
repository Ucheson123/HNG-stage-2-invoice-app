import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Invoice } from '../types/index';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  updateInvoice: (updatedInvoice: Invoice) => void;
  filterStatuses: string[]; 
  toggleFilter: (status: string) => void;
  isFormOpen: boolean;
  editingInvoice: Invoice | null; 
  openForm: (invoice?: Invoice) => void; 
  closeForm: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // 1. Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('invoice-theme') as 'light' | 'dark') || 'light';
  });

  // 2. Invoice State
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('invoice-data');
    return saved ? JSON.parse(saved) : [];
  });

  // State to track active filters (e.g., ['paid', 'pending'])
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);

  // Function to add/remove a filter
  const toggleFilter = (status: string) => {
    setFilterStatuses((prev) => 
      prev.includes(status)
        ? prev.filter((s) => s !== status) 
        : [...prev, status]                
    );
  };

  // --- DRAWER LOGIC ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const openForm = (invoice?: Invoice) => {
    setEditingInvoice(invoice || null); // If we pass an invoice, save it. Otherwise, it's null.
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setTimeout(() => setEditingInvoice(null), 300); // Clears the data after the slide animation finishes
  };
  // -----------------------------------

  // 3. Sync Theme to CSS and LocalStorage
  useEffect(() => {
    localStorage.setItem('invoice-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 4. Sync Invoices to LocalStorage
  useEffect(() => {
    localStorage.setItem('invoice-data', JSON.stringify(invoices));
  }, [invoices]);

  // 5. CRUD Operations
  const addInvoice = (invoice: Invoice) => setInvoices((prev) => [invoice, ...prev]);
  const deleteInvoice = (id: string) => setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  const updateInvoice = (updatedInvoice: Invoice) => 
    setInvoices((prev) => prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)));

  // 6. Provide Everything
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <AppContext.Provider value={{ 
      theme, toggleTheme, invoices, addInvoice, deleteInvoice, updateInvoice, 
      filterStatuses, toggleFilter, isFormOpen, openForm, closeForm, editingInvoice
    }}>
      {children}
    </AppContext.Provider>
  );
};