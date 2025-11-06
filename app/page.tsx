"use client"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Activity, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

// Personal Schema
const PersonalSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  phone: z.string().min(1, { error: "Contact is required." }),
  address: z.string().min(1, { error: "Address is required." }),
  age: z.string().min(1, { error: "Age is required." }),
})

// Education Schema
const EducationalSchema = z.object({
  degree: z.string().min(1, { error: "Degree is required." }),
  institute: z.string().min(1, { error: "Institute is required." }),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
})

// Combining Personal and Education Schema under single Schema for our form 
const resumeSchema = PersonalSchema.extend(EducationalSchema.shape)

export default function Page() {

  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    { name: "personal", schema: PersonalSchema },
    { name: "educational", schema: EducationalSchema },
  ] as const;

  const currentStep = steps[activeStep].name

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      age: "",
      degree: "",
      institute: "",
      startDate: null,
      endDate: null
    }
  })

  // from shadcn example of form with react hook form
  // link: https://ui.shadcn.com/docs/forms/react-hook-form
  function onSubmit(data: z.infer<typeof resumeSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full sm:max-w-md my-10 mx-auto">
      <CardHeader>
        <CardTitle>Resume Builder</CardTitle>
        <CardDescription>Enter your details to create a resume.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="resume-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Activity mode={currentStep === "personal" ? "visible" : "hidden"}>

              {/* Personal */}
              <h2 className="text-md font-medium">Personal Detail</h2>

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="name">
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. John Doe"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="phone">
                      Phone
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. 0123456789"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />

              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="address">
                      Address
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. Melbourne, Australia"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="age">
                      Age
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. 8"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
            </Activity>

            {/* Educational */}

            <Activity mode={currentStep === "educational" ? "visible" : "hidden"}>

              <h2 className="text-md font-medium">Educational Detail</h2>
              <Controller
                name="degree"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="degree">
                      Degree
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. Bachelor in Accounting"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />

              <Controller
                name="institute"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="institute">
                      Institute
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. Oxford University"
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />

              <Controller
                name="startDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="startDate">
                      Start Date
                    </FieldLabel>
                    <Input
                      type="date"
                      value={field.value ? (field.value as Date).toISOString().slice(0, 10) : ""}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />

              <Controller
                name="endDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="endDate">
                      End Date
                    </FieldLabel>
                    <Input
                      type="date"
                      value={field.value ? (field.value as Date).toISOString().slice(0, 10) : ""}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                    />
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />

            </Activity>
          </FieldGroup>

        </form>
      </CardContent>

      <CardFooter>
        <Field orientation={"horizontal"}>

          {activeStep > 0 && (
            <Button type="button" variant="outline" onClick={() => setActiveStep(i => i - 1)}>
              Back
            </Button>
          )}

          {activeStep < steps.length - 1 && (
            <Button
              type="button"
              onClick={async () => {
                setActiveStep(i => i + 1);
              }}
            >
              Next
            </Button>
          )}

          {
            activeStep === steps.length - 1 &&
            <Button type="submit" form="resume-form">
              Submit
            </Button>
          }
        </Field>

        <Toaster />
      </CardFooter>
    </Card>
  )
}