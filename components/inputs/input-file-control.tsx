/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Image, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type Props = {
 multiple?: boolean;
 name?: string;
 accept?: string;
 value?: FileList | null;
 onChange?: (files: FileList | null) => void;
 className?: string;
 icon?: React.ReactNode;
 disabled?: boolean;
}

export function InputFileControl({
 multiple = false,
 name = "",
 accept = "",
 // value = null,
 className = "",
 onChange,
 icon = <Image />,
 disabled = false,
}: Props) {

 const [fileViewer, setFileViewer] = useState<string[]>([]);

 const isImageFile = (file: File) => {
  return (
   file.type.startsWith("image/") ||
   /\.(jpg|jpeg|png|webp)$/i.test(file.name)
  );
 };

 // useEffect(() => {
 //  if (!value) return setFileViewer([]);

 //  const filesArray = Array.from(value);

 //  const isImage = (file: File) => {
 //   return (
 //    file.type.startsWith("image/") ||
 //    /\.(jpg|jpeg|png|webp)$/i.test(file.name)
 //   );
 //  };

 //  const readFilesAsBase64 = async () => {
 //   const base64Images = await Promise.all(
 //    filesArray.map((file) => {
 //     return new Promise<string>((resolve) => {
 //      if (isImage(file)) {
 //       const reader = new FileReader();
 //       reader.onloadend = () => resolve(reader.result as string);
 //       reader.readAsDataURL(file);
 //      } else {
 //       resolve(""); // No preview para archivos no imagen
 //      }
 //     });
 //    })
 //   );
 //   setFileViewer(base64Images.filter((b64) => b64));
 //  };

 //  readFilesAsBase64();
 // }, [value]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) {
   setFileViewer([]);
   onChange?.(null);
   return;
  }

  const fileArray = Array.from(files);

  fileArray.forEach((file) => {
   if (isImageFile(file)) {
    const reader = new FileReader();
    reader.onloadend = () => {
     setFileViewer((prev) => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(file);
   }
  });

  onChange?.(files);
 };

 return (
  <div className="grid gap-3">
   <div className="relative">
    <Input
     id={name}
     name={name}
     type="file"
     multiple={multiple}
     accept={accept}
     onChange={handleChange}
     className={cn(className)}
     disabled={disabled}
    />

    <Label
     htmlFor={name}
     className="absolute top-1/2 -translate-y-1/2 right-2"
    >
     {icon}
    </Label>

   </div>
   {fileViewer.length > 0 && (
    <div className="flex gap-2 aspect-square w-25 h-24 relative">
     <Button
      type="button"
      size={'icon'}
      className="rounded-full w-5 h-5 absolute top-1 right-2"
      variant={'destructive'}
      onClick={() => {
       setFileViewer([]);
       onChange?.(null);
      }}
      disabled={disabled}
     >
      <X />
     </Button>
     {fileViewer.map((src, idx) => (
      <img
       key={idx}
       src={src}
       alt={`preview-${idx}`}
       className="w-24 h-24 object-cover rounded border"
      />
     ))}
    </div>
   )}
  </div>
 );
}