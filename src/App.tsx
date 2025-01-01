import { useState } from "react";
import { Lobby } from "./components/Lobby/Lobby";
import { TranscriptionForm } from "./components/TranscriptionForm/TranscriptionForm";
import { TranscriptionFormState } from "./components/TranscriptionForm/TranscriptionFormContext/TranscriptionFormContext";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [initialFormState, setInitialFormState] = useState<TranscriptionFormState | undefined>();

  const handleStartEditing = (state?: TranscriptionFormState) => {
    setIsEditing(true);
    if (state) setInitialFormState(state);
  };

  if (!isEditing) {
    return <Lobby onStartEditing={handleStartEditing} />;
  }
  return <TranscriptionForm initialFormState={initialFormState} />;
}

export default App;
