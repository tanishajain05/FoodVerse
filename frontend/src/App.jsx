import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import FoodRecognition from "./pages/FoodRecognition";
import FreshnessDetection from "./pages/FreshnessDetection";
import HygieneMonitor from "./pages/HygieneMonitor";
import CookingAssistant from "./pages/CookingAssistant";
import NutritionPlanner from "./pages/NutritionPlanner";
import { checkHealth } from "./utils/api";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [apiStatus, setApiStatus] = useState({ ready: true, vision_model: "qwen/qwen3.8-27b", text_model: "gpt-oss-120b" });

  useEffect(() => {
    checkHealth()
      .then((data) => {
        if (data.status === "healthy") {
          setApiStatus(data);
        }
      })
      .catch((err) => console.log("Backend offline or starting up:", err));
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "food":
        return <FoodRecognition />;
      case "freshness":
        return <FreshnessDetection />;
      case "hygiene":
        return <HygieneMonitor />;
      case "cooking":
        return <CookingAssistant />;
      case "nutrition":
        return <NutritionPlanner />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiStatus={apiStatus}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar
          activeTab={activeTab}
          onOpenDemo={() => setActiveTab("food")}
        />

        <main className="page-wrapper">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
