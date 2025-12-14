"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAppsQuery } from "@/redux/features/apps/apps.api";
import type React from "react";
import { useEffect, useState } from "react";

interface Iprops {
  onChange: (appId: string) => void;
}
const AppSelector: React.FC<Iprops> = ({ onChange }) => {
  const { data, isLoading } = useGetAppsQuery({ fields: "appName,id,authorizedOrigin,status" });
  const apps = data?.data || [];
  const [selectedAppId, setSelectedAppId] = useState<string>();

  useEffect(() => {
    const apps = data?.data || [];
    if (apps.length >= 1 && !selectedAppId) {
      const defaultAppId = apps[0].id;

      setSelectedAppId(defaultAppId);
      onChange(defaultAppId);
    }
  }, [data?.data, selectedAppId, onChange]);

  const handleValueChange = (value: string) => {
    setSelectedAppId(value);
    onChange(value);
  };

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-[10px]">
      <h3 className="text-foreground">Select an app</h3>
      <Select onValueChange={handleValueChange} disabled={isLoading} value={selectedAppId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={isLoading ? "Loading apps..." : "Select an app"} />
        </SelectTrigger>
        <SelectContent>
          {apps.length === 0 && !isLoading ? (
            <div className="px-2 py-6 text-center text-sm text-muted-foreground">
              No apps available
            </div>
          ) : (
            apps.map((app) => (
              <SelectItem key={app.id} value={app.id}>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{app.appName}</span>
                  <span className="text-xs text-muted-foreground">{app.authorizedOrigin}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AppSelector;
