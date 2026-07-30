import React, { useMemo, useState } from 'react';
import '../../../styles/tokens.css';
export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'standard' | 'striped' | 'outlined';
export interface TableColumn<T> {
  id?: string;
  field: keyof T | string;
  headerName?: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  sortable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
  tooltip?: React.ReactNode;
  className?: string;
  hide?: boolean;
}
export interface TableProps<T> {
  id?: string;
  className?: string;
  size?: TableSize;
  variant?: TableVariant;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  columns: TableColumn<T>[];
  rows: T[];
  sortable?: boolean;
  defaultSort?: { field: keyof T | string; order: 'asc' | 'desc' } | null;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
  dense?: boolean;
}
const sizeConfig: Record<TableSize, { padding: string; fontSize: string }> = {
  sm: {
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--font-size-xs)',
  },
  md: {
    padding: 'var(--space-2) var(--space-3)',
    fontSize: 'var(--font-size-sm)',
  },
  lg: {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--font-size-md)',
  },
};
const Table = <T extends Record<string, unknown>>({
  id,
  className = '',
  size = 'md',
  variant = 'standard',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-live': ariaLive,
  columns = [],
  rows = [],
  sortable = true,
  defaultSort = null,
  onRowClick,
  stickyHeader = false,
  dense = false,
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<{ field?: string; order?: 'asc' | 'desc' }>(() =>
    defaultSort ? { field: String(defaultSort.field), order: defaultSort.order } : {},
  );
  const handleSort = (field: string) => {
    if (!sortable) return;
    setSortState(prev =>
      prev.field === field
        ? { field, order: prev.order === 'asc' ? 'desc' : 'asc' }
        : { field, order: 'asc' },
    );
  };
  const sortedRows = useMemo(() => {
    if (!sortState.field) return rows;
    const valueToString = (val: unknown): string => {
      if (typeof val === 'string') return val;
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    };
    const compareValues = (av: unknown, bv: unknown, order: number): number => {
      if (av === bv) return 0;
      if (av == null) return -1 * order;
      if (bv == null) return 1 * order;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * order;
      if (typeof av === 'boolean' && typeof bv === 'boolean') {
        const getBooleanComparison = (): number => {
          if (av === bv) return 0;
          return av ? 1 : -1;
        };
        return getBooleanComparison() * order;
      }
      if (typeof av === 'object' || typeof bv === 'object') {
        return valueToString(av).localeCompare(valueToString(bv)) * order;
      }
      return valueToString(av).localeCompare(valueToString(bv)) * order;
    };
    const field = sortState.field;
    const order = sortState.order === 'desc' ? -1 : 1;
    return [...rows].sort((a, b) => {
      const av = a[field];
      const bv = b[field];
      return compareValues(av, bv, order);
    });
  }, [rows, sortState]);
  const sizeConfig_value = sizeConfig[size] || sizeConfig.md;
  const getVariantStyle = (rowIndex: number): React.CSSProperties => {
    if (variant === 'striped') {
      return {
        backgroundColor: rowIndex % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-muted)',
      };
    }
    if (variant === 'outlined') {
      return {
        borderBottom: `var(--border-width-sm) solid var(--border-color)`,
      };
    }
    return {};
  };
  const headerStyle: React.CSSProperties = {
    padding: sizeConfig_value.padding,
    fontSize: sizeConfig_value.fontSize,
    fontWeight: 'var(--font-weight-semibold)',
    backgroundColor: 'var(--bg-muted)',
    color: 'var(--text-primary)',
    textAlign: 'left',
    position: stickyHeader ? 'sticky' : undefined,
    top: stickyHeader ? 0 : undefined,
    zIndex: stickyHeader ? 10 : undefined,
  };
  const cellStyle: React.CSSProperties = {
    padding: dense
      ? `${parseFloat(sizeConfig_value.padding.split(' ')[0]) / 2}rem ${parseFloat(sizeConfig_value.padding.split(' ')[1]) || parseFloat(sizeConfig_value.padding.split(' ')[0])}rem`
      : sizeConfig_value.padding,
    fontSize: sizeConfig_value.fontSize,
    borderBottom:
      variant === 'outlined' ? `var(--border-width-sm) solid var(--border-color)` : undefined,
  };
  return (
    <div
      id={id}
      style={{
        width: '100%',
        overflowX: 'auto',
      }}
      className={className}
    >
      <table
        style={{
          minWidth: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-family-sans)',
        }}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-live={ariaLive}
      >
        <thead>
          <tr>
            {columns
              .filter(c => !c.hide)
              .map(col => {
                const isCurrentSortField = sortState.field === String(col.field);
                const ariaSort: 'ascending' | 'descending' | undefined = isCurrentSortField
                  ? sortState.order === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : undefined;
                return (
                  <th
                    key={col.id ?? String(col.field)}
                    style={{
                      ...headerStyle,
                      width: col.width,
                      textAlign: col.align || 'left',
                    }}
                    className={col.className}
                    aria-sort={ariaSort}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                      }}
                    >
                      <span>{col.headerName ?? String(col.field)}</span>
                      {sortable && col.sortable !== false && (
                        <button
                          type='button'
                          style={{
                            marginLeft: 'var(--space-1)',
                            color: 'var(--text-muted)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color var(--transition-fast)',
                          }}
                          onClick={() => handleSort(String(col.field))}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--color-primary)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                          }}
                          aria-label={`Sort by ${col.headerName ?? String(col.field)}`}
                        >
                          <svg
                            style={{
                              width: '12px',
                              height: '12px',
                              display: 'inline-block',
                              transform:
                                sortState.field === String(col.field) && sortState.order === 'desc'
                                  ? 'rotate(180deg)'
                                  : undefined,
                              transition: 'transform var(--transition-fast)',
                            }}
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth={2}
                          >
                            <path d='M6 9l6-6 6 6' />
                            <path d='M6 15l6 6 6-6' />
                          </svg>
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row: T, rowIndex: number) => {
            const rowKey = `row-${Object.values(row)
              .map(val =>
                typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val),
              )
              .join('-')}`;
            return (
              <tr
                key={rowKey}
                style={{
                  cursor: onRowClick ? 'pointer' : undefined,
                  transition: 'background-color var(--transition-fast)',
                  ...getVariantStyle(rowIndex),
                }}
                onMouseEnter={e => {
                  if (onRowClick) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                  }
                }}
                onMouseLeave={e => {
                  const variantBg = getVariantStyle(rowIndex).backgroundColor;
                  e.currentTarget.style.backgroundColor = variantBg || 'transparent';
                }}
                onClick={() => onRowClick?.(row)}
              >
                {columns
                  .filter(c => !c.hide)
                  .map(col => (
                    <td
                      key={col.id ?? String(col.field)}
                      style={{
                        ...cellStyle,
                        textAlign: col.align || 'left',
                      }}
                      className={col.className}
                    >
                      {col.renderCell
                        ? col.renderCell(row)
                        : String(row[col.field as keyof T] ?? '')}
                    </td>
                  ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
export { Table };
