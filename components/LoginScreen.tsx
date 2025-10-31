
import React from 'react';
import type { Role } from '../types';
import { LEAF_SVG } from '../constants';

interface LoginScreenProps {
  onLogin: (role: Role) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold text-emerald-700 mb-2 flex items-center justify-center">
            {LEAF_SVG}
            Welcome to Green Grocerers
        </h2>
        <p className="text-gray-600 mb-8">Select your role to access the Inventory & Ordering System.</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => onLogin('manager')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
            Log In as Store Manager
          </button>
          <button 
            onClick={() => onLogin('it-support')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
            Log In as IT Admin
          </button>
           <button 
            onClick={() => onLogin('leadership')}
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
            Log In as Leadership
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;