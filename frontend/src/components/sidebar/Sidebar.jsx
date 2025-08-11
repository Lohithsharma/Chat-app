import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { selectedConversation } = useConversation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClass = `border-r border-slate-500 p-4 flex flex-col ${
    isMobile && selectedConversation ? "hidden-mobile" : ""
  }`;

  return (
    <div id="sidebar" className={sidebarClass}>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
