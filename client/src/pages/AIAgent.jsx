import React from "react";
import AgentChat from "../AIchat/AgentChat";
// import AgentPanel from "../AIchat/AgentPanel";

const AIAgent = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">AI Agent</h1>
      <div className="w-full max-w-2xl">
        {/* <AgentPanel /> */}
        <AgentChat />
      </div>
    </div>
  );
};

export default AIAgent;
