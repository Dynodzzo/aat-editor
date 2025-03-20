import clsx from "clsx";
import { Upload } from "iconoir-react";
import { useEffect, useRef, useState } from "react";
import { useAudioFileSelector } from "../../../../hooks/useAudioFileSelector";
import { updateAudioSource } from "../../../../store/features/audio.slice";
import { useAppDispatch } from "../../../../store/hooks";
import { Toast } from "../../../ui/Toast/Toast";

export const AudioFileImporter = () => {
  const { audioObjectURL, handleAudioFileChanged } = useAudioFileSelector();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isFileTypeWarningVisible, setIsFileTypeWarningVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (audioObjectURL) {
      dispatch(updateAudioSource(audioObjectURL));
    }
  }, [audioObjectURL, dispatch]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDraggingOver(false);
    // TODO: Handle multiple files
    const file = event.dataTransfer.files?.[0];

    if (!file.type.includes("audio")) return setIsFileTypeWarningVisible(true);

    handleAudioFileChanged(file);
  };

  const handleInputFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleAudioFileChanged(file);
    }
  };

  const handleDropZoneClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div
        className={clsx(
          "drop-zone custom-dashed-border flex flex-col items-center justify-center w-full h-[100px] rounded-lg",
          isDraggingOver ? "bg-violet-50 cursor-copy" : "bg-neutral-50 cursor-pointer"
        )}
        data-draggedover={isDraggingOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleDropZoneClick}
      >
        <Upload width={24} height={24} className="text-neutral-600" />
        <span className="text-neutral-600 text-sm">Drag & Drop or click to choose an audio file</span>
        <input ref={inputRef} type="file" accept="audio/*" onChange={handleInputFileChanged} hidden />
      </div>
      <Toast
        title="Warning"
        description="Please select an audio file"
        type="warning"
        isOpen={isFileTypeWarningVisible}
        onOpenChange={setIsFileTypeWarningVisible}
      />
    </>
  );
};
