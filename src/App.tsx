import { Toast } from "radix-ui";
import { useState } from "react";
import { Lobby } from "./components/Lobby/Lobby";
import { TranscriptionEditor } from "./components/TranscriptionEditor/TranscriptionEditor";

function App() {
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  return (
    <Toast.Provider swipeDirection="left">
      {isEditing && <TranscriptionEditor />}
      {!isEditing && <Lobby onStartEditing={handleStartEditing} />}
      <Toast.Viewport className="fixed bottom-0 left-0 z-[2147483647] m-0 flex min-w-80 max-w-[100vw] list-none flex-col gap-2.5 p-4 outline-none" />
    </Toast.Provider>
  );
}

export default App;
