import { Routes, Route } from "react-router-dom";
import ZensiPage from "./ZensiPage";
import ClaudeModalPage from "./pages/ClaudeModalPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ClipsPage from "./pages/ClipsPage";
import UserCard from "./components/UserCard.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ZensiPage />} />
      <Route path="/claude-modal" element={<ClaudeModalPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/clips" element={<ClipsPage />} />
      <Route
        path="/user-card"
        element={
          <UserCard
            name="Ada Lovelace"
            email="ada@example.com"
            role="Engineer"
            isActive={true}
          />
        }
      />
    </Routes>
  );
}

export default App;
