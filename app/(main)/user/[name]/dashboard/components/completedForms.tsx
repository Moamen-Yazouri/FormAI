"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import React from "react";
import { IAnsweredForms } from "../types";
import { useRouter } from "next/navigation";

interface IProps {
  completedForms: IAnsweredForms[];
  name: string;
}

const CompletedForms = ({ completedForms, name }: IProps) => {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Completed Forms</h2>

      <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-cyan-900/40 border border-cyan-800/30 shadow-xl backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {completedForms.length === 0 ? (
              <div className="text-center text-slate-400">
                You haven't completed any forms yet.
              </div>
            ) : (
              completedForms.map((form) => (
                <div
                  key={form.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-cyan-700/30 bg-slate-900/40 hover:bg-cyan-900/10 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="bg-cyan-600/20 p-2 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-100">{form.title}</h3>
                      <p className="text-sm text-slate-400">Completed {form.date}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-cyan-500/20 text-cyan-300 bg-slate-900/30 hover:bg-cyan-700/20 hover:text-white transition-colors flex items-center gap-2"
                    onClick={() => router.push(`/user/${name}/responses-details`)}
                  >
                    Show All Responses Details <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletedForms;
