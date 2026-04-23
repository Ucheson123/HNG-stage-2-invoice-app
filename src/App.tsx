import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard'; 
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm';


function App() {
  return (
    <Router>
      <div className="app-layout">
        <SideBar />
        <main className="main-content">
          <InvoiceForm />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice/:id" element={<InvoiceDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;