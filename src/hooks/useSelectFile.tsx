import { useState } from "react";

export const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const onSelectedFile = (event: { target: HTMLInputElement }) => {
    const { files } = event.target;

    const reader = new FileReader();

    if (files?.[0]) {
      reader.readAsDataURL(files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return { selectedFile, setSelectedFile, onSelectedFile };
};
