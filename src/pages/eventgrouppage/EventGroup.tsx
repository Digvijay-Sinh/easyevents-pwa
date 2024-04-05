/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
// import { io } from "socket.io-client";

const MessagingPage: React.FC = () => {
  useEffect(() => {
    // const socket = io("http://localhost:5000");
    // socket.on("connect", () => {
    //   console.log("Connected to server");
    // });
    // socket.on("disconnect", () => {
    //   console.log("Disconnected from server");
    // });
    // socket.on("message", (data: any) => {
    //   console.log("Message received:", data);
    // });
    // // Send a message
    // const sendMessage = () => {
    //   const message = "Hello, world!";
    //   socket.emit("message", message);
    // };
    // // Call the sendMessage function to send a message
    // sendMessage();
    // // Clean up the socket connection
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return (
    <div className="flex h-[85vh]">
      <div className="w-1/4 bg-gray-200">
        {/* Group names list */}
        <ul className="p-4">
          <li className="py-2">Group 1</li>
          <li className="py-2">Group 2</li>
          <li className="py-2">Group 3</li>
          {/* Add more group names here */}
        </ul>
      </div>
      <div className="w-3/4 bg-white">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">Group Name</div>
          <div className="flex-1 overflow-y-auto">
            {/* Messages for a particular group */}
            <div className="p-4">
              <div className="mb-4">Message 1</div>
              <div className="mb-4">Message 2</div>
              <div className="mb-4">Message 3</div>
              {/* Add more messages here */}
            </div>
          </div>
          <div className="p-4 border-t">
            {/* Input element to send messages */}
            <input
              type="text"
              placeholder="Type your message"
              className="w-full py-2 px-4 border border-gray-300 rounded"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
