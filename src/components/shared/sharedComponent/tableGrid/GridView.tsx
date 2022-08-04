/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import TableCells from './TableCells';
import Pagination from './Pagination';
import images from '../../utils/Images';

interface ownProps {
  data: any;
  children: any;
  // eslint-disable-next-line react/require-default-props
  pagination?: boolean;
  onItemChange?: any;
  draggable?: boolean;
  onDataStateChange?: any;
  onsortChange?: any;
  dataState?: any;
  total?: any;
  loading?: any;
  onListItemClick?: any;
  sort?: any;
}

export default function GridView(props: ownProps): JSX.Element {
  // const [sortOrder, setSortOrder] = useState('DESC');
  // const [sortColumn, setSortColumn] = useState('name');
  // const prevsortOrderRef = useRef('DESC');
  const {
    data,
    children,
    pagination,
    onItemChange,
    total,
    dataState,
    onDataStateChange,
    onsortChange,
    loading,
    onListItemClick,
    sort,
  } = props;
  const groupData = children?.map((i: any) => i?.props);

  // const onSort = (col: any, order: any): void => {
  //   console.log(col);
  //   if (col.field !== sortColumn) {
  //     setSortColumn(col.field);
  //   }
  //   console.log(sortColumn);
  //   if (prevsortOrderRef.current !== order) {
  //     setSortOrder(order);
  //   }
  //   prevsortOrderRef.current = order;
  // };

  return (
    <div>
      <div className='row'>
        <div className='table-bg'>
          <table className='table shadow-sm'>
            <thead>
              <tr>
                {groupData &&
                  groupData?.length > 0 &&
                  groupData?.map((i: any) => (
                    <th
                      onClick={() => i?.sortable && onsortChange(i)}
                      className={i?.sortable ? 'sortable' : ''}>
                      {i?.title}{' '}
                      {i?.sortable && i.field === sort.sortBy && (
                        <img
                          className='px-2'
                          src={sort.order === 1 ? images.icSortAsc : images.icSortDesc}
                          alt='sort'
                        />
                      )}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {!loading && data?.length > 0 ? (
                data?.map((i: any, index: any) => {
                  return (
                    <tr>
                      {groupData?.map((j: any) => (
                        <>
                          {j?.cell ? (
                            j?.cell({ dataItem: i, field: j?.field })
                          ) : (
                            <TableCells
                              width={j?.width}
                              displayText={j?.field === 'dataNumber' ? index + 1 : i[j?.field]}
                              type={j?.type}
                              dataItem={i}
                              onDataChange={onItemChange}
                              onListItemClick={onListItemClick}
                            />
                          )}
                        </>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr className='text-center w-100 col-12'>
                  <td colSpan={groupData?.length}>No Record Found</td>
                </tr>
              )}
            </tbody>
          </table>
          {pagination && data.length > 0 && (
            <>
              {/* <Paginations
                onPageChange={onDataStateChange}
                dataState={dataState}
                totalCount={total}
              /> */}
              <Pagination
                className='pagination-bar'
                currentPage={dataState?.skip}
                totalCount={total}
                pageSize={dataState?.take}
                dataState={dataState}
                onPageChange={(page: any) => onDataStateChange(page)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
