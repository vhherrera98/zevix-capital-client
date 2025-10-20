import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { ControllerFieldState } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormItem, FormMessage } from "../ui/form";
import { Skeleton } from "../ui/skeleton";
import { useI18n } from "@/hooks/use-i18n";

export enum AcceptedFileTypes {
 PDF = "application/pdf",
 JPEG = "image/jpeg",
 PNG = "image/png",
 DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
 MP4 = "video/mp4",
}

type FileUploaderProps = {
 title: string;
 description: string;
 buttonText: string;
 accept?: (AcceptedFileTypes | string)[];
 multiple?: boolean;
 value: File[];
 fieldState?: ControllerFieldState;
 onChange: (files: File[]) => void;
 disabled?: boolean;
}

export const FileUploader = ({
 title,
 description,
 buttonText,
 accept = [AcceptedFileTypes.PDF],
 multiple = false,
 value,
 onChange,
 fieldState,
 disabled
}: FileUploaderProps) => {

 const { t } = useI18n();

 const [mounted, setMounted] = useState<boolean>(false);
 const inputRef = useRef<HTMLInputElement>(null);
 const acceptString = accept.join(",");

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  if (files.length > 0) {
   onChange(multiple ? [...value, ...files] : [files[0]]);
  }
  e.target.value = ""; // resetear input
 };

 const removeFile = (index: number) => {
  const updated = value.filter((_, i) => i !== index);
  onChange(updated);
 };

 useEffect(() => setMounted(true), []);
 if (!mounted) return <Skeleton className="w-full h-[300px]" />

 return (
  <FormItem className="grid grid-cols-1 gap-1">

   <div
    className={cn(
     "flex flex-col cursor-pointer",
     disabled && "cursor-wait"
    )}
    onClick={() => inputRef.current?.click()}
   >
    <div className={cn(
     "flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-input px-6 py-14",
     fieldState?.error && "border-red-400",
     disabled && "opacity-55"
    )}>
     <div className="flex max-w-[480px] flex-col items-center gap-2">
      <h6 className={cn(
       "text-black/80 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center",
       fieldState?.error && "text-red-400",
      )}>{title}</h6>
      <p className={cn(
       "text-muted-foreground text-xs font-normal leading-normal max-w-[480px] text-center",
       fieldState?.error && "text-red-400/80",
      )}>{description}</p>
     </div>
     <Button
      type="button"
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-100"
      variant={fieldState?.error ? "destructive" : "secondary"}
      disabled={disabled}
     >
      <span className="truncate">{buttonText}</span>
     </Button>
    </div>
   </div>

   <input
    ref={inputRef}
    type="file"
    accept={acceptString}
    multiple={multiple}
    onChange={handleFileChange}
    className="hidden"
    disabled={disabled}
   />

   {value.length > 0 && (
    <div className="space-y-2 mt-4">
     <p className="text-xs font-medium text-gray-700 dark:text-muted-foreground">
      {t("input_upload_files")}: {value.length}
     </p>
     <ul className="space-y-1">
      {value.map((file, idx) => (
       <li
        key={idx}
        className="flex items-center justify-between border pl-3 pr-0 rounded-full py-0 bg-accent/70"
       >
        <span className="font-medium text-xs text-muted-foreground truncate max-w-[75%]">{file.name}</span>
        <Button
         type="button"
         onClick={() => removeFile(idx)}
         variant={'destructive'}
         size={'icon'}
         className="rounded-full"
         disabled={disabled}
        >
         <Trash />
        </Button>
       </li>
      ))}
     </ul>
    </div>
   )}
   <FormMessage />
  </FormItem>
 );
};
