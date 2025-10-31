import React, { useState, useCallback, useEffect } from 'react';
import type { Role, Page, ModalInfo, Order } from './types';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import OrderPlacement from './components/OrderPlacement';
import OrderHistory from './components/OrderHistory';
import Forecast from './components/Forecast';
import ItSupportDashboard from './components/ItSupportDashboard';
import ItTicketList from './components/ItTicketList';
import KpiDashboard from './components/KpiDashboard';
import PosData from './components/PosData';
import Modal from './components/Modal';
import { getPastOrders } from './services/apiService';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(null);
  const [page, setPage] = useState<Page>('login');
  const [modal, setModal] = useState<ModalInfo | null>(null);
  const [ticketListStatus, setTicketListStatus] = useState<'Open' | 'In Progress' | 'Completed' | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (role === 'manager') {
        const fetchInitialOrders = async () => {
            const pastOrders = await getPastOrders();
            setOrders(pastOrders);
        };
        fetchInitialOrders();
    } else {
        // Clear orders when logging out or switching role
        setOrders([]);
    }
  }, [role]);

  const handlePlaceOrder = useCallback((newOrder: Omit<Order, 'id' | 'date'>) => {
    const fullOrder: Order = {
        ...newOrder,
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
    };
    setOrders(prevOrders => [fullOrder, ...prevOrders]);
  }, []);

  const handleLogin = useCallback((selectedRole: Role) => {
    if (selectedRole) {
      let defaultPage: Page = 'login';
      if (selectedRole === 'manager') {
        defaultPage = 'order-placement';
      } else if (selectedRole === 'it-support') {
        defaultPage = 'maintenance';
      } else if (selectedRole === 'leadership') {
        defaultPage = 'kpi-dashboard';
      }
      setRole(selectedRole);
      setPage(defaultPage);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setRole(null);
    setPage('login');
    setTicketListStatus(null);
  }, []);

  const navigate = useCallback((newPage: Page) => {
    if (newPage !== 'it-ticket-list') {
        setTicketListStatus(null);
    }
    setPage(newPage);
  }, []);

  const showModal = useCallback((title: string, body: string) => {
    setModal({ title, body });
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const showTicketList = useCallback((status: 'Open' | 'In Progress' | 'Completed') => {
    setTicketListStatus(status);
    setPage('it-ticket-list');
  }, []);

  const renderMainContent = () => {
    if (page === 'login' || !role) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (role) {
      case 'manager':
        switch (page) {
          case 'order-placement':
            return <OrderPlacement showModal={showModal} onPlaceOrder={handlePlaceOrder} />;
          case 'order-history':
             return <OrderHistory orders={orders} />;
          case 'forecast':
             return <Forecast />;
          default:
            return <OrderPlacement showModal={showModal} onPlaceOrder={handlePlaceOrder} />;
        }
      case 'it-support':
        if (page === 'it-ticket-list' && ticketListStatus) {
            return <ItTicketList status={ticketListStatus} onBack={() => navigate('maintenance')} />;
        }
        return <ItSupportDashboard showModal={showModal} onShowTicketList={showTicketList} />;
      case 'leadership':
        switch (page) {
            case 'kpi-dashboard':
                return <KpiDashboard />;
            case 'pos-data':
                return <PosData />;
            default:
                return <KpiDashboard />;
        }
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app-container p-4 sm:p-8">
      {role && <Header role={role} currentPage={page} onNavigate={navigate} onLogout={handleLogout} />}
      <main className="max-w-7xl mx-auto">
        {renderMainContent()}
      </main>
      {modal && <Modal title={modal.title} body={modal.body} onClose={closeModal} />}
    </div>
  );
};

export default App;