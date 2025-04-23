import React, { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Patient } from "./DoctorDashboard"; 

type ChatMessage = {
  sender: "doctor" | "patient";
  message: string;
};

type CommunicationToolsProps = {
  activePatient: Patient;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommunicationTools: React.FC<CommunicationToolsProps> = ({
  activePatient,
  setIsChatOpen,
}) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "doctor", message: chatMessage },
      ]);
      setChatMessage("");

      // Simulate patient response
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "patient",
            message:
              "Thank you doctor. I'll be sure to follow your instructions carefully.",
          },
        ]);
      }, 2000);
    }
  };

  return (
    <div className="w-80 bg-white shadow-md border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare size={18} className="mr-2" />
          <h3 className="font-medium">Chat with Patient</h3>
        </div>
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-white hover:text-blue-200"
        >
          <X size={18} />
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "doctor" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg text-sm ${
                    msg.sender === "doctor"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              <MessageSquare size={24} className="mx-auto mb-2 text-gray-400" />
              <p>Start chatting with {activePatient.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
            placeholder="Type a message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
          />
          <button
            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
            onClick={sendChatMessage}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationTools;
