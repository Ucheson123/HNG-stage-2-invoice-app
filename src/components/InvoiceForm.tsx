import { useContext, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { AppContext } from '../context/AppContext';
import type { Invoice } from '../types';

export default function InvoiceForm() {
  const { isFormOpen, closeForm, addInvoice, updateInvoice, editingInvoice } = useContext(AppContext);

  const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm<Invoice>({
    defaultValues: {
      items: [{ name: '', quantity: 1, price: 0, total: 0 }] 
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchItems = watch("items");

  useEffect(() => {
    if (editingInvoice) {
      reset(editingInvoice);
    } else {
      reset({
        senderAddress: { street: '', city: '', postCode: '', country: '' },
        clientName: '', clientEmail: '',
        clientAddress: { street: '', city: '', postCode: '', country: '' },
        createdAt: '', paymentTerms: 1, description: '',
        items: [{ name: '', quantity: 1, price: 0, total: 0 }]
      });
    }
  }, [editingInvoice, reset, isFormOpen]);

  const onSubmit = (data: Invoice) => {
    const processedItems = data.items.map(item => ({
      ...item,
      quantity: Number(item.quantity),
      price: Number(item.price),
      total: Number(item.quantity) * Number(item.price)
    }));

    const grandTotal = processedItems.reduce((sum, item) => sum + item.total, 0);

    const calculatedDate = new Date(data.createdAt);
    calculatedDate.setDate(calculatedDate.getDate() + Number(data.paymentTerms));
    const formattedPaymentDue = calculatedDate.toISOString().split('T')[0]; 

    const finalInvoice: Invoice = {
      ...data,
      id: editingInvoice ? editingInvoice.id : `RT${Math.floor(1000 + Math.random() * 9000)}`,
      status: editingInvoice ? editingInvoice.status : 'pending',
      paymentDue: formattedPaymentDue, 
      items: processedItems,
      total: grandTotal
    };

    if (editingInvoice) {
      updateInvoice(finalInvoice); 
    } else {
      addInvoice(finalInvoice);    
    }
    
    closeForm(); 
  };
  
  return (
    <>
      <div className={`form-overlay ${isFormOpen ? 'open' : ''}`} onClick={closeForm} />

      <div className={`form-drawer ${isFormOpen ? 'open' : ''}`}>
        
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
          {editingInvoice ? (
            <>Edit <span style={{ color: 'var(--text-muted)' }}>#</span>{editingInvoice.id}</>
          ) : (
            'New Invoice'
          )}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <h4 className="form-section-title">Bill From</h4>
          <div className="input-group">
            <label>Street Address</label>
            <input type="text" className={`input-field ${errors.senderAddress?.street ? 'error' : ''}`} {...register('senderAddress.street', { required: true })} />
          </div>
          <div className="form-grid-3">
            <div className="input-group"><label>City</label><input type="text" className="input-field" {...register('senderAddress.city', { required: true })} /></div>
            <div className="input-group"><label>Post Code</label><input type="text" className="input-field" {...register('senderAddress.postCode', { required: true })} /></div>
            <div className="input-group"><label>Country</label><input type="text" className="input-field" {...register('senderAddress.country', { required: true })} /></div>
          </div>

          <h4 className="form-section-title">Bill To</h4>
          <div className="input-group">
            <label>Client's Name</label>
            <input type="text" className="input-field" {...register('clientName', { required: true })} />
          </div>
          <div className="input-group">
            <label>Client's Email</label>
            <input type="email" placeholder="e.g. email@example.com" className="input-field" {...register('clientEmail', { required: true })} />
          </div>
          <div className="input-group">
            <label>Street Address</label>
            <input type="text" className="input-field" {...register('clientAddress.street', { required: true })} />
          </div>
          <div className="form-grid-3">
            <div className="input-group"><label>City</label><input type="text" className="input-field" {...register('clientAddress.city', { required: true })} /></div>
            <div className="input-group"><label>Post Code</label><input type="text" className="input-field" {...register('clientAddress.postCode', { required: true })} /></div>
            <div className="input-group"><label>Country</label><input type="text" className="input-field" {...register('clientAddress.country', { required: true })} /></div>
          </div>

          <div className="form-grid-2">
            <div className="input-group">
              <label>Invoice Date</label>
              <input type="date" className="input-field" {...register('createdAt', { required: true })} />
            </div>
            <div className="input-group">
              <label>Payment Terms</label>
              <select className="input-field" {...register('paymentTerms', { required: true })}>
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label>Project Description</label>
            <input type="text" placeholder="e.g. Graphic Design Service" className="input-field" {...register('description', { required: true })} />
          </div>

          <h3 className="item-list-header">Item List</h3>
          
          {fields.map((field, index) => {
            const qty = watchItems?.[index]?.quantity || 0;
            const price = watchItems?.[index]?.price || 0;
            const displayTotal = (qty * price).toFixed(2);

            return (
              <div key={field.id} className="item-row">
                <div className="input-group item-name-full">
                  {index === 0 && <label className="desktop-only">Item Name</label>}
                  <input type="text" className="input-field" {...register(`items.${index}.name`, { required: true })} />
                </div>
                
                <div className="input-group">
                  {index === 0 && <label className="desktop-only">Qty.</label>}
                  <input type="number" min="1" className="input-field" {...register(`items.${index}.quantity`, { required: true })} />
                </div>
                
                <div className="input-group">
                  {index === 0 && <label className="desktop-only">Price</label>}
                  <input type="number" step="0.01" className="input-field" {...register(`items.${index}.price`, { required: true })} />
                </div>
                
                <div className="input-group">
                  {index === 0 && <label className="desktop-only">Total</label>}
                  <div className="item-total-text">£{displayTotal}</div>
                </div>
                
                <button type="button" onClick={() => remove(index)} className="btn-delete-item">
                  🗑️
                </button>
              </div>
            );
          })}

          <button type="button" onClick={() => append({ name: '', quantity: 1, price: 0, total: 0 })} className="btn-add-item">
            + Add New Item
          </button>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingBottom: '2rem' }}>
            <button type="button" onClick={closeForm} style={{ padding: '1rem 1.5rem', borderRadius: '24px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: 'var(--status-draft-bg)', color: 'var(--text-muted)' }}>
              Discard
            </button>
            <button type="submit" style={{ padding: '1rem 1.5rem', borderRadius: '24px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: 'var(--primary)', color: 'white' }}>
              {editingInvoice ? 'Save Changes' : 'Save & Send'}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}