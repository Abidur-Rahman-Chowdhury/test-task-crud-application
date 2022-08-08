import React, { useState } from 'react';
import CsvDownload from 'react-json-to-csv';
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from '../DeleteModal/DeleteModal';
import UpdateData from '../UpdateData/UpdateData';
import Papa from 'papaparse';
import ShowImportData from '../ShowImportData/ShowImportData';
const CreateData = () => {
  const [validateData, setValidateData] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [showImportData, setShowImportData] = useState(false);

  // parse csv data

  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  console.log(deleteData);

  const { data, refetch } = useQuery(['showData'], () =>
    fetch('https://vast-castle-09974.herokuapp.com/getData').then((res) =>
      res.json()
    )
  );
  console.log(data);

  const handelDelete = (id) => {
    fetch(`https://vast-castle-09974.herokuapp.com/deleteData/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('Data successfully deleted');
          refetch();
          setDeleteData(null);
        }
      });
  };
  const getFormData = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const status = e.target.status.value;
    const time = e.target.time.value;

    if (title === '' || description === '' || status === '' || time === '') {
      setValidateData(true);
    } else {
      const formData = {
        title,
        description,
        status,
        time,
      };
      setValidateData(false);
      fetch('https://vast-castle-09974.herokuapp.com/storeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success('Data creation successful');
            e.target.reset();
            refetch();
          }
        });
    }
  };
  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        setShowImportData(true)
      },
    });
  };
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold mt-7">Welcome To Web Application</h2>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto mt-10">
        <div className="card-body">
          <h2 className=" text-center text-2xl font-bold">Create Data</h2>
          <form onSubmit={getFormData}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Type title here"
                name="title"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Description</span>
              </label>
              <input
                type="text"
                placeholder="Type description here"
                name="description"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Status</span>
              </label>
              <input
                type="text"
                placeholder="Type status here"
                name="status"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Time</span>
              </label>
              <input
                type="time"
                name="time"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              {validateData && (
                <p className="text-error pt-3">
                  Please fill up all the data fields
                </p>
              )}
              <input
                type="submit"
                className="input input-bordered w-full max-w-xs mt-4 bg-primary text-white font-bold text-xl cursor-pointer "
                value="Create Data"
              />
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
      <div className="w-[95%] mx-auto">
        <div className="flex gap-2 justify-center items-center ">
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={changeHandler}
            className="border mt-4 bg-primary text-white p-2"
          />

          <h2 className="text-3xl font-bold mt-10 mb-5">Show Data</h2>
          <span>
            <CsvDownload
              data={data}
              filename="good_data.csv"
              className="btn btn-small mt-4 bg-primary rounded-md hover:bg-primary-focus"
            >
              Download
            </CsvDownload>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(({ _id, title, description, status, time }, index) => {
                const passingData = {
                  _id,
                  title,
                  description,
                  status,
                  time,
                };
                return (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td>{status}</td>
                      <td>{time}</td>
                      <td>
                        <label
                          htmlFor="my-modal-3"
                          class="btn modal-button btn-sm bg-success outline-none border-none mr-1 hover:bg-success"
                          onClick={() => setUpdateData(passingData)}
                        >
                          Update
                        </label>
                        <label
                          htmlFor="my-modal-3"
                          class="btn btn-sm bg-error modal-button outline-none border-none hover:bg-error"
                          onClick={() => setDeleteData(passingData)}
                        >
                          Delete
                        </label>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      { showImportData &&  <ShowImportData tableRows={tableRows} values={values}></ShowImportData>}
      {deleteData && (
        <DeleteModal
          deleteData={deleteData}
          handelDelete={handelDelete}
          refetch={refetch}
        ></DeleteModal>
      )}

      {updateData && (
        <UpdateData
          updateData={updateData}
          refetch={refetch}
          setUpdateData={setUpdateData}
        ></UpdateData>
      )}
    </>
  );
};

export default CreateData;
