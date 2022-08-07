import React from 'react';

const DeleteModal = ({deleteData,handelDelete}) => {
  return (
    <>
    
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this data?
          </h3>

          <div className="text-center">
            <div className="modal-action">
              <label
                htmlFor="my-modal-3"
                className="btn btn-error "
                onClick={()=>handelDelete(deleteData._id)}
              >
                Confirm
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
