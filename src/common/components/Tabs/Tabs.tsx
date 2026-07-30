import '../../../styles/tokens.css';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import '../../../styles/tokens.css';
export type TabSize = 'sm' | 'md' | 'lg';
export type TabVariant =
  | 'basic'
  | 'scrollable'
  | 'centered'
  | 'full-width'
  | 'vertical'
  | 'vertical-centered';
interface RegisteredTab {
  value: string | number;
  el: HTMLButtonElement | null;
  id?: string;
}
interface TabsContextType {
  value: string | number;
  onChange: (value: string | number) => void;
  variant: TabVariant;
  size: TabSize;
  disabled?: boolean;
  orientation: 'horizontal' | 'vertical';
  registerTab: (value: string | number, el: HTMLButtonElement | null, id?: string) => void;
  unregisterTab: (value: string | number) => void;
  getTabIndex: (value: string | number) => number;
  tabsListRef: React.MutableRefObject<RegisteredTab[]>;
  sizeConfig: ReturnType<typeof createSizeConfig>;
}
const TabsContext = createContext<TabsContextType | undefined>(undefined);
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};
const createSizeConfig = (size: TabSize) =>
  ({
    sm: {
      tab: { fontSize: 'var(--font-size-xs)', padding: 'var(--space-2) var(--space-3)' },
      panel: { fontSize: 'var(--font-size-xs)' },
    },
    md: {
      tab: { fontSize: 'var(--font-size-sm)', padding: 'var(--space-3) var(--space-4)' },
      panel: { fontSize: 'var(--font-size-sm)' },
    },
    lg: {
      tab: { fontSize: 'var(--font-size-md)', padding: 'var(--space-4) var(--space-6)' },
      panel: { fontSize: 'var(--font-size-md)' },
    },
  })[size];
export interface TabsProps {
  id?: string;
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  variant?: TabVariant;
  size?: TabSize;
  children: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-orientation'?: 'horizontal' | 'vertical';
}
export interface TabProps {
  id?: string;
  className?: string;
  value: string | number;
  label?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: string | number;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  tooltip?: string;
  children?: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}
export interface TabPanelProps {
  id?: string;
  className?: string;
  value: string | number;
  children: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}
const variantContainerStyles: Record<TabVariant, React.CSSProperties> = {
  basic: {
    display: 'flex',
    borderBottom: 'var(--border-width-sm) solid var(--border-color)',
  },
  scrollable: {
    display: 'flex',
    overflowX: 'auto',
    borderBottom: 'var(--border-width-sm) solid var(--border-color)',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: 'var(--border-width-sm) solid var(--border-color)',
  },
  'full-width': {
    display: 'flex',
    borderBottom: 'var(--border-width-sm) solid var(--border-color)',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'var(--border-width-sm) solid var(--border-color)',
  },
  'vertical-centered': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRight: 'var(--border-width-sm) solid var(--border-color)',
  },
};
const tabBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontWeight: 'var(--font-weight-medium)',
  transition: `color var(--transition-normal)`,
  outline: 'none',
  border: 'none',
  background: 'transparent',
};
const getTabStyle = (
  variant: TabVariant,
  isSelected: boolean,
  isDisabled: boolean | undefined,
): React.CSSProperties => ({
  ...tabBaseStyle,
  color: isSelected ? 'var(--color-primary)' : 'var(--text-secondary)',
  borderBottom: variant.includes('vertical')
    ? undefined
    : isSelected
      ? 'var(--border-width-md) solid var(--color-primary)'
      : 'var(--border-width-md) solid transparent',
  borderRight: variant.includes('vertical')
    ? isSelected
      ? 'var(--border-width-md) solid var(--color-primary)'
      : 'var(--border-width-md) solid transparent'
    : undefined,
  opacity: isDisabled ? 'var(--opacity-disabled)' : 1,
  cursor: isDisabled ? 'var(--cursor-disabled)' : 'pointer',
  ...(variant === 'full-width' && { flex: 1 }),
  ...(variant === 'vertical-centered' && { flex: 1 }),
});
const Tabs = ({
  id,
  className = '',
  value: controlledValue,
  defaultValue = 0,
  onChange,
  disabled = false,
  variant = 'basic',
  size = 'md',
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-orientation': ariaOrientation,
}: TabsProps) => {
  const generatedId = useId();
  const rootId = id ?? `tabs-${generatedId}`;
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue);
  const value = controlledValue ?? internalValue;
  const isVertical =
    (ariaOrientation ?? (variant.includes('vertical') ? 'vertical' : 'horizontal')) === 'vertical';
  const orientation = isVertical ? 'vertical' : 'horizontal';
  const sizeConfig = createSizeConfig(size);
  const tabsListRef = useRef<RegisteredTab[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleChange = useCallback(
    (newValue: string | number) => {
      if (!disabled) {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        if (onChange) onChange(newValue);
      }
    },
    [disabled, controlledValue, onChange],
  );
  const registerTab = useCallback(
    (tabValue: string | number, el: HTMLButtonElement | null, tabId?: string) => {
      tabsListRef.current = tabsListRef.current.filter(r => r.value !== tabValue);
      if (el) {
        tabsListRef.current.push({ value: tabValue, el, id: tabId });
      }
    },
    [],
  );
  const unregisterTab = useCallback((tabValue: string | number) => {
    tabsListRef.current = tabsListRef.current.filter(r => r.value !== tabValue);
  }, []);
  const getTabIndex = useCallback((tabValue: string | number) => {
    return tabsListRef.current.findIndex(r => r.value === tabValue);
  }, []);
  useLayoutEffect(() => {
    const entries = tabsListRef.current;
    const entry = entries.find(e => e.value === value);
    if (entry?.el && containerRef.current) {
      const elRect = entry?.el.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      if (orientation === 'horizontal') {
        setIndicator({
          left: elRect.left - containerRect.left + containerRef.current.scrollLeft,
          width: elRect.width,
          top: 0,
          height: 2,
        });
      } else {
        setIndicator({
          left: 0,
          width: 2,
          top: elRect.top - containerRect.top + containerRef.current.scrollTop,
          height: elRect.height,
        });
      }
      if (variant === 'scrollable') {
        entry.el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    } else {
      setIndicator({ left: 0, width: 0, top: 0, height: 0 });
    }
    const handleResize = () => {
      const e = tabsListRef.current.find(e => e.value === value);
      if (e?.el && containerRef.current) {
        const elRect = e?.el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        if (orientation === 'horizontal') {
          setIndicator({
            left: elRect.left - containerRect.left + containerRef.current.scrollLeft,
            width: elRect.width,
            top: 0,
            height: 2,
          });
        } else {
          setIndicator({
            left: 0,
            width: 2,
            top: elRect.top - containerRect.top + containerRef.current.scrollTop,
            height: elRect.height,
          });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [value, children, variant, orientation]);
  const providerValue: TabsContextType = useMemo(
    () => ({
      value,
      onChange: handleChange,
      variant,
      size,
      disabled,
      orientation,
      registerTab,
      unregisterTab,
      getTabIndex,
      tabsListRef,
      sizeConfig,
    }),
    [
      value,
      handleChange,
      variant,
      size,
      disabled,
      orientation,
      registerTab,
      unregisterTab,
      getTabIndex,
      tabsListRef,
      sizeConfig,
    ],
  );
  const containerStyle: React.CSSProperties = {
    ...variantContainerStyles[variant],
    ...(isVertical && { display: 'flex', flexDirection: 'column' }),
    position: 'relative',
  };
  return (
    <TabsContext.Provider value={providerValue}>
      <div
        style={containerStyle}
        className={className}
        ref={containerRef}
        id={rootId}
        role='tablist'
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-orientation={orientation}
      >
        {}
        {children}
        {}
        {}
        <span
          aria-hidden
          style={
            orientation === 'horizontal'
              ? {
                  height: `${indicator.height}px`,
                  width: `${indicator.width}px`,
                  transform: `translateX(${indicator.left}px)`,
                  bottom: 0,
                  left: 0,
                  position: 'absolute',
                  backgroundColor: 'var(--color-primary)',
                  transition: `all var(--transition-normal)`,
                }
              : {
                  width: `${indicator.width}px`,
                  height: `${indicator.height}px`,
                  transform: `translateY(${indicator.top}px)`,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  backgroundColor: 'var(--color-primary)',
                  transition: `all var(--transition-normal)`,
                }
          }
        />
      </div>
    </TabsContext.Provider>
  );
};
const Tab = ({
  id,
  className = '',
  value,
  label,
  disabled = false,
  icon,
  badge,
  tabIndex = 0,
  onClick,
  onFocus,
  onBlur,
  tooltip,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: TabProps) => {
  const {
    value: selectedValue,
    onChange,
    variant,
    disabled: tabsDisabled,
    orientation,
    registerTab,
    unregisterTab,
    tabsListRef,
    sizeConfig,
  } = useTabsContext();
  const tabRef = useRef<HTMLButtonElement | null>(null);
  const generatedId = useId();
  const tabId = id ?? `tab-${generatedId}-${String(value)}`;
  const isSelected = selectedValue === value;
  const isDisabled = disabled || tabsDisabled;
  useEffect(() => {
    registerTab(value, tabRef.current, tabId);
    return () => unregisterTab(value);
  }, [value]);
  useEffect(() => {
    registerTab(value, tabRef.current, tabId);
  }, [tabRef.current]);
  useEffect(() => {
    if (isSelected && variant === 'scrollable' && tabRef.current) {
      tabRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [isSelected, variant]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      onChange(value);
    }
    if (onClick) onClick(e);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    const entries = tabsListRef.current.filter(r => r.el);
    const currentIndex = entries.findIndex(r => r.value === value);
    const focusIndex = (index: number) => {
      if (entries.length === 0) return;
      const idx = (index + entries.length) % entries.length;
      const el = entries[idx].el;
      if (el) el.focus();
    };
    const handleKeyNavigation = () => {
      if (e.key === 'Home') {
        e.preventDefault();
        focusIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        focusIndex(entries.length - 1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange(value);
      } else if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          focusIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          focusIndex(currentIndex + 1);
        }
      } else if (orientation === 'vertical') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          focusIndex(currentIndex - 1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          focusIndex(currentIndex + 1);
        }
      }
    };
    handleKeyNavigation();
  };
  const baseStyle = getTabStyle(variant, isSelected, isDisabled);
  return (
    <button
      ref={tabRef}
      id={tabId}
      type='button'
      role='tab'
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      aria-controls={`${tabId}-panel`}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      tabIndex={isSelected ? tabIndex : -1}
      disabled={isDisabled}
      onClick={handleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      title={tooltip}
      style={{
        ...baseStyle,
        ...sizeConfig.tab,
      }}
      className={className}
    >
      {icon && <span style={{ flexShrink: 0 }}>{icon}</span>}
      {label ?? children}
      {badge !== undefined && (
        <span
          style={{
            marginLeft: 'var(--space-1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '20px',
            height: '20px',
            padding: '0 var(--space-1)',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-error)',
            color: 'white',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-bold)',
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
};
const TabPanel = ({
  id,
  className = '',
  value,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: TabPanelProps) => {
  const { value: selectedValue, sizeConfig } = useTabsContext();
  const isSelected = selectedValue === value;
  const generatedId = useId();
  const panelId = id ?? `tabpanel-${generatedId}-${String(value)}`;
  return (
    <div
      id={`${panelId}-panel`}
      role='tabpanel'
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      hidden={!isSelected}
      style={{
        ...sizeConfig.panel,
        transition: `opacity var(--transition-normal)`,
        opacity: isSelected ? 1 : 0,
        display: isSelected ? 'block' : 'none',
        padding: 'var(--space-4)',
      }}
      className={className}
      aria-hidden={!isSelected}
    >
      {isSelected && children}
    </div>
  );
};
export { Tabs, Tab, TabPanel };
export default Tabs;
