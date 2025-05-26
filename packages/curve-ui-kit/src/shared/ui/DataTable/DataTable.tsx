/// <reference types="./DataTable.d.ts" />
import { ReactNode } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { ExpandedPanel } from '@ui-kit/shared/ui/DataTable/ExpansionRow'
import { SizesAndSpaces } from '@ui-kit/themes/design/1_sizes_spaces'
import type { SxProps } from '@ui-kit/utils'
import { type TableItem, type TanstackTable } from './data-table.utils'
import { DataRow } from './DataRow'
import { EmptyStateRow } from './EmptyStateRow'
import { FilterRow } from './FilterRow'
import { HeaderCell } from './HeaderCell'

const { Sizing, MinWidth } = SizesAndSpaces

/**
 * DataTable component to render the table with headers and rows.
 */
export const DataTable = <T extends TableItem>({
  table,
  headerHeight,
  emptyText,
  children,
  rowSx,
  expandedPanel,
}: {
  table: TanstackTable<T>
  headerHeight: string
  emptyText: string
  children?: ReactNode // passed to <FilterRow />
  rowSx?: SxProps
  minRowHeight?: number
  expandedPanel: ExpandedPanel<T>
}) => (
  <Table
    sx={{
      backgroundColor: (t) => t.design.Layer[1].Fill,
      borderCollapse: 'separate' /* Don't collapse to avoid funky stuff with the sticky header */,
    }}
    data-testid="data-table"
  >
    <TableHead
      sx={(t) => ({
        zIndex: t.zIndex.appBar - 1,
        position: 'sticky',
        top: headerHeight,
        backgroundColor: t.design.Table.Header.Fill,
      })}
      data-testid="data-table-head"
    >
      {children && <FilterRow table={table}>{children}</FilterRow>}

      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} sx={{ height: Sizing['xxl'] }}>
          {headerGroup.headers.map((header) => (
            <HeaderCell key={header.id} header={header} />
          ))}
        </TableRow>
      ))}
    </TableHead>
    <TableBody>
      {table.getRowModel().rows.length === 0 && <EmptyStateRow table={table}>{emptyText}</EmptyStateRow>}
      {table.getRowModel().rows.map((row) => (
        <DataRow<T> key={row.id} row={row} sx={rowSx} expandedPanel={expandedPanel} />
      ))}
    </TableBody>
  </Table>
)
