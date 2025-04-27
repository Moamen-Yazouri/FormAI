"use client";

import type React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import clsx from "clsx";

interface IProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  isPreview: boolean;
}

const StyledFormTemplate = (props: IProps) => {
  const {
    title,
    description,
    children,
    onSubmit,
    onCancel,
    isSubmitting,
    submitLabel = "Save",       // ✅ Default label
    cancelLabel = "Cancel",     // ✅ Default label
    isPreview,
  } = props;

  return (
    <div
      className={clsx(
        isPreview ? "max-w-3xl mx-auto p-8" : "w-full p-10",
        "bg-gradient-to-tr from-purple-100 via-purple-50 to-purple-200 min-h-screen flex items-center justify-center"
      )}
    >
      <Card className="w-full rounded-2xl border border-purple-300 shadow-xl overflow-hidden py-0">
        <CardHeader className="bg-gradient-to-r from-purple-200 to-purple-300 px-8 py-6 border-b border-purple-300">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onCancel}
                  className="h-10 w-10 rounded-full hover:bg-purple-200/50 transition"
                >
                  <ArrowLeft className="h-5 w-5 text-purple-700" />
                </Button>
              )}
              <h1 className="text-2xl font-bold text-purple-700">{title}</h1>
            </div>
            {description && (
              <p className="text-sm text-purple-600">{description}</p>
            )}
          </div>
        </CardHeader>

        <form onSubmit={onSubmit} id="styled-form">
          <CardContent className="p-8 space-y-6">
            {children}
          </CardContent>

          <CardFooter className="flex justify-end gap-4 py-6 px-8 bg-purple-50 border-t border-purple-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-900 transition font-semibold"
            >
              {cancelLabel}
            </Button>
            <Button
              type="submit"
              form="styled-form"
              disabled={isSubmitting}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  {submitLabel}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default StyledFormTemplate;
