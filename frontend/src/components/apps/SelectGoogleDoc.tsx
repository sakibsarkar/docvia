import useDebounce from "@/hooks/useDebounce";
import { useGoogleDocListQuery } from "@/redux/features/googleOAuth/googleOAuth.api";
import { IGoogleDoc } from "@/types";
import { Check, FileMinusCorner } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../ui/Skeleton";
// helper (optional)
const SkeletonRow = () => (
  <div className="flex items-start gap-3 border-b border-gray-200 bg-white p-3">
    {/* radio circle */}
    <Skeleton className="aspect-square w-[20px] rounded-full border border-gray-200" />
    {/* doc icon + text */}
    <div className="flex items-start gap-[10px]">
      <Image width={20} height={20} src={"/images/google/docs.png"} alt="" />
      <div className="min-w-0">
        <Skeleton className="h-4 w-48 rounded bg-gray-200" />
        <Skeleton className="mt-2 h-3 w-36 rounded bg-gray-100" />
      </div>
    </div>
  </div>
);

const SelectGoogleDoc = ({
  onDocSelect,
  defaultDocId,
}: {
  onDocSelect: (doc: IGoogleDoc) => void;
  defaultDocId?: string;
}) => {
  const [query, setQuery] = useState<Record<string, string | number | undefined>>({});
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [docFiles, setDocFiles] = useState<IGoogleDoc[]>([]);
  const { data, isFetching } = useGoogleDocListQuery(query);

  const [selectedFile, setSelectedFile] = useState<IGoogleDoc | null>(null);

  useEffect(() => {
    const files = data?.data?.files;
    if (!selectedFile) {
      const currentSelectedFile = files?.find((file) => file.id === defaultDocId);
      if (currentSelectedFile) {
        setSelectedFile(currentSelectedFile);
      }
    }

    if (files) {
      setDocFiles((prev) => [...prev, ...files]);
    }
  }, [data?.data?.files]);

  useEffect(() => {
    setDocFiles([]);
    setQuery({ searchTerm });
  }, [searchTerm]);

  return (
    <div className="w-full">
      <h4 className="mb-2 text-sm font-semibold text-gray-900">
        Select a Google Doc from your Drive
      </h4>
      <p className="mb-3 text-sm text-gray-500">
        Choose one document to link with your app.. You must select a document to continue.
      </p>

      <div className="mb-[10px]">
        <input
          type="text"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {docFiles?.length ? (
        <>
          <div
            role="group"
            aria-labelledby="doc-radio-group"
            className="max-h-[50vh] overflow-y-auto"
          >
            {docFiles.map((doc) => {
              const isSelected = doc.id === selectedFile?.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedFile(doc);
                    onDocSelect(doc);
                  }}
                  className={`top-[0px] flex cursor-pointer items-start gap-3 border-b-[1px] border-border bg-white p-3 hover:bg-gray-50 ${
                    isSelected ? "sticky" : "static"
                  }`}
                >
                  <span
                    className={`center aspect-square w-[20px] shrink-0 rounded-full border-[1px] border-border ${
                      isSelected ? "bg-blue-500" : "bg-white"
                    }`}
                  >
                    {isSelected ? <Check className="size-4 text-white" /> : ""}
                  </span>
                  <div className="flex items-start justify-start gap-[10px]">
                    <Image width={20} height={20} src={"/images/google/docs.png"} alt="" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-gray-900">{doc.name}</div>
                      <span className="text-xs text-gray-500">
                        Last modified: {new Date(doc.modifiedTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {data?.data?.nextPageToken && !isFetching ? (
              <div className="center mt-[10px] w-full">
                <button
                  className="btn-primary"
                  onClick={() => setQuery({ ...query, nextPageToken: data?.data?.nextPageToken })}
                >
                  Load More
                </button>
              </div>
            ) : (
              ""
            )}

            {isFetching ? (
              <div
                role="status"
                aria-live="polite"
                className="max-h-[50vh] animate-pulse overflow-y-auto"
              >
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      ) : isFetching ? (
        <div
          role="status"
          aria-live="polite"
          className="max-h-[50vh] animate-pulse overflow-y-auto"
        >
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : (
        <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white ring-1 ring-gray-200 ring-inset">
              <FileMinusCorner className="h-6 w-6 text-gray-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900">No Google Docs found</h3>
              <p className="mt-1 text-sm text-gray-600">
                You need at least one Google Doc in your account to continue.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectGoogleDoc;
