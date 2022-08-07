import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateData = ({ updateData,refetch }) => {
    const { _id, title, description, status, time } = updateData;
    console.log(_id);
    const [updateValidation, setUpdateValidation] = useState(false);
    const handelUpdateData = (e) => {
        e.preventDefault();
        const updateTitle = e.target.title.value;
        const updateDescription = e.target.description.value;
        const updateStatus = e.target.status.value;
        const updateTime = e.target.time.value;
        const updatedData = {
            updateTitle,
            updateDescription,
            updateStatus,
            updateTime
        }
        console.log(updatedData);
     
        if (updateTitle === '' || updateDescription === '' || updateStatus === '' || updateTime === '') {
            setUpdateValidation(true);
        } else {
            
            fetch(`http://localhost:5000/updateData/${_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
              })
                .then((res) => res.json())
                .then((data) => {
                 console.log(data);
                });
        }
    }
  return (
    <>
     

      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
                  <h2 className='text-2xl font-bold'>Update Data</h2>
                  <form onSubmit={handelUpdateData} className='px-20 w-full'>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Type title here"
                name="title" defaultValue= {title}
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
                name="description" defaultValue={description}
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
                name="status" defaultValue={status}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Time</span>
              </label>
              <input
                type="time" 
                name="time" defaultValue={time}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              
               {updateValidation && <p className="text-error pt-3">
                  Please fill up all the data fields
                </p>}
             
              <input
                type="submit"
                className="input input-bordered w-full max-w-xs mt-4 bg-primary text-white font-bold text-xl cursor-pointer "
                value="Update Data"
              />
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateData;
