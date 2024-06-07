"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FAQ = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const getFAQData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_GET_PATCH_FAQ_DATA;
      const res = await fetch(apiUrl);
      const myJsonData = await res.json();
      setData(myJsonData?.faqData[0]?.faqInfo[0]);
    };
    getFAQData();
    setIsClient(true);
  }, []);

  //console.log("Hi === ", data);

  return (
    <div className="bg-white">
      <h1>
        FAQ Component inside app directory (This is client side rendered
        component)
      </h1>
      <h2>Fetch all Faqs from Client Side</h2>
      <h2 className="text-red-500"> FAQ component (Client side)</h2>
      {isClient ? (
        <div className="w-[90%] mx-auto">
          <div>Favourite Fruit: {data?.fruit}</div>
          <div>Favourite Game: {data?.game}</div>
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

export default FAQ;
