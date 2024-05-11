"use client";

import { UploadCloudIcon, X } from "lucide-react";
import Image from "next/image";

import {
  FileWithPath,
  useDropzone,
  type DropzoneOptions,
} from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { convertFileToUrl } from "@/lib/utils";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Input } from "@/components/ui/input";

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 rounded-md",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
  className?: string;
  imageUrl?: string;
  setFile?: Dispatch<SetStateAction<File[]>>;
  disabled?: boolean;
  progressUploadImage: number;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
  onFieldChange: (url: string) => void;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const SingleImageDropzone = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      dropzoneOptions,
      imageUrl,
      className,
      disabled,
      setFile,
      onFieldChange,
      progressUploadImage,
    },
    ref
  ) => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
      setFile?.(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    }, []);

    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      disabled,
      onDrop,
    });

    // styling
    const dropZoneClassName = useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    // error validation messages
    const errorMessage = useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
        <div
          {...getRootProps({
            className: dropZoneClassName,
          })}
        >
          {/* Main File Input */}
          <Input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            // Image Preview
            <Image
              className="w-full object-cover object-center"
              src={imageUrl}
              fill
              alt="image"
            />
          ) : (
            // Upload Icon
            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
              <UploadCloudIcon className="mb-2 h-7 w-7" />
              <div className="text-gray-400">drag & drop to upload</div>
            </div>
          )}

          {/* Remove Image Icon */}
          {imageUrl && !disabled && (
            <>
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-md bg-black bg-opacity-70">
                <CircleProgress progress={progressUploadImage} />
              </div>
              <div
                className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                onClick={(e) => {
                  e.stopPropagation();
                  onFieldChange("");
                }}
              >
                <div className="flex h-7 w-7 items-center justify-center mt-5 mr-5 rounded-md border border-solid border-gray-500 bg-white">
                  <X className=" text-gray-500" width={18} height={18} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Error Text */}
        <div className="mt-2 text-xs">
          After this process is completed, the photo will be uploaded.
        </div>
        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      </div>
    );
  }
);
SingleImageDropzone.displayName = "SingleImageDropzone";

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 Bytes";
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { SingleImageDropzone };

function CircleProgress({ progress }: { progress: number }) {
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-16 w-16">
      <svg
        className="absolute top-0 left-0 -rotate-90 transform"
        width="100%"
        height="100%"
        viewBox={`0 0 ${(radius + strokeWidth) * 2} ${
          (radius + strokeWidth) * 2
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-gray-400"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
        />
        <circle
          className="text-white transition-all duration-300 ease-in-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={((100 - progress) / 100) * circumference}
          strokeLinecap="round"
          fill="none"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
        />
      </svg>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center text-xs text-white">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
