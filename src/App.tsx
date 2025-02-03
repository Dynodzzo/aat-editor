import { useState } from "react";
import { Lobby } from "./components/Lobby/Lobby";
import { TranscriptionEditor } from "./components/TranscriptionEditor/TranscriptionEditor";

function App() {
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  return (
    <>
      {isEditing && <TranscriptionEditor />}
      {!isEditing && <Lobby onStartEditing={handleStartEditing} />}
    </>
  );
}

export default App;
