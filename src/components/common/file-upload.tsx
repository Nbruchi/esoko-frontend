import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useFileUpload } from "@/hooks/queries/useFileUpload";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
    onUploadComplete?: (url: string) => void;
    onUploadError?: (error: string) => void;
    options?: FileUploadOptions;
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    className?: string;
}

export function FileUpload({
    onUploadComplete,
    onUploadError,
    options,
    multiple = false,
    accept,
    maxSize,
    className,
    ...props
}: FileUploadProps) {
    const { uploadFile, uploadMultipleFiles, status, error } = useFileUpload({
        ...options,
        maxSize: maxSize || options?.maxSize,
        allowedTypes: accept ? accept.split(",") : options?.allowedTypes,
    });

    const onDrop = React.useCallback(
        async (acceptedFiles: File[]) => {
            if (multiple) {
                const result = await uploadMultipleFiles(acceptedFiles);
                if (result) {
                    onUploadComplete?.(result[0].url);
                } else if (error) {
                    onUploadError?.(error);
                }
            } else {
                const result = await uploadFile(acceptedFiles[0]);
                if (result) {
                    onUploadComplete?.(result.url);
                } else if (error) {
                    onUploadError?.(error);
                }
            }
        },
        [
            uploadFile,
            uploadMultipleFiles,
            multiple,
            onUploadComplete,
            onUploadError,
            error,
        ]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple,
        accept: accept ? { [accept]: [] } : undefined,
        maxSize,
        onDragEnter: () => {},
        onDragLeave: () => {},
        onDragOver: () => {},
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/25 hover:border-primary/50",
                className
            )}
            {...props}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-muted-foreground">
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>
                            Drag & drop files here, or click to select files
                            {maxSize && (
                                <span className="block text-xs">
                                    Max size: {maxSize / 1024 / 1024}MB
                                </span>
                            )}
                        </p>
                    )}
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                >
                    Select Files
                </Button>
            </div>
            {status === "uploading" && (
                <div className="mt-4">
                    <Progress value={50} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                        Uploading...
                    </p>
                </div>
            )}
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </div>
    );
}
