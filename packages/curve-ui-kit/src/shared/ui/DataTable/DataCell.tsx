import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { type Cell, flexRender } from '@tanstack/react-table'
import { ChevronDownIcon } from '@ui-kit/shared/icons/ChevronDownIcon'
import { RotatableIcon } from '@ui-kit/shared/ui/DataTable/RotatableIcon'
import { SizesAndSpaces } from '@ui-kit/themes/design/1_sizes_spaces'
import { getAlignment, getExtraColumnPadding, type TableItem } from './data-table.utils'

const { Spacing } = SizesAndSpaces

/**
 * DataCell component to render the data cell in the table.
 */
export const DataCell = <T extends TableItem>({
  cell,
  isMobile,
  isSticky,
  isLast,
  isFirst,
}: {
  cell: Cell<T, unknown>
  isMobile: boolean
  isSticky: boolean
  // todo: get rid of column hidden meta and use visibility + use column.getIsLastColumn()
  isFirst: boolean
  isLast: boolean
}) => {
  const { column, row } = cell
  const { variant, borderRight } = column.columnDef.meta ?? {}
  const children = flexRender(column.columnDef.cell, cell.getContext())

  // with the collapse icon there is an extra wrapper
  const wrapperSx = {
    textAlign: getAlignment(column),
    paddingInline: Spacing.sm,
    paddingBlock: Spacing.xs, // `md` removed, content should be vertically centered
  }

  const showCollapseIcon = isMobile && isLast
  return (
    <Typography
      variant={variant ?? 'tableCellMBold'}
      color="text.primary"
      component="td"
      sx={{
        ...(!showCollapseIcon && wrapperSx),
        borderBottom: (t) => `1px solid ${t.design.Layer[1].Outline}`,
        ...getExtraColumnPadding({ isFirst, isLast }),
        ...((borderRight || isSticky) && { borderRight: (t) => `1px solid ${t.design.Layer[1].Outline}` }),
        ...(isSticky && {
          position: 'sticky',
          left: 0,
          zIndex: 1,
          backgroundColor: (t) => t.design.Table.Row.Default,
        }),
      }}
      data-testid={`data-table-cell-${column.id}`}
    >
      {showCollapseIcon ? (
        <Stack direction="row" alignItems="center" width="100%">
          <Box sx={wrapperSx} flexGrow={1}>
            {children}
          </Box>
          <RotatableIcon
            icon={ChevronDownIcon}
            rotated={row.getIsExpanded()}
            fontSize={28}
            testId={`${row.getIsExpanded() ? 'collapse' : 'expand'}-icon`}
          />
        </Stack>
      ) : (
        children
      )}
    </Typography>
  )
}
