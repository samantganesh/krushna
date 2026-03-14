import { useContext, useEffect } from 'react';

import {
  LayoutConfigContext,
  defaultConfig,
  type LayoutConfig,
} from './layoutConfigContext';

/**
 * Hook to configure layout visibility from child components.
 * Configuration automatically resets when the component unmounts (e.g., navigating to a different page).
 *
 * @param config - Layout configuration object
 * @example
 * ```tsx
 * function MyPage() {
 *   useLayoutConfig({ showSidebar: false });
 *   return <div>Page content without sidebar</div>;
 * }
 * ```
 */
export const useLayoutConfig = (config: LayoutConfig) => {
  const { setConfig } = useContext(LayoutConfigContext);
  // Serialize to a string so the effect only re-runs when values change,
  // not on every render when callers pass inline object literals.
  const configJson = JSON.stringify(config);

  useEffect(() => {
    const parsed = JSON.parse(configJson) as LayoutConfig;
    setConfig(parsed);

    return () => {
      setConfig(defaultConfig);
    };
  }, [configJson, setConfig]);
};
