import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    setName(res.name);
    setAddress(res.address);
    setPhone(res.phone);
    setPincode(res.pincode);
  };

  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    console.log(res);
    toast.success("User Info Upadted Successfully", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handlePasswordSubmit = async () => {
    if (password == cpassword) {
      let data = { token: user.token, password, cpassword };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      console.log(res);
      toast.success("Password Updated Successfully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast.warning("Passwords don't match. Please enter the same value in both fields", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="container mx-auto my-8">
      <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <h1 className="text-3xl font-vold text-center">Update Your Account</h1>
      <div className="mx-4">
        <h2 className="font-semibold text-xl">1. Delivery Details</h2>
        <div className="flex my-4">
          <div className="px-2 w-1/2">
            <div>
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div>
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email(cannot change)
              </label>
              {user && user.token ? <input value={user.email} readOnly={true} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
            </div>
          </div>
        </div>
        <div className="flex my-4">
          <div className="px-2 w-full">
            <div>
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                Address
              </label>
              <textarea onChange={handleChange} value={address} type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="flex my-4">
          <div className="px-2 w-1/2">
            <div>
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                Phone
              </label>
              <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div>
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                PIN Code
              </label>
              <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <button onClick={handleUserSubmit} className="disabled:bg-pink-300 text-white m-2 mb-5 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
          Submit
        </button>
      </div>
      <div className="mx-4">
        <h2 className="font-semibold text-xl">2. Update password</h2>
        <div className="flex my-4">
          <div className="px-2 w-1/2">
            <div>
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                New Password
              </label>
              <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div>
              <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">
                Confirm Password
              </label>
              <input onChange={handleChange} value={cpassword} type="text" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <button onClick={handlePasswordSubmit} className="disabled:bg-pink-300 text-white m-2 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
