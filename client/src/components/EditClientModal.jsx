import React, { useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { EDIT_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENT } from "../queries/clientQueries";

const EditClientModal = ({ toggleModal, client }) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone,
  });

  const [editClient] = useMutation(EDIT_CLIENT, {
    variables: {
      id: client.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    onError:(error)=>{
        alert(error)
            },
    refetchQueries: [{ query: GET_CLIENT, variables: { id: client.id } }],
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phone === ""
    ) {
      return alert("Please fiil all the fields.");
    }
    editClient()
      .then((res) => toggleModal())
      .catch((error) => alert(error));
  };

  const closeModal = () => {
    toggleModal();
  };

  return (
    <>
      <div
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-70  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-screen"
      >
        <div class="relative  mx-auto max-w-md h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={toggleModal}
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Edit client information
              </h3>
              <form onSubmit={onSubmit} class="space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Tony Stark"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                  ></input>
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                  ></input>
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="2547012345678"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleOnChange}
                  ></input>
                </div>
                <div className="flex flex-row  space-x-12 items-center justify-center">
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    class="text-red-600 flex items-center justify-center  hover:text-white border  border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <span className="">
                      <FaTrash className="mr-2"></FaTrash>
                    </span>{" "}
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditClientModal;
