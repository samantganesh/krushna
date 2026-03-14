import React, { useState } from 'react';

import {
  LayoutConfigContext,
  defaultConfig,
  type LayoutConfig,
} from './layoutConfigContext';

interface LayoutConfigProviderProps {
  children: React.ReactNode;
}

export const LayoutConfigProvider: React.FC<LayoutConfigProviderProps> = ({
  children,
}) => {
  const [config, setConfig] = useState<LayoutConfig>(defaultConfig);

  return (
    <LayoutConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </LayoutConfigContext.Provider>
  );
};
