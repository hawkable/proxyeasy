import { User, Node, SystemStats, UserStatus } from '../types';
import { mockUsers, mockNodes, mockSystemStats } from './mockData';

// Keys for LocalStorage
const STORAGE_KEYS = {
  USERS: 'pe_db_users',
  NODES: 'pe_db_nodes',
  STATS: 'pe_db_stats',
  INIT: 'pe_db_initialized'
};

// Initialize DB with mock data if empty
const initDB = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.INIT)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(mockNodes));
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(mockSystemStats));
    localStorage.setItem(STORAGE_KEYS.INIT, 'true');
    console.log('Database initialized with default data.');
  }
};

// User Operations
export const db = {
  init: initDB,

  users: {
    getAll: (): User[] => {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    },
    
    add: (user: Omit<User, 'id'>): User => {
      const users = db.users.getAll();
      const newUser = { ...user, id: `u${Date.now()}` };
      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return newUser;
    },

    update: (id: string, updates: Partial<User>): User | null => {
      const users = db.users.getAll();
      const index = users.findIndex(u => u.id === id);
      if (index === -1) return null;
      
      const updatedUser = { ...users[index], ...updates };
      users[index] = updatedUser;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return updatedUser;
    },

    delete: (id: string): void => {
      const users = db.users.getAll();
      const filtered = users.filter(u => u.id !== id);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
    }
  },

  nodes: {
    getAll: (): Node[] => {
      const data = localStorage.getItem(STORAGE_KEYS.NODES);
      return data ? JSON.parse(data) : [];
    },
    // Add node methods can be implemented similarly
  }
};

// Initialize immediately
initDB();