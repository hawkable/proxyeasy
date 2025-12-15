export enum UserStatus {
  ACTIVE = 'Active',
  DISABLED = 'Disabled',
  EXPIRED = 'Expired'
}

export interface User {
  id: string;
  username: string;
  email: string;
  status: UserStatus;
  usedTraffic: number; // in GB
  totalLimit: number; // in GB
  expiryDate: string;
  remark?: string;
}

export interface Node {
  id: string;
  name: string;
  type: 'VMess' | 'VLESS' | 'Trojan' | 'Shadowsocks';
  address: string;
  port: number;
  status: 'Online' | 'Offline' | 'High Load';
  load: number; // percentage
  latency: number; // ms
  region: string;
}

export interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
  networkIn: number; // Mbps
  networkOut: number; // Mbps
  connections: number; // Active connections (PRD 2.5.2)
}

export interface TrafficPoint {
  time: string;
  upload: number;
  download: number;
}