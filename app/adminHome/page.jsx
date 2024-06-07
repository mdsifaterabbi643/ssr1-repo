"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState([]);
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState([]);
  const [role, setRole] = useState([]);
  const [targetIndex, setTargetIndex] = useState();
  useEffect(() => {
    const getUserData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_GET_USER;
      const res = await fetch(apiUrl);
      const myJsonData = await res.json();
      setData(myJsonData?.userData[0]?.userInfo);

      //setting default values for form data
      setUsername(
        myJsonData?.userData[0]?.userInfo.map((item) => item.username)
      );
      setAddress(myJsonData?.userData[0]?.userInfo.map((item) => item.address));
      setPhone(myJsonData?.userData[0]?.userInfo.map((item) => item.phone));
      setRole(myJsonData?.userData[0]?.userInfo.map((item) => item.role));
    };
    getUserData();
    setIsClient(true);
  }, []);

  //console.log("Hi === ", data);

  const mysubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log("targetIndex: ", targetIndex);
    console.log("username: ", username[targetIndex]);
    console.log("address: ", address[targetIndex]);
    console.log("phone: ", phone[targetIndex]);
    console.log("role: ", role[targetIndex]);

    const apiUrl = process.env.NEXT_PUBLIC_PATCH_USER;
    const res = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username[targetIndex],
        address: address[targetIndex],
        phone: phone[targetIndex],
        targetIndex: targetIndex,
      }),
    });

    if (!res.ok) {
      throw new Error("Error occurred in updating single user");
    }
    router.push("/adminHome");
    router.refresh();
    window.alert("Single User Updated Successfully!");
  };

  return (
    <div>
      <h1>
        Home Admin page inside app directory (This is client side rendered page)
      </h1>
      <h2>Fetch all Users from Client Side</h2>
      <h2 className="text-red-500">Admin Panel (Client side)</h2>
      {isClient ? (
        <div className="w-[90%] mx-auto">
          {data?.map((item, index) => (
            <div key={index}>
              <form
                onSubmit={mysubmit}
                className="w-[90%] mx-auto border-2 border-slate-400"
              >
                <div className="flex flex-col flex-wrap">
                  <div className="w-[60%] mx-auto">
                    <label
                      for="username"
                      className="text-white-600  font-bold text-xl"
                    >
                      username:
                    </label>
                    {isClient ? (
                      <textarea
                        type="text"
                        id="title"
                        name="title"
                        className="w-[98%] px-[5px] h-[50px] pt-[10px] max-h-[50px] min-h-[50px] border-none bg-white text-black text-[20px] text-center rounded-md"
                        value={username[index]}
                        onChange={(e) => {
                          const updatedUserName = username.map((item, i) =>
                            index === i ? e.target.value : item
                          );
                          setUsername(updatedUserName);
                        }}
                      />
                    ) : (
                      <div>
                        <span className="loading loading-bars loading-xs"></span>
                        <span className="loading loading-bars loading-sm"></span>
                        <span className="loading loading-bars loading-md"></span>
                        <span className="loading loading-bars loading-lg"></span>
                      </div>
                    )}
                  </div>

                  <div className="w-[60%] mx-auto">
                    <label
                      for="username"
                      className="text-white-600  font-bold text-xl"
                    >
                      address:
                    </label>
                    {isClient ? (
                      <textarea
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        className="w-[98%] px-[5px] pt-[10px] h-[50px] max-h-[50px] min-h-[50px] border-none bg-white text-black text-[20px] text-center rounded-md"
                        value={address[index]}
                        onChange={(e) => {
                          const updatedAddress = address.map((item, i) =>
                            index === i ? e.target.value : item
                          );
                          setAddress(updatedAddress);
                        }}
                      />
                    ) : (
                      <div>
                        <span className="loading loading-bars loading-xs"></span>
                        <span className="loading loading-bars loading-sm"></span>
                        <span className="loading loading-bars loading-md"></span>
                        <span className="loading loading-bars loading-lg"></span>
                      </div>
                    )}
                  </div>

                  <div className="w-[60%] mx-auto">
                    <label
                      for="phone"
                      className="text-white-600  font-bold text-xl"
                    >
                      phone:
                    </label>
                    {isClient ? (
                      <textarea
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-[98%] px-[5px] pt-[10px] h-[50px] max-h-[50px] min-h-[50px] border-none bg-white text-black text-[20px] text-center rounded-md"
                        value={phone[index]}
                        onChange={(e) => {
                          const updatedPhone = phone.map((item, i) =>
                            index === i ? e.target.value : item
                          );
                          setPhone(updatedPhone);
                        }}
                      />
                    ) : (
                      <div>
                        <span className="loading loading-bars loading-xs"></span>
                        <span className="loading loading-bars loading-sm"></span>
                        <span className="loading loading-bars loading-md"></span>
                        <span className="loading loading-bars loading-lg"></span>
                      </div>
                    )}
                  </div>

                  <div className="w-[60%] mx-auto">
                    <label
                      for="role"
                      className="text-white-600  font-bold text-xl"
                    >
                      role:
                    </label>
                    {isClient ? (
                      <textarea
                        type="text"
                        id="role"
                        name="role"
                        className="w-[98%] px-[5px] pt-[10px] h-[50px] max-h-[50px] min-h-[50px] border-none bg-white text-black text-[20px] text-center rounded-md"
                        value={role[index]}
                        onChange={(e) => {
                          const updatedRole = phone.map((item, i) =>
                            index === i ? e.target.value : item
                          );
                          setRole(updatedRole);
                        }}
                      />
                    ) : (
                      <div>
                        <span className="loading loading-bars loading-xs"></span>
                        <span className="loading loading-bars loading-sm"></span>
                        <span className="loading loading-bars loading-md"></span>
                        <span className="loading loading-bars loading-lg"></span>
                      </div>
                    )}
                  </div>

                  <div className="mx-auto my-[20px] text-center hover:cursor-pointer">
                    <button
                      onClick={() => setTargetIndex(index)}
                      className="btn btn-sm bg-[#000080] text-white hover:bg-orange-500 hover: cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
      )}
    </div>
  );
};

export default Home;
