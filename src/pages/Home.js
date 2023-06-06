import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import homeImage from "../assets/home-image.png";
import Modal from "../components/Modal";
import AddProduct from "../components/AddProduct";
import { profileUser } from "../api/service";
import Login from "../components/Login";
import Axios from "axios";
import commentLogo from "../assets/comment.svg";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  let token = localStorage.getItem("token");
  const pageInit = () => {
    profileUser(token).then((req, res) => {
      if (req.data.status !== "failed") {
        setIsUserLoggedIn(true);
      } else {
      }
    });
  };

  useEffect(() => {
    pageInit();
  }, []);

  const [categories, setCategories] = useState();
  const [products, setProducts] = useState([]);
  const [fixedProducts, setFixedProducts] = useState([]);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/products/", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setFixedProducts(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    pageInit();
  }, []);

  useEffect(() => {
    if (fixedProducts) {
      getByCategory();
      console.log(categories);
    }
  }, [fixedProducts]);

  const getByCategory = () => {
    if (fixedProducts) {
      const categories = new Set();
      fixedProducts.map(({ category }) => {
        categories.add(category);
      });
      setCategories(categories);
    }
  };

  return (
    <>
      <Header />
      <div className="flex md:flex-row flex-col">
        <img
          src={homeImage}
          alt="Home"
          className="sm:ml-16 w-full lg:w-1/3 md:w-1/3"
        ></img>
        <div className="flex flex-col md:mx-32 mx-4 sm:2">
          <p className="md:text-4xl sm:text-3xl text-2xl font-bold lg:mt-48 md:mt-24 items-center">
            Add your products and give your valuable feedback
          </p>
          <p className="mt-2 px-2 sm:mt-4 lg:px-12 md:px-2">
            Easily give your feedback in a matter of minutes. Access your
            audience on all platforms. Observe result manually in real time
          </p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="flex flex-col sm:w-1/4">
          <div className="sm:ml-12 w-0 h-0 sm:w-4/5 sm:h-28 bg-bluePrimary sm:rounded-lg my-4">
            <p className="text-white text-3xl my-4">Feedback</p>
            <p className="text-white">Apply filter</p>
          </div>
          <div className="sm:invisible text-start text-xl text-greyPrimary sm:mb-0 sm:h-0 mb-4 ml-6">
            Filters:
          </div>
          <div className="mx-4 sm:mx-0 sm:ml-12 sm:w-4/5 sm:h-auto sm:pr-5 sm:pl-2 bg-white sm:border sm:border-greyPrimary sm:grid sm:grid-cols-2 sm:gap-4 grid grid-cols-4 gap-2 sm:shadow-4xl sm:rounded-lg">
            <p className="text-white my-1 sm:mt-4 w-min min-w-full  bg-bluePrimary flex flex-col justify-center h-10 rounded-2xl">
              All
            </p>
            {categories &&
              Array.from(categories).map((category) => (
                <p className="text-bluePrimary my-1 sm:mt-4 w-min min-w-full  bg-greyLight flex flex-col justify-center h-10 rounded-2xl">
                  {category}
                </p>
              ))}
            <p className="text-bluePrimary my-1 sm:mt-4 w-min min-w-full  bg-greyLight flex flex-col justify-center h-10 rounded-2xl">
              Fintech
            </p>
            <p className="text-bluePrimary my-1 w-min min-w-full  bg-greyLight flex flex-col justify-center h-10 rounded-2xl">
              Edtech
            </p>
            <p className="text-bluePrimary my-1 w-min min-w-full  bg-greyLight flex flex-col justify-center h-10 rounded-2xl">
              B2B
            </p>
            <p className="text-bluePrimary my-1 w-min min-w-full mx-2 bg-greyLight flex flex-col justify-center h-10 rounded-2xl">
              SaaS
            </p>
            <p className="text-bluePrimary my-1 w-min min-w-full mx-2 bg-greyLight flex flex-col justify-center h-10 rounded-2xl">
              Agritech
            </p>
            <p className="text-bluePrimary my-1 w-min min-w-full mx-2 bg-greyLight flex flex-col justify-center h-10 rounded-2xl">
              Medtech
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:w-2/3 sm:h-1/2 sm:mt-4">
          <div className="flex flex-row justify-between border border-[#36416A] rounded-lg">
            <div className="flex flex-row justify-center px-2 m-2">
              <div className="text-black font-bold mt-2">10 suggestions</div>
              <div className="ml-2 text-greyPrimary mb-2">
                Sort by:{" "}
                <div className="relative inline-block h-8 sm:w-2/3 w-1/4">
                  <select className="block appearance-none w-full bg-bluePrimary border-[#161b22] border-2 md:pl-2 text-[#d7dfe7] py-2 px-1 pr-8 rounded-md leading-tight focus:outline-none ">
                    <option value="Upvotes (Ascending)">
                      Upvotes (Ascending)
                    </option>
                    <option value="Upvotes (Descending)">
                      Upvotes (Descending)
                    </option>
                    <option value="Comments (Ascending)">
                      Comments (Ascending)
                    </option>
                    <option value="Comments (Descending)">
                      Comments (Descending)
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 mt-2 flex items-center pr-2 text-white">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-bluePrimary text-white px-4 py-2 m-2 rounded-lg"
              onClick={toggleModal}
            >
              + Add Product
            </div>
          </div>
          {products &&
            products.map((product) => (
              <div className="flex flex-row mt-4 bg-greyLighter items-start rounded-md">
                <img
                  src={product.logoUrl}
                  alt={"Logo"}
                  className="ml-4 mt-4 mb-10 h-16 w-16 inline rounded-full object-cover"
                />
                <div className="flex flex-col ml-6 items-start">
                  <p className="mt-3 text-xl font-semibold">{product.name}</p>
                  <p className="mt-1 text-sm ">{product.description}</p>
                  <div className="flex flex-row mt-3">
                    <span className="text-sm bg-[#C0CEFF] py-1 px-4 rounded-xl text-bluePrimary ">
                      {product.category}
                    </span>
                    <div className="flex flex-row cursor-pointer">
                      <img
                        src={commentLogo}
                        alt={"Comment"}
                        className="ml-6 w-5"
                      />
                      <span className="text-[#ABABAB] ml-2">Comment</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          {isUserLoggedIn ? (
            <AddProduct toggleModal={toggleModal} />
          ) : (
            <Login setIsUserLoggedIn={setIsUserLoggedIn} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Home;
