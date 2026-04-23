import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import InvoiceCard from './InvoiceCard';

export default function Dashboard() {
  const { invoices, filterStatuses, toggleFilter, openForm } = useContext(AppContext);
  
  // Local state to control if the dropdown menu is open or closed
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // If no filters are selected, it shows all of them.
  const filteredInvoices = invoices.filter((invoice) => {
    if (filterStatuses.length === 0) return true;
    return filterStatuses.includes(invoice.status);
  });

  
  return (
    <div style={{ width: '100%', maxWidth: '730px', margin: '0 auto' }}>
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Invoices</h1>
          <p>{filteredInvoices.length === 0 ? 'No invoices' : `There are ${filteredInvoices.length} total invoices`}</p>
        </div>

        <div className="header-actions">
          
          {/* THE NEW FILTER DROPDOWN COMPONENT */}
          <div className="filter-container" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            Filter <span className="desktop-only">by status</span>
            <span style={{ color: 'var(--primary)', transform: isFilterOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
            
            {/* If isFilterOpen is true, render the menu! */}
            {isFilterOpen && (
              <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}> 
                {/* e.stopPropagation() prevents clicking inside the menu from instantly closing it */}
                
                {['draft', 'pending', 'paid'].map((status) => (
                  <label key={status} className="filter-option">
                    <input 
                      type="checkbox" 
                      checked={filterStatuses.includes(status)}
                      onChange={() => toggleFilter(status)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            )}
          </div>
          
          <button className="btn-new-invoice" onClick={() => openForm()}>
            <span className="icon-plus-wrapper">+</span>
            <span>New <span className="desktop-only" >Invoice</span></span>
          </button>
        </div>
      </header>

      <div>
        {filteredInvoices.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
            <h2>There is nothing here</h2>
          </div>
        ) : (
          filteredInvoices.map((inv) => (
            <InvoiceCard key={inv.id} invoice={inv} />
          ))
        )}
      </div>
    </div>
  );
}