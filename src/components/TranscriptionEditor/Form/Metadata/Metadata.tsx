import { useAppContext, useAppDispatch } from "../../../Context/Context";

export const MetadataForm = () => {
  const {
    transcriptionForm: { title, author },
  } = useAppContext();
  const dispatch = useAppDispatch();

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
