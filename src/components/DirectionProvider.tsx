'use client';

import { createContext, useContext } from 'react';

type Direction = 'rtl' | 'ltr';

const DirectionContext = createContext<Direction>('ltr');

export function DirectionProvider({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: Direction;
}) {
  return <DirectionContext.Provider value={direction}>{children}</DirectionContext.Provider>;
}

export function useDirection() {
  return useContext(DirectionContext);
}
