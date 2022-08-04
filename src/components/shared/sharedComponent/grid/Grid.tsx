import React, { PureComponent } from 'react';

export interface GridProps {
  headerData: any;
  data: any;
  // handlePageChange
}
class Grid extends PureComponent<GridProps, {}> {
  render(): React.ReactElement {
    const { data, headerData } = this.props;
    return (
      <>
        <div
          id='panelsStayOpen-collapseOne'
          className='accordion-collapse collapse show'
          aria-labelledby='panelsStayOpen-headingOne'>
          <div className='accordion-body'>
            <div id='resultsContainer' className='table-responsive'>
              <table className='table  resultsTable'>
                <thead>
                  <tr>
                    {headerData &&
                      headerData.map((i: any) => (
                        <th className='colHeading' scope='col'>
                          <span>{i.columnName}</span>
                          <span
                            data-sortField='product'
                            data-sortMode=''
                            className='sortToggle sortInactive'
                          />
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    headerData &&
                    data.map((i: any, index: any) => (
                      <tr>
                        <th>{i[headerData[index].columnName]}</th>
                        <th>HN</th>
                        <th>CANOPY HEALTH - HILL PHYSICIANS SAN FRANCISCO</th>
                        <th>*</th>
                        <th>*</th>
                        <th>*</th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <span id='totalCount me-2'>222 Items -- Page 1 of 28</span>
            <button type='button' className='buttonBlue buttonPagination ms-3'>
              {' '}
              &lt;{' '}
            </button>
            <button type='button' className='buttonBlue buttonPagination me-3'>
              {' '}
              &gt;{' '}
            </button>
            <button type='button' className='buttonBlue mt-2 mt-sm-0'>
              Add Entry
            </button>
            {/* <span id='scrollForMoreRows' className="scrollMore">Scroll for more rows &#5121;</span> */}
            <span className=' float-sm-end mt-2 mt-sm-0'>
              Rows Per Page{' '}
              <select id='rowsPerPage'>
                <option value='8'>8</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </select>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Grid;
