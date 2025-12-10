"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetAppWidgetByAppIdQuery,
  useUpdateAppWidgetByWidgetIdMutation,
} from "@/redux/features/apps/apps.api";
import { IQueryMutationErrorResponse } from "@/types";
import { IAppWidget } from "@/types/appWidget";
import { ChevronLeft, Loader, Save, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AppWidgetView = ({ appId }: { appId: string }) => {
  const [settings, setSettings] = useState<IAppWidget>({
    agentName: "Agent",
    agentPhoto: undefined,
    headerColor: "#3b82f6",
    headerTextColor: "#ffffff",
    agentMessageColor: "#1f2937",
    agentTextColor: "#ffffff",
    visitorMessageColor: "#3b82f6",
    visitorTextColor: "#ffffff",
    appId,
    createdAt: "",
    id: "",
    updatedAt: "",
  });

  const { data, isLoading } = useGetAppWidgetByAppIdQuery(appId);
  const [updateWidget, { isLoading: isUpdating }] = useUpdateAppWidgetByWidgetIdMutation();
  useEffect(() => {
    if (data?.data) {
      setSettings(data?.data);
    }
  }, [data]);
  const handleInputChange = (key: keyof IAppWidget, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        handleInputChange("agentPhoto", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (isUpdating) {
      return;
    }

    if (!settings.id) {
      return;
    }

    const res = await updateWidget({ widgetId: settings.id, payload: settings });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong. Please try again.");
      return;
    }

    toast.success("Widget updated successfully!");
  };

  const handleReset = () => {
    if (isUpdating || !data?.data) return;
    setSettings(data.data);
  };

  return (
    <div className="flex bg-background">
      {/* Left Panel - Options */}
      <div className="w-full border-r border-border bg-gradient-to-b from-card to-background/50">
        <div className="space-y-6 p-6">
          <div>
            <Link href="/dashboard/apps">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-foreground">WIDGET APPEARANCE</h2>

          <div className="bg-glow-blue space-y-4 rounded-lg border border-border/50 bg-muted/20 p-4">
            <h3 className="font-semibold text-foreground">Agent Information</h3>

            <div>
              <Label className="mb-2 block text-xs text-muted-foreground">Agent Name</Label>
              <Input
                type="text"
                value={settings.agentName}
                onChange={(e) => handleInputChange("agentName", e.target.value)}
                placeholder="Enter agent name"
                className="border-border bg-input text-foreground"
              />
            </div>

            <div>
              <Label className="mb-2 block text-xs text-muted-foreground">Agent Photo</Label>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-muted">
                  {settings.agentPhoto ? (
                    <Image
                      src={settings.agentPhoto || "/placeholder.svg"}
                      alt={settings.agentName}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="flex-1 border-border bg-input text-foreground"
                />
              </div>
              {settings.agentPhoto && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange("agentPhoto", null)}
                  className="mt-2 text-xs"
                >
                  Remove Photo
                </Button>
              )}
            </div>
          </div>

          {/* Widget Colors Section */}
          <div className="space-y-4 rounded-lg border border-border/50 bg-muted/20 p-4">
            <h3 className="font-semibold text-foreground">Widget Colors</h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Header", key: "headerColor" },
                { label: "Header Text", key: "headerTextColor" },
                { label: "Agent Message", key: "agentMessageColor" },
                { label: "Agent Text", key: "agentTextColor" },
                { label: "Visitor Message", key: "visitorMessageColor" },
                { label: "Visitor Text", key: "visitorTextColor" },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{item.label}</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings[item.key as keyof IAppWidget]}
                      onChange={(e) =>
                        handleInputChange(item.key as keyof IAppWidget, e.target.value)
                      }
                      className="h-10 w-10 cursor-pointer rounded border border-border"
                    />
                    <span className="self-center text-xs text-muted-foreground">
                      {settings[item.key as keyof IAppWidget]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex flex-1 items-center justify-center gap-[1px] bg-primary hover:bg-primary/90"
            >
              {isUpdating ? (
                <>
                  Saving... <Loader className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Save
                  <Save className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="sticky top-[20px] flex h-[600px] w-full max-w-[600px] flex-col items-center justify-center bg-gradient-to-br from-background via-background to-card/30 p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-4 font-semibold text-foreground">Desktop widget preview</h2>

          {/* Widget Preview Frame */}
          <div
            className="overflow-hidden rounded-lg border-8 border-gray-300 bg-white shadow-2xl transition-all"
            style={{
              width: `350px`,
              height: `520px`,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* Widget Header */}
            <div
              className="flex items-center justify-between p-4 font-semibold text-white"
              style={{ backgroundColor: settings.headerColor }}
            >
              <span>{settings.agentName || "Agent"}</span>
              <button type="button" className="text-sm">
                <X />
              </button>
            </div>

            {/* Widget Body */}
            <div className="flex h-full flex-col bg-white p-4">
              {/* Message Bubbles */}
              <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
                <div className="flex items-end gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {settings.agentPhoto ? (
                      <Image
                        src={settings.agentPhoto || "/placeholder.svg"}
                        alt={settings.agentName}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div
                    className="max-w-xs rounded-lg p-3 text-sm"
                    style={{
                      backgroundColor: settings.agentMessageColor,
                      color: settings.agentTextColor,
                    }}
                  >
                    Hello! How can we help you today?
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <div
                    className="max-w-xs rounded-lg p-3 text-sm"
                    style={{
                      backgroundColor: settings.visitorMessageColor,
                      color: settings.visitorTextColor,
                    }}
                  >
                    I have a question about your service
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {settings.agentPhoto ? (
                      <Image
                        src={settings.agentPhoto || "/placeholder.svg"}
                        alt={settings.agentName}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div
                    className="max-w-xs rounded-lg p-3 text-sm"
                    style={{
                      backgroundColor: settings.agentMessageColor,
                      color: settings.agentTextColor,
                    }}
                  >
                    I&apos;m here to help. What&apos;s your question?
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-300 pt-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWidgetView;
