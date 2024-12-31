import {
  useTranscriptionForm,
  useTranscriptionFormDispatch,
} from "../TranscriptionFormContext/TranscriptionFormContext";

export const MetadataForm = () => {
  const { title, author } = useTranscriptionForm();
  const dispatch = useTranscriptionFormDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_TITLE", payload: event.target.value });
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_AUTHOR", payload: event.target.value });
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
