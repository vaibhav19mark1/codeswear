import Head from "next/head";
import Link from "next/link";
import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="container m-auto">
        <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
        <div className="mx-4">
          <h2 className="font-semibold text-xl">1. Delivery Details</h2>
          <div className="flex my-4">
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="flex my-4">
            <div className="px-2 w-full">
              <div>
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                  Address
                </label>
                <textarea
                  type="text"
                  id="address"
                  name="address"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="flex my-4">
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                  Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="flex my-4">
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                  PIN Code
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4">
          <h2 className="font-semibold text-xl">2. Review Cart & Pay</h2>
          <div className="sideCart bg-pink-100 p-6 m-2">
            <ol className="list-decimal font-semibold ml-3">
              {Object.keys(cart).length == 0 && <div className="my-4 text-center font-semibold">Your Cart is Empty!</div>}
              {Object.keys(cart).map((itemCode) => {
                return (
                  <li key={itemCode}>
                    <div className="item flex my-5">
                      <div className="font-semibold">{cart[itemCode].name}</div>
                      <div className="w-1/3 flex items-center justify-center font-semibold text-lg">
                        <AiFillMinusCircle
                          onClick={() => {
                            removeFromCart(itemCode, 1, cart[itemCode].price, cart[itemCode].name, cart[itemCode].size, cart[itemCode].variant);
                          }}
                          className="cursor-pointer text-pink-500"
                        />
                        <span className="mx-2 text-sm">{cart[itemCode].qty}</span>
                        <AiFillPlusCircle
                          onClick={() => {
                            addToCart(itemCode, 1, cart[itemCode].price, cart[itemCode].name, cart[itemCode].size, cart[itemCode].variant);
                          }}
                          className="cursor-pointer text-pink-500"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <span className="total">SubTotal: ₹{subTotal}</span>
          </div>
        </div>
        <div className="mx-8">
          {subTotal !== 0 && (
            <Link href={"/checkout"}>
              <button className="text-white m-auto bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
                Pay ₹{subTotal}
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
