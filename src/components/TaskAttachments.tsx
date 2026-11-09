
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import api from "../services/api";

interface Attachment {
  _id: string;
  originalName: string;
  size: number;
  createdAt: string;
  uploadedBy?: {
    name: string;
  };
}

interface Props {
  taskId: string;
}

export default function TaskAttachments({ taskId }: Props) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const queryKey = ["task-attachments", taskId];

  const { data, isLoading } = useQuery<{
    success: boolean;
    data: Attachment[];
  }>({
    queryKey,
    enabled: Boolean(taskId),
    queryFn: async () => {
      const response = await api.get(
        `/tasks/${taskId}/attachments`
      );
      return response.data;
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async (selectedFile: File) => {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await api.post(
        `/tasks/${taskId}/attachments`,
        formData
      );
    },
    onSuccess: () => {
      setFile(null);
      setError("");
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      setError("File upload failed.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (attachmentId: string) => {
      await api.delete(
        `/tasks/${taskId}/attachments/${attachmentId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  async function downloadAttachment(attachment: Attachment) {
    try {
      const response = await api.get(
        `/tasks/${taskId}/attachments/${attachment._id}/download`,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = attachment.originalName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Download failed.");
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold">
        Task Attachments
      </h3>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.txt,.docx,.xlsx"
          onChange={(event) => {
            setFile(event.target.files?.[0] || null);
          }}
          className="max-w-full text-sm"
        />

        <button
          type="button"
          disabled={!file || uploadMutation.isPending}
          onClick={() => {
            if (file) uploadMutation.mutate(file);
          }}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {uploadMutation.isPending
            ? "Uploading..."
            : "Upload"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {isLoading ? (
        <p>Loading attachments...</p>
      ) : data?.data.length === 0 ? (
        <p className="text-sm text-gray-500">
          No attachments yet.
        </p>
      ) : (
        <div className="space-y-2">
          {data?.data.map((attachment) => (
            <div
              key={attachment._id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 dark:border-zinc-700"
            >
              <div>
                <p className="text-sm font-medium">
                  {attachment.originalName}
                </p>
                <p className="text-xs text-gray-500">
                  {(attachment.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => downloadAttachment(attachment)}
                  className="rounded-lg border px-3 py-1 text-sm"
                >
                  Download
                </button>

                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() =>
                    deleteMutation.mutate(attachment._id)
                  }
                  className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
