import {
  selectAuthor,
  selectFileAuthor,
  selectTitle,
  updateAuthor,
  updateFileAuthor,
  updateTitle,
} from "../../../../store/features/metadata.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { Input } from "../../../ui/Input/Input";
import { InputField } from "../../../ui/InputField/InputField";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { Typography } from "../../../ui/Typography/Typography";

export const MetadataForm = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectTitle);
  const author = useAppSelector(selectAuthor);
  const fileAuthor = useAppSelector(selectFileAuthor);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(event.target.value));
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAuthor(event.target.value));
  };

  const handleFileAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFileAuthor(event.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h2">Metadata</Typography>
      <div className="flex flex-col gap-1">
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
        <InputField>
          <Label>
            <LabelText htmlFor="fileAuthor">File author</LabelText>
          </Label>
          <Input id="fileAuthor" value={fileAuthor} variant="fill" onChange={handleFileAuthorChange} />
        </InputField>
      </div>
    </div>
  );
};
