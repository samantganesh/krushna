import { createContext } from 'react';

export interface LayoutConfig {
  /**
   * Whether to show the sidebar. Default: true
   */
  showSidebar?: boolean;
  /**
   * Whether to show the topbar. Default: true
   */
  showTopbar?: boolean;
  /**
   * Whether to show the profile menu. Default: true
   */
  showProfileMenu?: boolean;
}

export interface LayoutConfigContextValue {
  config: LayoutConfig;
  setConfig: (config: LayoutConfig) => void;
}

export const defaultConfig: LayoutConfig = {
  showSidebar: true,
  showTopbar: true,
  showProfileMenu: true,
};

export const LayoutConfigContext = createContext<LayoutConfigContextValue>({
  config: defaultConfig,
  setConfig: () => {},
});
