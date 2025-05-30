import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

interface FileUploadOptions {
    maxSize?: number;
    allowedTypes?: string[];
}

type FileUploadStatus = "idle" | "uploading" | "success" | "error";

export const useFileUpload = (options: FileUploadOptions = {}) => {
    const [status, setStatus] = useState<FileUploadStatus>("idle");
    const [error, setError] = useState<string | null>(null);

    const uploadFileMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await apiClient.post("/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
    });

    const uploadMultipleFilesMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await apiClient.post(
                "/files/upload-multiple",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return data;
        },
    });

    const validateFile = (file: File): boolean => {
        if (options.maxSize && file.size > options.maxSize) {
            setError(
                `File size exceeds ${options.maxSize / 1024 / 1024}MB limit`
            );
            return false;
        }

        if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
            setError(`File type ${file.type} is not allowed`);
            return false;
        }

        return true;
    };

    const handleSingleUpload = async (file: File) => {
        try {
            setStatus("uploading");
            setError(null);

            if (!validateFile(file)) {
                setStatus("error");
                return null;
            }

            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadFileMutation.mutateAsync(formData);
            setStatus("success");
            return result;
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Upload failed");
            return null;
        }
    };

    const handleMultipleUpload = async (files: File[]) => {
        try {
            setStatus("uploading");
            setError(null);

            const validFiles = files.filter(validateFile);
            if (validFiles.length !== files.length) {
                setStatus("error");
                return null;
            }

            const formData = new FormData();
            validFiles.forEach((file) => {
                formData.append("files", file);
            });

            const result = await uploadMultipleFilesMutation.mutateAsync(
                formData
            );
            setStatus("success");
            return result;
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Upload failed");
            return null;
        }
    };

    return {
        uploadFile: handleSingleUpload,
        uploadMultipleFiles: handleMultipleUpload,
        status,
        error,
        isUploading: status === "uploading",
    };
};
