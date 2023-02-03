import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const Slug = ({ buyNow, addToCart, product, variants, error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    if (!error) {
      setColor(product.color);
      setSize(product.size);
    }
  }, [router.query]);

  const checkPin = async () => {
    if (pin.length < 6) {
      return;
    }
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("PIN code is servicable", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error("Sorry! PIN code is not servicable", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newSize][newColor]["slug"]}`;
    router.push(url);
  };

  if (error) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-12 object-cover object-top rounded" src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/{product.color})
              </h1>
              {/* Reviews and Sharing */}
              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}
              <p className="leading-relaxed">{product.desc}</p>
              {/* Color and Size */}
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* Color */}
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {size && Object.keys(variants[size]).includes("red") && (
                    <button
                      onClick={() => {
                        refreshVariant(size, "red");
                        setColor("red");
                      }}
                      className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === "red" ? "border-black" : "border-gray-300"}`}
                    ></button>
                  )}
                  {size && Object.keys(variants[size]).includes("yellow") && (
                    <button
                      onClick={() => {
                        refreshVariant(size, "yellow");
                        setColor("yellow");
                      }}
                      className={`border-2 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${color === "yellow" ? "border-black" : "border-gray-300"}`}
                    ></button>
                  )}
                  {size && Object.keys(variants[size]).includes("green") && (
                    <button
                      onClick={() => {
                        refreshVariant(size, "green");
                        setColor("green");
                      }}
                      className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === "green" ? "border-black" : "border-gray-300"}`}
                    ></button>
                  )}
                  {size && Object.keys(variants[size]).includes("purple") && (
                    <button
                      onClick={() => {
                        refreshVariant(size, "purple");
                        setColor("purple");
                      }}
                      className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${color === "purple" ? "border-black" : "border-gray-300"}`}
                    ></button>
                  )}
                  {size && Object.keys(variants[size]).includes("blue") && (
                    <button
                      onClick={() => {
                        refreshVariant(size, "blue");
                        setColor("blue");
                      }}
                      className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === "blue" ? "border-black" : "border-gray-300"}`}
                    ></button>
                  )}
                </div>
                {/* Size */}
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariant(e.target.value, color);
                        setSize(value);
                      }}
                      className="rounded border appearance-none py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      {color && Object.keys(variants).includes("S") && Object.keys(variants["S"]).includes(color) && <option value={"S"}>S</option>}
                      {color && Object.keys(variants).includes("M") && Object.keys(variants["M"]).includes(color) && <option value={"M"}>M</option>}
                      {color && Object.keys(variants).includes("L") && Object.keys(variants["L"]).includes(color) && <option value={"L"}>L</option>}
                      {color && Object.keys(variants).includes("XL") && Object.keys(variants["XL"]).includes(color) && <option value={"XL"}>XL</option>}
                      {color && Object.keys(variants).includes("XXL") && Object.keys(variants["XXL"]).includes(color) && <option value={"XXL"}>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty <= 0 ? <span className="title-font font-medium text-2xl text-gray-900">Out of Stock!</span> : <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
                <button disabled={product.availableQty <= 0} onClick={() => buyNow(slug, 1, product.price, product.title, size, color)} className="flex disabled:bg-pink-300 ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Buy Now
                </button>
                <button disabled={product.availableQty <= 0} onClick={() => addToCart(slug, 1, product.price, product.title, size, color)} className="flex disabled:bg-pink-300 ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Add to Cart
                </button>
                {/* Wishlist button */}
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="flex mt-6 space-x-2 text-sm">
                <input type="text" minLength={6} onChange={onChangePin} className="px-2 border-2 border-gray-400 rounded-md" placeholder="Enter PIN Code" />
                <button onClick={checkPin} className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Check
                </button>
              </div>
              {!service && service != null && <div className="text-red-700 text-sm mt-3">Sorry! We do not deliver to this PIN code yet</div>}
              {service && service != null && <div className="text-green-700 text-sm mt-3">Yay! This PIN code is servicable</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  mongoose.set("strictQuery", true);
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let error=null;
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title, category: product.category });
  let sizeColorSlug = {};

  for (let item of variants) {
    if (Object.keys(sizeColorSlug).includes(item.size)) {
      sizeColorSlug[item.size][item.color] = { slug: item.slug };
    } else {
      sizeColorSlug[item.size] = {};
      sizeColorSlug[item.size][item.color] = { slug: item.slug };
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(sizeColorSlug)) },
  };
}

export default Slug;
