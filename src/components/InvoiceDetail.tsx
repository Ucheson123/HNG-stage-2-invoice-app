import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext, useState, useEffect } from 'react';

export default function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { invoices, updateInvoice, deleteInvoice, openForm } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="main-content" style={{ flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}>
        <h2>Invoice not found</h2>
        <Link to="/" style={{ color: 'var(--primary)', marginTop: '1rem' }}>Go back home</Link>
      </div>
    );
  }

  const handleMarkAsPaid = () => {
    updateInvoice({ ...invoice, status: 'paid' });
  };

  const handleConfirmDelete = () => {
    deleteInvoice(invoice.id);
    navigate('/');
  };

  return (
    <div className="invoice-detail-container" style={{ width: '100%', maxWidth: '730px', margin: '0 auto' }}>
      
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', display: 'inline-block', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--primary)', marginRight: '1rem' }}>{'<'}</span> Go back
      </Link>

      <header className="invoice-card" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', cursor: 'default' }}>
        <div className="status-container">
          <span style={{ color: 'var(--text-muted)' }}>Status</span>
          <div className={`status-badge ${invoice.status}`}>
            <div className="status-dot"></div>
            {invoice.status}
          </div>
        </div>

        <div className="detail-actions">
          <button onClick={() => openForm(invoice)} className="action-btn btn-edit">Edit</button>
          <button onClick={() => setIsModalOpen(true)} className="action-btn btn-delete">Delete</button>
          {invoice.status !== 'paid' && (
            <button onClick={handleMarkAsPaid} className="action-btn btn-paid">Mark as Paid</button>
          )}
        </div>
      </header>

      <div className="paper-bill">
        
        <div className="bill-top">
          <div>
            <h2 className="invoice-id" style={{ marginBottom: '0.5rem' }}><span>#</span>{invoice.id}</h2>
            <p className="bill-label">{invoice.description}</p>
          </div>
          <div className="bill-sender-address">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="bill-middle">
          <div className="bill-dates">
            <div>
              <p className="bill-label" style={{ marginBottom: '0.75rem' }}>Invoice Date</p>
              <p className="bill-value">{invoice.createdAt}</p>
            </div>
            <div>
              <p className="bill-label" style={{ marginBottom: '0.75rem' }}>Payment Due</p>
              <p className="bill-value">{invoice.paymentDue}</p>
            </div>
          </div>
          <div className="bill-client">
            <p className="bill-label" style={{ marginBottom: '0.75rem' }}>Bill To</p>
            <p className="bill-value">{invoice.clientName}</p>
            <div className="bill-client-address">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>
          <div className="bill-email">
            <p className="bill-label" style={{ marginBottom: '0.75rem' }}>Sent to</p>
            <p className="bill-value">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="bill-items-wrapper">
          <div className="bill-items-header">
             <p>Item Name</p>
             <p className="col-qty">QTY.</p>
             <p className="col-price">Price</p>
             <p className="col-total">Total</p>
          </div>
          
          {invoice.items.map((item, index) => (
             <div className="bill-item-row" key={index}>
                <div className="mobile-item-details">
                   <p className="bill-value">{item.name}</p>
                   <p className="bill-label" style={{ fontWeight: 'bold' }}>{item.quantity} x £{item.price.toFixed(2)}</p>
                </div>
                
                <p className="bill-value desktop-item-column">{item.name}</p>
                <p className="desktop-item-column col-qty" style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>{item.quantity}</p>
                <p className="desktop-item-column col-price" style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>£{item.price.toFixed(2)}</p>
                <p className="bill-value col-total">£{item.total.toFixed(2)}</p>
             </div>
          ))}
        </div>

        <div className="bill-total-footer">
          <p style={{ fontSize: '0.8125rem' }}>Amount Due</p>
          <h2 style={{ fontSize: '1.5rem' }}>£{invoice.total.toFixed(2)}</h2>
        </div>

      </div>
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Deletion</h2>
            <p>
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)} className="action-btn btn-edit">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="action-btn btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}