import FAQ from "@/app/components/FAQ";
import Menu from "@/app/components/Menu";
import "@/app/globals.css";

import Link from "next/link";

export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_GET_USER;
  const res = await fetch(apiUrl);
  const data = await res.json();

  return {
    props: {
      data,
      revalidate: 30, // Revalidate data every 30 seconds
    },
  };
}

const Home = ({ data }) => {
  //console.log("=== ", data?.userData[0]?.userInfo);

  return (
    <div className="bg-sky-200 text-black py-[30px] text-center text-[20px]">
      <h1>
        Server side data fetching using getServerSideProps(pages directory)
      </h1>
      <Menu />
      <FAQ />
      {data?.userData[0]?.userInfo.map((item, index) => (
        <div key={index} className="border-[1px] border-black py-[50px]">
          <h4>
            <span className="text-[20px] font-bold mx-[10px]">username:</span>
            {item.username}
          </h4>
          <h4>
            <span className="text-[20px] font-bold mx-[10px]">address:</span>
            {item.address}
          </h4>
          <h4>
            <span className="text-[20px] font-bold mx-[10px]">phone:</span>
            {item.phone}
          </h4>
          <h4>
            <span className="text-[20px] font-bold mx-[10px]">role:</span>
            {item.role === 0 ? "General User" : "Admin"}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
