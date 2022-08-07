import React, { useState } from 'react';

const CreateData = () => {
  const [showData, setShowData] = useState([
    {
      title: 'Job',
      description: 'habijabi',
      status: 'kapjab',
      time: '11:12',
    },
  ]);
  console.log(showData);
  const getFormData = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const status = e.target.status.value;
    const time = e.target.time.value;

    const formData = {
      title,
      description,
      status,
      time,
    };

    setShowData([...showData,formData  ]);
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
              <input
                type="submit"
                className="input input-bordered w-full max-w-xs mt-4 bg-primary text-white font-bold text-xl"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
     
    </>
  );
};

export default CreateData;
