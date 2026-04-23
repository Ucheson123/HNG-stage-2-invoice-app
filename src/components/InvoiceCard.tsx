import { Link } from 'react-router-dom';
import type { Invoice } from '../types';

interface InvoiceCardProps {
  invoice: Invoice;
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    // React Router Link changes the URL to /invoice/RT3080 when clicked
    <Link to={`/invoice/${invoice.id}`} className="invoice-card">
      
      <span className="invoice-id"><span>#</span>{invoice.id}</span>
      <span className="invoice-date">Due {invoice.paymentDue}</span>
      <span className="invoice-name">{invoice.clientName}</span>
      <span className="invoice-total">£{invoice.total.toFixed(2)}</span>
      
      {/* The Status Badge dynamically assigns classes based on the invoice.status */}
      <div className={`status-badge ${invoice.status}`}>
        <div className="status-dot"></div>
        {invoice.status}
      </div>

      {/* The little purple arrow from the design */}
      <span className="invoice-arrow">{'>'}</span>
      
    </Link>
  );
}