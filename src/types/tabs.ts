import React from 'react';

export type TabsItem = {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
};

export const TabsKeys = {
  label1: 'label1',
  label2: 'label2',
  label3: 'label3',
} as const;

export type TabsKeysType = keyof typeof TabsKeys;
