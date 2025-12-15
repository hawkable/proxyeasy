import { User, UserStatus, Node, SystemStats, TrafficPoint } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'alice_admin',
    email: 'alice@proxyeasy.com',
    status: UserStatus.ACTIVE,
    usedTraffic: 45.5,
    totalLimit: 100,
    expiryDate: '2024-12-31',
    remark: 'Admin Account'
  },
  {
    id: 'u2',
    username: 'bob_dev',
    email: 'bob@company.com',
    status: UserStatus.ACTIVE,
    usedTraffic: 82.1,
    totalLimit: 200,
    expiryDate: '2024-10-15',
    remark: 'Dev Team'
  },
  {
    id: 'u3',
    username: 'guest_01',
    email: 'guest@temp.com',
    status: UserStatus.EXPIRED,
    usedTraffic: 5.0,
    totalLimit: 5,
    expiryDate: '2023-11-01',
    remark: 'Temporary access'
  },
  {
    id: 'u4',
    username: 'charlie_marketing',
    email: 'charlie@company.com',
    status: UserStatus.DISABLED,
    usedTraffic: 12.4,
    totalLimit: 50,
    expiryDate: '2025-01-01',
    remark: 'Suspended due to policy'
  }
];

export const mockNodes: Node[] = [
  {
    id: 'n1',
    name: 'SG-Premium-01',
    type: 'Trojan',
    address: 'sg1.proxyeasy.io',
    port: 443,
    status: 'Online',
    load: 45,
    latency: 85,
    region: 'Singapore'
  },
  {
    id: 'n2',
    name: 'US-West-02',
    type: 'VMess',
    address: 'usw2.proxyeasy.io',
    port: 8443,
    status: 'Online',
    load: 78,
    latency: 180,
    region: 'Los Angeles'
  },
  {
    id: 'n3',
    name: 'JP-Tokyo-01',
    type: 'VLESS',
    address: 'jp1.proxyeasy.io',
    port: 443,
    status: 'High Load',
    load: 92,
    latency: 60,
    region: 'Tokyo'
  },
    {
    id: 'n4',
    name: 'HK-Direct-01',
    type: 'Shadowsocks',
    address: 'hk1.proxyeasy.io',
    port: 8388,
    status: 'Offline',
    load: 0,
    latency: 0,
    region: 'Hong Kong'
  }
];

export const mockSystemStats: SystemStats = {
  cpu: 34,
  memory: 62,
  disk: 45,
  uptime: '15d 4h 23m',
  networkIn: 45.2,
  networkOut: 120.5,
  connections: 342
};

export const mockTrafficData: TrafficPoint[] = [
  { time: '00:00', upload: 12, download: 45 },
  { time: '04:00', upload: 8, download: 20 },
  { time: '08:00', upload: 25, download: 120 },
  { time: '12:00', upload: 45, download: 350 },
  { time: '16:00', upload: 60, download: 410 },
  { time: '20:00', upload: 90, download: 550 },
  { time: '24:00', upload: 30, download: 180 },
];