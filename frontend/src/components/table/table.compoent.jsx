import React, { Fragment, forwardRef, useRef, useEffect } from 'react'
import { useTable, usePagination, useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  useRowSelect, } from 'react-table';

// import Pagination from '../pagination/pagination.component'

import uniqid from "uniqid";

// import makeData from './makeData'

const defaultPropGetter = () => ({})
let uId = uniqid()

export default function ReactTable({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  dataLength
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of using 'rows', we'll use page,
    prepareRow,

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable({
    columns,
    data,
    uId,
    initialState: { pageIndex: 0 },
    
  },
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  usePagination,
  useRowSelect,
    hooks => {
      hooks.flatColumns.push(columns => {
        return [
          {
            id: 'selection',
            // Make this column a groupByBoundary. This ensures that groupBy columns
            // are placed after it
            groupByBoundary: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            className: 'select-all',
            Header: ({ getToggleAllRowsSelectedProps }) => (
             
                <CheckBox {...getToggleAllRowsSelectedProps()} />
            
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              
                <CheckBox {...row.getToggleRowSelectedProps()} />
           
            ),
          },
          ...columns,
        ]
      })
    }
  )

  
  return (
    <Fragment>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr key={uId} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th 
               // Return an array of prop objects and react-table will merge them appropriately

                {...column.getHeaderProps([
                  {
                    className: column.className,
                    style: column.style,
                  },
                  getColumnProps(column),
                  getHeaderProps(column),
                  column.getSortByToggleProps()
                ])}
              >
                {column.render('Header')}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            // Merge user row props in
            <tr { ...row.getRowProps(getRowProps(row))}>
              {row.cells.map(cell => {
                return (
                  <td
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>

    {dataLength > 10 ? <div className="pagination">
    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
      {"<<"}
    </button>{" "}
    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
      {"<"}
    </button>{" "}
    <button onClick={() => nextPage()} disabled={!canNextPage}>
      {">"}
    </button>{" "}
    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
      {">>"}
    </button>{" "}
    <span>
      Page{" "}
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>{" "}
    </span>
    <span>
      | Go to page:{" "}
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
        style={{ width: "100px" }}
      />
    </span>{" "}
    <select
      value={pageSize}
      onChange={e => {
        setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map(pageSize => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  </div> : ''}
    </Fragment>
  )
}


const CheckBox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      
        <input type="checkbox" ref={resolvedRef} {...rest} />
     
    )
  }
)

// function App() {
//   const columns = React.useMemo(
//     () => [

//           {
//             Header: 'Service',
//             accessor: 'firstName',
//           },
//           {
//             Header: 'Subscriber',
//             accessor: 'lastName',
//           },
//       {
//             Header: 'Approval Status',
//             accessor: 'age',
//           },
//           {
//             Header: 'URL',
//             accessor: 'visits',
//           },
//           {
//             Header: 'Order Date',
//             accessor: 'status',
//           },
//           {
//             Header: 'Status',
//             accessor: 'progress',
//           },
//           {
//             Header: 'Approved by',
//             accessor: 'progress',
//           },
//           {
//             Header: 'Action',
//             accessor: 'progress',
//           },

//     ],
//     []
//   )

//   // const data = React.useMemo(() => makeData(20), [])

//   return (
//     <Styles>
//       <Table columns={columns} data={data} />
//     </Styles>
    
//   )
// }


