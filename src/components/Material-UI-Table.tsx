import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useMemo } from 'react'
import { useTable } from 'react-table'
// import makeData from '../makeData'
import { createRows } from '../utils'

interface ITable {
  columns: any
  data: any
}

const Table: React.FC<ITable> = ({columns, data}) => {
  // Use the state and functions returned from useTable to build your UI
  const {getTableProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup: any) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

function GameTable() {
  const columns = useMemo(
    () => [
      {
        Header: 'Game',
        columns: [
          {
            Header: 'Hand',
            accessor: 'hand',
          },
          {
            Header: 'Player_1 Name',
            accessor: 'nickname',
          },
          {
            Header: 'Player_2 Name',
            accessor: 'nickname',
          },
          {
            Header: 'Player_3 Name',
            accessor: 'nickname',
          },
          {
            Header: 'Bid',
            accessor: 'bid',
          },
        ],
      },
    ],
    []
  )

  const data = useMemo(() => createRows(3), [])

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  )
}

export default GameTable
