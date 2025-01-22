import React, { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación básica de autenticación
    if (userData.username === 'admin' && userData.password === 'admin') {
      setIsAdmin(true);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    } else if (userData.username && userData.password) {
      setIsAdmin(false);
      setIsLoggedIn(true);
      setCurrentPage('sales');
    }
  };

  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">REYSAN Lubricantes</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full p-2 border rounded"
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 border rounded"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );

  const SalesScreen = () => {
    const [saleData, setSaleData] = useState({
      product: '',
      price: '',
      quantity: ''
    });

    const handleSaleSubmit = (e) => {
      e.preventDefault();
      const newSale = {
        ...saleData,
        date: new Date().toISOString(),
        user: userData.username
      };
      setSalesData([...salesData, newSale]);
      setSaleData({ product: '', price: '', quantity: '' });
    };

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Registro de Venta</h2>
        <form onSubmit={handleSaleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre del Lubricante"
              className="w-full p-2 border rounded"
              value={saleData.product}
              onChange={(e) => setSaleData({...saleData, product: e.target.value})}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Precio"
              className="w-full p-2 border rounded"
              value={saleData.price}
              onChange={(e) => setSaleData({...saleData, price: e.target.value})}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Cantidad"
              className="w-full p-2 border rounded"
              value={saleData.quantity}
              onChange={(e) => setSaleData({...saleData, quantity: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Registrar Venta
          </button>
        </form>
      </div>
    );
  };

  const AdminDashboard = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Panel de Administrador</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Producto</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td className="p-2 border">{sale.user}</td>
                <td className="p-2 border">{sale.product}</td>
                <td className="p-2 border">${sale.price}</td>
                <td className="p-2 border">{sale.quantity}</td>
                <td className="p-2 border">{new Date(sale.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">REYSAN Lubricantes</h1>
        <div className="space-x-4">
          {isAdmin ? (
            <>
              <button onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
              <button onClick={() => setCurrentPage('sales')}>Ventas</button>
            </>
          ) : (
            <button onClick={() => setCurrentPage('sales')}>Mis Ventas</button>
          )}
          <button 
            onClick={() => {
              setIsLoggedIn(false);
              setIsAdmin(false);
              setCurrentPage('login');
            }}
            className="bg-red-500 px-2 py-1 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <LoginScreen />
      ) : (
        <>
          <Navigation />
          {currentPage === 'dashboard' && isAdmin && <AdminDashboard />}
          {currentPage === 'sales' && <SalesScreen />}
        </>
      )}
    </div>
  );
};

export default App;
