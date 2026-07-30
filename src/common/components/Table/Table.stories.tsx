import '../../../styles/tokens.css';

import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Table } from './Table';
import type { TableColumn, TableSize, TableVariant } from './Table';
interface SampleRow extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  amount: number;
}
const sampleData: SampleRow[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'active',
    joinDate: '2024-01-15',
    amount: 1250,
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'active',
    joinDate: '2024-02-20',
    amount: 2100,
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    status: 'inactive',
    joinDate: '2023-12-01',
    amount: 890,
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    status: 'pending',
    joinDate: '2024-03-10',
    amount: 1500,
  },
  {
    id: 5,
    name: 'Eve Davis',
    email: 'eve@example.com',
    status: 'active',
    joinDate: '2024-01-05',
    amount: 3200,
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank@example.com',
    status: 'active',
    joinDate: '2024-02-14',
    amount: 1750,
  },
  {
    id: 7,
    name: 'Grace Lee',
    email: 'grace@example.com',
    status: 'inactive',
    joinDate: '2023-11-20',
    amount: 920,
  },
  {
    id: 8,
    name: 'Henry Taylor',
    email: 'henry@example.com',
    status: 'pending',
    joinDate: '2024-03-05',
    amount: 2100,
  },
];
const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] as TableSize[] },
    variant: {
      control: { type: 'radio' },
      options: ['standard', 'striped', 'outlined'] as TableVariant[],
    },
    sortable: { control: { type: 'boolean' } },
    stickyHeader: { control: { type: 'boolean' } },
    dense: { control: { type: 'boolean' } },
  },
} satisfies Meta<typeof Table>;
export default meta;
export const Default = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name', sortable: true },
      { id: 'email', field: 'email', headerName: 'Email', sortable: true },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'joinDate', field: 'joinDate', headerName: 'Join Date' },
    ];
    return (
      <Table<SampleRow>
        id='default-table'
        size='md'
        variant='standard'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const SizeSmall = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
    ];
    return (
      <Table<SampleRow>
        id='small-table'
        size='sm'
        variant='standard'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const SizeMedium = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'amount', field: 'amount', headerName: 'Amount', align: 'right' },
    ];
    return (
      <Table<SampleRow>
        id='medium-table'
        size='md'
        variant='standard'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const SizeLarge = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'joinDate', field: 'joinDate', headerName: 'Join Date' },
    ];
    return (
      <Table<SampleRow>
        id='large-table'
        size='lg'
        variant='standard'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const VariantStandard = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'amount', field: 'amount', headerName: 'Amount', align: 'right' },
    ];
    return (
      <Table<SampleRow>
        id='standard-table'
        size='md'
        variant='standard'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const VariantStriped = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'joinDate', field: 'joinDate', headerName: 'Join Date' },
    ];
    return (
      <Table<SampleRow>
        id='striped-table'
        size='md'
        variant='striped'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const VariantOutlined = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'amount', field: 'amount', headerName: 'Amount', align: 'right' },
    ];
    return (
      <Table<SampleRow>
        id='outlined-table'
        size='md'
        variant='outlined'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const CustomRendering = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      {
        id: 'status',
        field: 'status',
        headerName: 'Status',
        renderCell: row => (
          <span
            style={{
              display: 'inline-block',
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              backgroundColor:
                row.status === 'active'
                  ? 'var(--color-success)'
                  : row.status === 'inactive'
                    ? 'var(--color-error)'
                    : 'var(--color-warning)',
              color: 'white',
            }}
          >
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        ),
      },
      {
        id: 'amount',
        field: 'amount',
        headerName: 'Amount',
        align: 'right',
        renderCell: row => `$${row.amount.toLocaleString()}`,
      },
    ];
    return (
      <Table<SampleRow>
        id='custom-table'
        size='md'
        variant='striped'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const WithSorting = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name', sortable: true },
      { id: 'email', field: 'email', headerName: 'Email', sortable: true },
      { id: 'status', field: 'status', headerName: 'Status', sortable: true },
      { id: 'joinDate', field: 'joinDate', headerName: 'Join Date', sortable: true },
      { id: 'amount', field: 'amount', headerName: 'Amount', align: 'right', sortable: true },
    ];
    return (
      <Table<SampleRow>
        id='sorting-table'
        size='md'
        variant='striped'
        sortable={true}
        columns={columns}
        rows={sampleData}
        defaultSort={{ field: 'name', order: 'asc' }}
      />
    );
  },
};
export const StickyHeader = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'joinDate', field: 'joinDate', headerName: 'Join Date' },
      { id: 'amount', field: 'amount', headerName: 'Amount', align: 'right' },
    ];
    return (
      <div
        style={{
          height: '300px',
          overflow: 'auto',
          border: 'var(--border-width-md) solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Table<SampleRow>
          id='sticky-table'
          size='md'
          variant='striped'
          stickyHeader={true}
          columns={columns}
          rows={sampleData}
        />
      </div>
    );
  },
};
export const Dense = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'email', field: 'email', headerName: 'Email' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'joinDate', field: 'joinDate', headerName: 'Join Date' },
    ];
    return (
      <Table<SampleRow>
        id='dense-table'
        size='md'
        variant='striped'
        dense={true}
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const WithRowClick = {
  render: () => <RowClickTable />,
};
function RowClickTable() {
  const [selectedRow, setSelectedRow] = useState<SampleRow | null>(null);
  const columns: TableColumn<SampleRow>[] = [
    { id: 'name', field: 'name', headerName: 'Name' },
    { id: 'email', field: 'email', headerName: 'Email' },
    { id: 'status', field: 'status', headerName: 'Status' },
    { id: 'joinDate', field: 'joinDate', headerName: 'Join Date' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <Table<SampleRow>
        id='rowclick-table'
        size='md'
        variant='striped'
        columns={columns}
        rows={sampleData}
        onRowClick={setSelectedRow}
      />
      {selectedRow && (
        <div
          style={{
            padding: 'var(--space-3)',
            backgroundColor: 'var(--bg-muted)',
            borderRadius: 'var(--radius-md)',
            border: 'var(--border-width-sm) solid var(--border-color)',
          }}
        >
          <p
            style={{
              margin: '0',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            Selected: {selectedRow.name}
          </p>
          <p
            style={{
              margin: 'var(--space-1) 0 0 0',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-secondary)',
            }}
          >
            {selectedRow.email}
          </p>
        </div>
      )}
    </div>
  );
}
export const HiddenColumns = {
  render: () => {
    const columns: TableColumn<SampleRow>[] = [
      { id: 'name', field: 'name', headerName: 'Name' },
      { id: 'status', field: 'status', headerName: 'Status' },
      { id: 'joinDate', field: 'joinDate', headerName: 'Join Date' },
      { id: 'amount', field: 'amount', headerName: 'Amount', align: 'right' },
    ];
    return (
      <Table<SampleRow>
        id='hidden-table'
        size='md'
        variant='standard'
        columns={columns}
        rows={sampleData}
      />
    );
  },
};
export const Comprehensive = {
  render: () => <ComprehensiveTable />,
};
function ComprehensiveTable() {
  const [selectedRow, setSelectedRow] = useState<SampleRow | null>(null);
  const columns: TableColumn<SampleRow>[] = [
    { id: 'name', field: 'name', headerName: 'Name', sortable: true },
    { id: 'email', field: 'email', headerName: 'Email', sortable: true },
    {
      id: 'status',
      field: 'status',
      headerName: 'Status',
      sortable: true,
      renderCell: row => (
        <span
          style={{
            display: 'inline-block',
            padding: 'var(--space-1) var(--space-2)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            backgroundColor:
              row.status === 'active'
                ? 'var(--color-success)'
                : row.status === 'inactive'
                  ? 'var(--color-error)'
                  : 'var(--color-warning)',
            color: 'white',
          }}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    { id: 'joinDate', field: 'joinDate', headerName: 'Join Date', sortable: true },
    {
      id: 'amount',
      field: 'amount',
      headerName: 'Amount',
      align: 'right',
      sortable: true,
      renderCell: row => `$${row.amount.toLocaleString()}`,
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <Table<SampleRow>
        id='comprehensive-table'
        size='md'
        variant='striped'
        sortable={true}
        columns={columns}
        rows={sampleData}
        defaultSort={{ field: 'name', order: 'asc' }}
        onRowClick={setSelectedRow}
      />
      {selectedRow && (
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <h4 style={{ margin: '0 0 var(--space-2) 0' }}>Selected: {selectedRow.name}</h4>
          <p style={{ margin: 'var(--space-1) 0' }}>Email: {selectedRow.email}</p>
          <p style={{ margin: 'var(--space-1) 0' }}>Status: {selectedRow.status}</p>
          <p style={{ margin: 'var(--space-1) 0' }}>Joined: {selectedRow.joinDate}</p>
          <p style={{ margin: 'var(--space-1) 0' }}>Amount: ${selectedRow.amount}</p>
        </div>
      )}
    </div>
  );
}
