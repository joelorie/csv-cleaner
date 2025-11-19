import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import { getTelco } from '../utils/phoneUtils'
import { BarsArrowUpIcon } from '@heroicons/react/16/solid'

const PhoneTable = ({
  setFilter,
  removeDuplicateRows,
  handleDeleteRow,
  filter,
  filteredData,
  deleteInvalidRows,
  downloadCSV,
}) => {
  const columns = [
    {
      accessorKey: 'mobile',
      header: 'Mobile Number',
      size: 225,
      enableSorting: false,
    },
    {
      accessorKey: 'telco',
      header: 'Telco',
      size: 225,
      cell: ({ row }) => {
        const telco = getTelco(row.original.mobile)

        let bgColorClass = ''
        switch (telco) {
          case 'Safaricom':
            bgColorClass = 'bg-green-500 text-white'
            break
          case 'Airtel':
            bgColorClass = 'bg-red-500 text-white'
            break
          case 'Telcom':
            bgColorClass = 'bg-blue-500 text-white'
            break
          case 'Faiba':
            bgColorClass = 'bg-purple-500 text-white'
            break
          case 'Tanzania':
            bgColorClass = 'bg-yellow-400 text-black'
            break
          default:
            bgColorClass = 'bg-white text-black' // Unknown
        }

        return (
          <div className={`px-2 py-1 rounded ${bgColorClass}`}>{telco}</div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      size: 225,
      enableSorting: false,
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      size: 225,
      enableSorting: false,
    },
    {
      accessorKey: 'package',
      header: 'Package',
      size: 225,
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) =>
        row.original.isInvalid ? (
          <span className="text-red-500">⚠️ Invalid</span>
        ) : (
          <span className="text-green-600">✔️</span>
        ),
      enableSorting: false,
    },
    {
      accessorKey: 'suggestions',
      header: 'Suggestions',
      size: 300,
      cell: ({ row }) => {
        // Show reason only if invalid
        return row.original.isInvalid ? (
          <span className="text-secondary-content">{row.original.reason}</span>
        ) : (
          ''
        )
      },
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <button
          onClick={() => handleDeleteRow(row.index)}
          className="btn btn-error"
        >
          Delete
        </button>
      ),
    },
  ]
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div className="flex gap-2 my-4">
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn ${
            filter === 'invalid' ? 'btn-primary' : 'btn-outline'
          }`}
          onClick={() => setFilter('invalid')}
        >
          Invalid
        </button>
        <button
          className={`btn ${
            filter === 'duplicates' ? 'btn-primary' : 'btn-outline'
          }`}
          onClick={() => setFilter('duplicates')}
        >
          Duplicates
        </button>
        <button
          className="btn btn-warning ml-auto"
          onClick={removeDuplicateRows}
        >
          Remove Duplicates
        </button>
      </div>

      <table className="table-auto border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-2 py-1 bg-gray-100 text-black"
                >
                  <div className="flex items-center gap-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <BarsArrowUpIcon
                        fontSize={14}
                        onClick={header.column.getToggleSortingHandler()}
                        className="h-6 w-6 cursor-pointer"
                      />
                    )}
                    {
                      {
                        asc: '🔝',
                        desc: '⬇️',
                      }[header.column.getIsSorted()]
                    }
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`${
                row.original.isInvalid
                  ? 'bg-secondary text-secondary-content'
                  : ''
              } ${
                row.original.isDuplicate
                  ? 'bg-neutral text-neutral-content'
                  : ''
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-2 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </div>
      <div className="join">
        <button
          className="btn join-item"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous Page
        </button>
        <button
          className="btn join-item"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next Page
        </button>
      </div>
      {filter === 'invalid' && (
        <button className="btn btn-error ml-2" onClick={deleteInvalidRows}>
          Delete All Invalid
        </button>
      )}
      <button onClick={downloadCSV} className="btn btn-primary mt-4">
        Download Cleaned CSV
      </button>
    </>
  )
}

export default PhoneTable
