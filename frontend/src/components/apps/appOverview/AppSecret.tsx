import { useLazyGetAppSecretKeyByAppIdQuery } from "@/redux/features/apps/apps.api";
import { CircleCheck, Clipboard, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const AppSecret = ({ appId }: { appId: string }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [copiedAppId, setCopiedAppId] = useState(false);

  const [getSecretKey, { isLoading, data }] = useLazyGetAppSecretKeyByAppIdQuery();

  const copyAppId = async () => {
    if (isLoading) return;
    let key = data?.data?.apiKeyHash || "";

    if (!key) {
      const { data } = await getSecretKey(appId);
      key = data?.data?.apiKeyHash || "";
    }
    await navigator.clipboard.writeText(key);
    setCopiedAppId(true);
    setTimeout(() => setCopiedAppId(false), 1200);
  };

  const handleToggleSecret = async () => {
    if (isLoading) return;
    setShowSecret(!showSecret);

    if (!data?.data?.apiKeyHash) {
      await getSecretKey(appId);
    }
  };
  return (
    <div className="rounded-md">
      <label className="text-[13px] font-medium text-foreground">API Key</label>
      <p className="text-[12px] text-muted-foreground">
        Used when interacting with the API. This KEY is unique to your app and cannot be changed.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex flex-1 items-center justify-between gap-1 rounded-md border border-border bg-input px-3 py-2.5">
          <span className="flex flex-1 text-sm text-foreground">
            {isLoading && showSecret
              ? "Loading..."
              : showSecret
                ? data?.data?.apiKeyHash
                : "****************************"}
          </span>
          <button onClick={handleToggleSecret} type="button" className="w-fit shrink-0">
            {showSecret ? (
              <Eye className="h-4 w-4 cursor-pointer text-gray-600" />
            ) : (
              <EyeOff className="h-4 w-4 cursor-pointer text-gray-600" />
            )}
          </button>
        </div>
        <button
          type="button"
          onClick={copyAppId}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 md:w-[110px]"
        >
          {copiedAppId ? (
            <span className="flex items-center gap-1 text-green-600">
              <CircleCheck className="h-4 w-4" /> Copied
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Copy <Clipboard className="h-4 w-4" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AppSecret;
