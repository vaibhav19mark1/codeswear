import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState();
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted=["/checkout", "/order","/orders","/myaccount","/login","/signup","/forgot","/about","/"]
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (ref.current.classList.contains("translate-x-0")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };

  return (
    <>
      {dropdown && (
        <div onMouseOver={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className="absolute z-20 bg-white border shadow-lg right-14 top-10 px-5 py-2 w-32 rounded-md">
          <ul>
            <Link href={"/myaccount"}>
              <li className="py-1 text-sm hover:text-pink-700 font-bold">My Account</li>
            </Link>
            <Link href={"/orders"}>
              <li className="py-1 text-sm hover:text-pink-700 font-bold">Orders</li>
            </Link>
            <Link href={"/"}><li onClick={logout} className="py-1 text-sm hover:text-pink-700 font-bold">
              Logout
            </li>
            </Link>
          </ul>
        </div>
      )}
      <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white ${!sidebar && "overflow-hidden"}`}>
        <div className="logo mr-auto md:mx-5">
          <Link href={"/"}>
            <Image src={"/logo.webp"} alt="Logo" width={200} height={40} />
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}>
              <li className="hover:text-pink-600">Tshirts</li>
            </Link>
            <Link href={"/hoodies"}>
              <li className="hover:text-pink-600">Hoodies</li>
            </Link>
            <Link href={"/mugs"}>
              <li className="hover:text-pink-600">Mugs</li>
            </Link>
            <Link href={"/stickers"}>
              <li className="hover:text-pink-600">Stickers</li>
            </Link>
          </ul>
        </div>
        <div className="cart absolute items-center right-0 top-4 md:top-3 mx-5 cursor-pointer flex">
          {!user.value && (
            <Link href={"/login"}>
              <button className="bg-pink-600 text-sm text-white mx-2 px-2 py-1 rounded-md">Login</button>
            </Link>
          )}
          <span onMouseOver={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
            {user.value && <MdAccountCircle className="text-xl md:text-3xl mx-2" />}
          </span>
          <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-3xl" />
        </div>

        {/* Side Cart */}
        <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 bg-pink-100 px-8 py-10 transition-all ${sidebar ? "right-0" : "-right-96"}`}>
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
                    <div className="w-2/3 font-semibold">
                      {cart[itemCode].name}({cart[itemCode].size}/{cart[itemCode].variant})
                    </div>
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
              <button disabled={Object.keys(cart).length == 0} className="disabled:bg-pink-300 flex mr-2 mt-2 text-white m-auto bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
                <BsFillBagCheckFill className="m-1" />
                CheckOut
              </button>
            </Link>
            <button disabled={Object.keys(cart).length == 0} onClick={clearCart} className="disabled:bg-pink-300 flex mt-2 text-white m-auto bg-pink-500 border-0 py-2 px-2 hover:bg-pink-600 focus:outline-none rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
