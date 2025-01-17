import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../../Context/useContext";

export const MetadataForm = () => {
  const {
    transcriptionForm: { title, author },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_TRANSCRIPTION_TITLE", payload: event.target.value });
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_TRANSCRIPTION_AUTHOR", payload: event.target.value });
  };

  return (
    <fieldset>
      <legend>Metadata</legend>
      <div className="inputWrapper">
        <label htmlFor="title">
          Title
          <input id="title" type="text" value={title} onChange={handleTitleChange} />
        </label>
      </div>
      <div className="inputWrapper">
        <label htmlFor="author">
          Author
          <input id="author" type="text" value={author} onChange={handleAuthorChange} />
        </label>
      </div>
    </fieldset>
  );
};
