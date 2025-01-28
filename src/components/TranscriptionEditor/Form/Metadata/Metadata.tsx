import { Input } from "../../../ui/Input/Input";
import { InputField } from "../../../ui/InputField/InputField";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { Typography } from "../../../ui/Typography/Typography";
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
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Metadata</Typography>
      <div className="flex flex-col gap-4">
        <InputField>
          <Label>
            <LabelText htmlFor="title">Title</LabelText>
          </Label>
          <Input id="title" value={title} variant="fill" onChange={handleTitleChange} />
        </InputField>
        <InputField>
          <Label>
            <LabelText htmlFor="author">Author</LabelText>
          </Label>
          <Input id="author" value={author} variant="fill" onChange={handleAuthorChange} />
        </InputField>
      </div>
    </div>
  );
};
