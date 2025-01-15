import { useState } from "react";
import { Lobby } from "./components/Lobby/Lobby";
import { TranscriptionState } from "./model/TranscriptionModel";
import { TranscriptionEditor } from "./components/TranscriptionEditor/TranscriptionEditor";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [initialFormState, setInitialFormState] = useState<TranscriptionState | undefined>();

  const handleStartEditing = (state?: TranscriptionState) => {
    setIsEditing(true);
    if (state) setInitialFormState(state);
  };

  return (
    <>
      {isEditing && <TranscriptionEditor initialFormState={initialFormState} />}
      {!isEditing && <Lobby onStartEditing={handleStartEditing} />}
    </>
  );
}

export default App;
