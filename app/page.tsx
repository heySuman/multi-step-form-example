"use client"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

// Personal Schema
const PersonalSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  phone: z.string().min(1, { error: "Contact is required." }),
  address: z.string().min(1, { error: "Address is required." }),
  age: z.string().min(1, { error: "Age is required." }),
})

// Education Schema
const EducationalSchema = z.object({
  degree: z.string().min(1, { error: "Name is required." }),
  institute: z.string().min(1, { error: "Name is required." }),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
})

// Combining Personal and Education Schema under single Schema for our form 
const resumeSchema = PersonalSchema.extend(EducationalSchema.shape)

export default function Page() {
  const form = useForm(
    {
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
    }
  )

  return (
    <Card className="w-full sm:max-w-md my-10 mx-auto">
      <CardHeader>
        <CardTitle>Resume Builder</CardTitle>
        <CardDescription>Enter your details to create a resume.</CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <FieldGroup>

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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Educational */}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>

        </form>
      </CardContent>
    </Card>
  )
}