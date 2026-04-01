// src/types/index.ts
export interface Service {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  color: string;
  bg: string;
}

export interface Message {
  f: "user" | "ai";
  t: string;
}

export interface KpiData {
  rev: number;
  users: number;
  queries: number;
  uptime: number;
}

export interface ActivityFeed {
  t: string;
  m: string;
  k: "ok" | "info" | "warn";
}