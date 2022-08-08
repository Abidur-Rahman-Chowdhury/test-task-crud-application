import React from 'react';

const ShowImportData = ({ tableRows, values }) => {
  
  return (
      <>
    <h2 className='text-2xl font-bold mt-5 mb-5'>Imported Data</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
             
            <th></th>
                         

              {tableRows?.map((rows, index) => {
                return (
                  <>
                    

                    <th key={index}>{rows}</th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {values?.map((value, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  {
                          value?.map(val => <td>{ val}</td>)
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowImportData;
