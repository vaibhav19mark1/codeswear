import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image src={"/logo.webp"} alt="Logo" width={200} height={40} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <li>Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
          <Link href={"/stickers"}>
            <li>Stickers</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 md:top-3 mx-2 cursor-pointer flex">
        <Link href={"/login"}><MdAccountCircle className="text-xl md:text-3xl mx-2"/></Link>
        <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-3xl" />
      </div>

      {/* Side Cart */}
      <div
        ref={ref}
        className={`w-72 h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? "translate-x-0":"translate-x-full"}`}
      >
        <h2 className="text-xl font-bold text-center mb-2">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute right-2 top-5 text-2xl cursor-pointer text-pink-500">
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold ml-3">
          {Object.keys(cart).length == 0 && <div className="my-4 text-center font-semibold">Your Cart is Empty!</div>}
          {Object.keys(cart).map((itemCode) => {
            return (
              <li key={itemCode}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[itemCode].name}</div>
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
        <div className="font-bold my-2">SubTotal: ₹{subTotal}</div>
        <div className="flex">
          <Link href={"/checkout"}>
            <button
              className="flex mr-2 mt-2 text-white m-auto bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
              <BsFillBagCheckFill className="m-1" />
              CheckOut
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length == 0}
            onClick={clearCart}
            className="flex mr-2 mt-2 text-white m-auto bg-pink-500 border-0 py-2 px-2 hover:bg-pink-600 focus:outline-none rounded text-sm"
          >
            <BsFillBagCheckFill className="m-1" />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
