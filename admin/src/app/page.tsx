'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminNavbar } from '@/components/layout/AdminNavbar';
import { OverviewTab } from '@/components/dashboard/OverviewTab';
import { OrdersTab } from '@/components/dashboard/OrdersTab';
import { ProductsTab } from '@/components/dashboard/ProductsTab';
import { PaymentsTab } from '@/components/dashboard/PaymentsTab';
import { UsersTab } from '@/components/dashboard/UsersTab';
import { QualityBatchTab } from '@/components/dashboard/QualityBatchTab';
import { AnalyticsTab } from '@/components/dashboard/AnalyticsTab';
import { SettingsTab } from '@/components/dashboard/SettingsTab';
import { AddProductModal } from '@/components/modals/AddProductModal';
import { NewBatchModal } from '@/components/modals/NewBatchModal';
import { OrderDetailsModal } from '@/components/modals/OrderDetailsModal';
import { 
  mockOrders, 
  mockProducts, 
  mockTransactions, 
  mockUsers, 
  mockBatches 
} from '@/lib/data/mockAdminData';
import { TabType, Order, Product, OrderStatus, QualityBatch } from '@/lib/types';

export default function AdminDashboardPage() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [batches, setBatches] = useState<QualityBatch[]>(mockBatches);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isNewBatchOpen, setIsNewBatchOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleUpdateTracking = (orderId: string, tracking: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, trackingNumber: tracking, status: 'dispatched' } : o));
  };

  const handleEditProductStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const status = newStock === 0 ? 'out_of_stock' : newStock < 20 ? 'low_stock' : 'in_stock';
        return { ...p, stock: newStock, status };
      }
      return p;
    }));
  };

  const handleAddProduct = (newProdData: Omit<Product, 'id' | 'salesCount' | 'rating' | 'status'>) => {
    const status = newProdData.stock === 0 ? 'out_of_stock' : newProdData.stock < 20 ? 'low_stock' : 'in_stock';
    const newProduct: Product = {
      ...newProdData,
      id: `PROD-00${products.length + 1}`,
      rating: 5.0,
      salesCount: 0,
      status
    };
    setProducts([newProduct, ...products]);
  };

  const handleAddBatch = (newBatch: QualityBatch) => {
    setBatches([newBatch, ...batches]);
  };

  const pendingOrdersCount = orders.filter(o => o.status === 'processing' || o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#080e0a] text-[#f4eee1] flex">
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <AdminNavbar
          currentTab={currentTab}
          onOpenAddProduct={() => setIsAddProductOpen(true)}
          onOpenBatchModal={() => setIsNewBatchOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic Tab View Container */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <OverviewTab
              orders={orders}
              products={products}
              onNavigateTab={setCurrentTab}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onSelectOrder={setSelectedOrder}
            />
          )}

          {currentTab === 'orders' && (
            <OrdersTab
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onSelectOrder={setSelectedOrder}
            />
          )}

          {currentTab === 'products' && (
            <ProductsTab
              products={products}
              onOpenAddModal={() => setIsAddProductOpen(true)}
              onEditProductStock={handleEditProductStock}
            />
          )}

          {currentTab === 'payments' && (
            <PaymentsTab
              transactions={mockTransactions}
            />
          )}

          {currentTab === 'users' && (
            <UsersTab
              users={mockUsers}
            />
          )}

          {currentTab === 'quality' && (
            <QualityBatchTab
              batches={batches}
              onOpenNewBatchModal={() => setIsNewBatchOpen(true)}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsTab />
          )}

          {currentTab === 'settings' && (
            <SettingsTab />
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* New Quality Batch Modal */}
      <NewBatchModal
        isOpen={isNewBatchOpen}
        onClose={() => setIsNewBatchOpen(false)}
        onAddBatch={handleAddBatch}
      />

      {/* Order Details & Invoice Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
        onUpdateTracking={handleUpdateTracking}
      />
    </div>
  );
}
