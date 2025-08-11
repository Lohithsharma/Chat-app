import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Track mobile view
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // On mobile, if no chat selected, show nothing
  if (isMobile && !selectedConversation) return null;

  // On desktop/tablet if no chat selected, show welcome message
  if (!isMobile && !selectedConversation) {
    return (
      <div className="hidden sm:flex md:min-w-[450px] flex-col items-center justify-center w-full h-full p-4">
        <NoChatSelected />
      </div>
    );
  }

  return (
    <div
      id="message-container"
      className={`md:min-w-[450px] flex flex-col ${
        isMobile ? "mobile-active full-width-on-mobile-when-chat-open" : ""
      }`}
      style={isMobile ? { height: "100vh" } : { height: "100%" }}
    >
      {/* Back button - mobile only, sticky top */}
      {isMobile && (
        <div className="back-button-container sticky top-0 z-50 bg-gray-300 bg-opacity-90 backdrop-blur-md shadow-md p-2">
          <button
            className="text-gray-700 px-3 py-1 rounded w-full"
            onClick={() => setSelectedConversation(null)}
            aria-label="Back to chat list"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center h-12">
        <span className="label-text">To:</span>{" "}
        <span className="text-gray-900 font-bold ml-2">{selectedConversation?.fullName}</span>
      </div>

      {/* Messages container - scrollable and flex-grow on mobile */}
      <div className="messages-scroll-container px-4 flex flex-col" style={isMobile ? { flexGrow: 1, overflowY: "auto" } : { overflowY: "auto" }}>
        <Messages />
      </div>

      {/* Message input - sticky bottom on mobile */}
      <div className="message-input-wrapper px-4 py-2 border-t border-gray-300" style={isMobile ? { position: "sticky", bottom: 0, zIndex: 100, backgroundColor: "white" } : {}}>
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="text-center text-gray-200 font-semibold flex flex-col items-center gap-2 max-w-full overflow-hidden">
      <p className="text-base sm:text-lg md:text-xl break-words">
        Welcome 👋 {authUser.fullName} ❄
      </p>
      <p className="text-base sm:text-lg md:text-xl break-words">Select a chat to start messaging</p>
      <TiMessages className="text-4xl md:text-6xl mt-2" />
    </div>
  );
};
