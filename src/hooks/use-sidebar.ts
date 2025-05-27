'use client';

import { create } from 'zustand';

interface SidebarStore {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
}));
