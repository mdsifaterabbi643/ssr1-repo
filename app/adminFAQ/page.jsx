"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminFAQ = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [fruit, setFruit] = useState("");
  const [game, setGame] = useState("");

  useEffect(() => {
    const getFAQData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_GET_PATCH_FAQ_DATA;
      const res = await fetch(apiUrl);
      const myJsonData = await res.json();
      setData(myJsonData?.faqData[0]?.faqInfo[0]);
      //setting up default values for form fields
      setFruit(myJsonData?.faqData[0]?.faqInfo[0]?.fruit);
      setGame(myJsonData?.faqData[0]?.faqInfo[0]?.game);
    };
    getFAQData();
    setIsClient(true);
  }, []);

  //console.log("Hi === ", data);

  const mysubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log("fruit: ", fruit);
    console.log("game: ", game);

    const apiUrl = process.env.NEXT_PUBLIC_GET_PATCH_FAQ_DATA;
    const res = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fruit: fruit,
        game: game,
      }),
    });

    if (!res.ok) {
      throw new Error("Error occurred in updating FAQ");
    }
    router.push("/adminFAQ");
    router.refresh();
    window.alert("FAQ Updated Successfully!");
  };

  return (
    <div>
      <h1>
        FAQ Admin page inside app directory (This is client side rendered page)
      </h1>
      <h2>Fetch all Faqs from Client Side</h2>
      <h2 className="text-red-500">Admin Panel FAQ (Client side)</h2>
      {isClient ? (
        <div className="w-[90%] mx-auto">
          <div>
            <form
              onSubmit={mysubmit}
              className="w-[90%] mx-auto border-2 border-slate-400"
            >
              <div className="flex flex-col flex-wrap">
                <div className="w-[60%] mx-auto">
                  <label
                    for="fruit"
                    className="text-white-600  font-bold text-xl"
                  >
                    fruit:
                  </label>
                  {isClient ? (
                    <textarea
                      type="text"
                      id="fruit"
                      name="fruit"
                      className="w-[98%] px-[5px] h-[50px] pt-[10px] max-h-[50px] min-h-[50px] border-none bg-white text-black text-[20px] text-center rounded-md"
                      value={fruit}
                      onChange={(e) => setFruit(e.target.value)}
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
                    game:
                  </label>
                  {isClient ? (
                    <textarea
                      type="text"
                      id="game"
                      name="game"
                      className="w-[98%] px-[5px] pt-[10px] h-[50px] max-h-[50px] min-h-[50px] border-none bg-white text-black text-[20px] text-center rounded-md"
                      value={game}
                      onChange={(e) => setGame(e.target.value)}
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
                  <button className="btn btn-sm bg-[#000080] text-white hover:bg-orange-500 hover: cursor-pointer">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
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

export default AdminFAQ;
