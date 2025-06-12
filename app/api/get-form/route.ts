import { connection } from "@/DB/connection";
import formsService from "@/module/services/forms.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await connection()
    try {
      const { id } = await req.json();

      if (!id) {
        return NextResponse.json(
          { error: "Please provide a form id!" },
          { status: 400 }
        );
      }

      const form = await formsService.getFormById(id);
      if (!form) {
        return NextResponse.json(
          { error: "Form not found!" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { form },
        { status: 200 }
      );
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json(
          { error: err.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
};
