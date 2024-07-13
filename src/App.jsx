import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { dish as dishData } from "../lib/data";

function App() {
  const [dish, setDish] = useState(dishData);
  const [currentDish, setCurrentDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (dish) => {
    setCurrentDish(dish);
    setIsModalOpen(true);
  };

  const handleAccept = () => {
    setDish((prevDish) =>
      prevDish.map((item) =>
        item.dishId === currentDish.dishId
          ? { ...item, isPublished: !item.isPublished }
          : item
      )
    );
    setIsModalOpen(false);
  };

  const handleDecline = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32">
      <h1 className="text-black font-bold text-2xl mb-8">Elevate your culinary journey with our interactive food dashboard.</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase dark:text-gray-400 text-lg">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Dish Id
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                Dish Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Image-Url
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dish.map((item) => {
              return (
                <tr
                  key={item.dishId}
                  className="border-b border-gray-200 dark:border-gray-700 text-lg"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {item.dishId}
                  </th>
                  <td className="px-6 py-4 bg-gray-50">{item.dishName}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {item.imageUrl}
                  </td>
                  <td
                    className="px-6 py-4 cursor-pointer bg-gray-50"
                    style={{ color: item.isPublished ? "orange" : "green" }}
                  >
                    <button
                      onClick={() => handleButtonClick(item)}
                      className={`block text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        item.isPublished
                          ? "bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
                          : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Publish"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          id="static-modal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentDish.isPublished
                    ? "Unpublish Dish"
                    : "Publish Dish"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleDecline}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {currentDish.isPublished
                    ? "Are you sure you want to unpublish this dish?"
                    : "Are you sure you want to publish this dish?"}
                </p>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={handleAccept}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {currentDish.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={handleDecline}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
