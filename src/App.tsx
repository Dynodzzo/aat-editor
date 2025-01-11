import { useState } from "react";
import { Lobby } from "./components/Lobby/Lobby";
import { TranscriptionForm } from "./components/TranscriptionEditor/Form/Form";
import { TranscriptionFormState } from "./components/TranscriptionEditor/Form/FormContext/TranscriptionFormContext";

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
