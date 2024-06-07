import Link from "next/link";

const Menu = () => {
  return (
    <div className="bg-yellow-500 py-[50px]">
      <ul className="flex gap-2 justify-center">
        <li className="bg-purple-400 text-white px-[10px] py-[5px] hover:bg-orange-500 rounded-md">
          <Link href={"http://localhost:3000/adminHome"} target="_blank">
            adminHome
          </Link>
        </li>
        <li className="bg-purple-400 text-white px-[10px] py-[5px] hover:bg-orange-500 rounded-md">
          <Link href={"http://localhost:3000/adminFAQ"} target="_blank">
            adminFAQ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
