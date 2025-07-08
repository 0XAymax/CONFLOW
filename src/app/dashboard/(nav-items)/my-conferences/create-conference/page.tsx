"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { trpc } from "@/server/client";
import { TRPCClientError } from "@trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import CountrySelect from "@/components/CountrySelect";

const conferenceSchema = z.object({
  title: z.string(),
  acronym: z.string(),
  description: z.string(),
  locationVenue: z.string(),
  locationCity: z.string(),
  locationCountry: z.string(),
  callForPapers: z.string(),
  websiteUrl: z.string().url().optional(),
  startDate: z.date(),
  endDate: z.date(),
  abstractDeadline: z.date(),
  submissionDeadline: z.date(),
  cameraReadyDeadline: z.date(),
  isPublic: z.boolean(),
  researchAreas: z.record(z.string(), z.array(z.string())),
});

type ConferenceFormData = z.infer<typeof conferenceSchema>;

export default function ConferenceForm() {
  const [secondaryAreas, setSecondaryAreas] = useState([
    { id: 1, text: "Typed in area" },
    { id: 2, text: "Research area" },
  ]);

  const addSecondaryArea = () => {
    const newId = Math.max(...secondaryAreas.map((area) => area.id)) + 1;
    setSecondaryAreas([...secondaryAreas, { id: newId, text: "" }]);
  };

  const removeSecondaryArea = (id: number) => {
    setSecondaryAreas(secondaryAreas.filter((area) => area.id !== id));
  };

  const updateSecondaryArea = (id: number, text: string) => {
    setSecondaryAreas(
      secondaryAreas.map((area) => (area.id === id ? { ...area, text } : area))
    );
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ConferenceFormData>({
    resolver: zodResolver(conferenceSchema),
  });

  const { mutateAsync, isPending } =
    trpc.conference.createConference.useMutation();

  const onSubmit = async (data: ConferenceFormData) => {
    try {
      console.log("Submitting data:", data); // Debug log
      const result = await mutateAsync(data);
      console.log("Success:", result); // Debug log
      toast.success("Conference creation request sent successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof TRPCClientError
          ? err.message
          : "An unexpected error occurred";

      toast.error(errorMessage);
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Conference Name & Acronym */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-[#0f172a]">
            Conference Title & Acronym
          </h2>

          <div className="space-y-2">
            <Input
              {...register("title")}
              placeholder="Title"
              className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
            <p className="text-sm text-[#64748b]">
              Enter The conference&apos;s full name
            </p>
          </div>

          <div className="space-y-2">
            <Input
              {...register("acronym")}
              placeholder="ACR20XX"
              className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
            />
            {errors.acronym && (
              <p className="text-sm text-red-500">{errors.acronym.message}</p>
            )}
            <p className="text-sm text-[#64748b]">
              Acronym must contain atleast one digit
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-[#0f172a]">Description</h2>
            <div className="space-y-2">
              <textarea
                {...register("description")}
                placeholder="Enter conference description"
                className="w-full p-3 border border-[#e2e8f0] rounded-md text-slate-900 placeholder:text-[#94a3b8] min-h-[100px]"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Conference Location */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-[#0f172a]">
            Conference Location
          </h2>

          <div className="space-y-2">
            <Input
              {...register("locationVenue")}
              placeholder="Venue"
              className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
            />
            {errors.locationVenue && (
              <p className="text-sm text-red-500">
                {errors.locationVenue.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              {...register("locationCity")}
              placeholder="City"
              className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
            />
            {errors.locationCity && (
              <p className="text-sm text-red-500">
                {errors.locationCity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Controller
              name="locationCountry"
              control={control}
              render={({ field }) => (
                <CountrySelect
                  {...field}
                  isSubmitting={isSubmitting}
                  isPending={isPending}
                />
              )}
            />
            {errors.locationCountry && (
              <p className="text-sm text-red-500">
                {errors.locationCountry.message}
              </p>
            )}
          </div>
        </div>

        {/* Web Page */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-[#0f172a]">Web Page</h2>
          <div className="space-y-2">
            <Input
              {...register("websiteUrl")}
              placeholder="https://www.example.com"
              className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
            />
            {errors.websiteUrl && (
              <p className="text-sm text-red-500">
                {errors.websiteUrl.message}
              </p>
            )}
            <p className="text-sm text-[#64748b]">
              Enter The conference&apos;s web page
            </p>
          </div>
        </div>

        {/* Dates and deadlines */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-[#0f172a]">
            Dates and deadlines
          </h2>

          <div className="space-y-2">
            <div className="relative">
              <Input
                {...register("startDate")}
                type="date"
                placeholder="Start date"
                className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
              />
            </div>
            {errors.startDate && (
              <p className="text-sm text-red-500">{errors.startDate.message}</p>
            )}
            <p className="text-sm text-[#64748b]">
              Enter The conference&apos;s start date
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                {...register("endDate")}
                type="date"
                placeholder="End date"
                className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
              />
            </div>
            {errors.endDate && (
              <p className="text-sm text-red-500">{errors.endDate.message}</p>
            )}
            <p className="text-sm text-[#64748b]">
              Enter The conference&apos;s end date
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                {...register("abstractDeadline")}
                type="date"
                placeholder="Abstract deadline"
                className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
              />
            </div>
            {errors.abstractDeadline && (
              <p className="text-sm text-red-500">
                {errors.abstractDeadline.message}
              </p>
            )}
            <p className="text-sm text-[#64748b]">
              Enter The CFP Abstraction registration deadline
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                {...register("submissionDeadline")}
                type="date"
                placeholder="Submission deadline"
                className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
              />
            </div>
            {errors.submissionDeadline && (
              <p className="text-sm text-red-500">
                {errors.submissionDeadline.message}
              </p>
            )}
            <p className="text-sm text-[#64748b]">
              Enter The CFP submission deadline
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                {...register("cameraReadyDeadline")}
                type="date"
                placeholder="Camera ready deadline"
                className="border-[#e2e8f0] text-slate-900 placeholder:text-[#94a3b8]"
              />
            </div>
            {errors.cameraReadyDeadline && (
              <p className="text-sm text-red-500">
                {errors.cameraReadyDeadline.message}
              </p>
            )}
            <p className="text-sm text-[#64748b]">
              Enter The camera ready deadline
            </p>
          </div>
        </div>

        {/* Research Areas - Simplified for now */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-[#0f172a]">Research Areas</h2>
          <p className="text-sm text-[#64748b]">
            Enter the primary research areas of the conference (max 3), and the
            secondary areas corresponding to each primary area
          </p>

          {/* Primary area no. 1 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#0f172a]">
              Primary area no. 1
            </Label>
            <Input
              placeholder="Typed in area"
              className="border-[#e2e8f0] text-[#0f172a] placeholder:text-[#0f172a]"
            />

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#334155] bg-[#cbd5e1] px-2 py-1 rounded">
                Secondary areas
              </Label>
              <div className="bg-[#cbd5e1] p-3 rounded-md space-y-2">
                <div className="flex flex-wrap gap-2">
                  {secondaryAreas.map((area) => (
                    <div key={area.id} className="flex items-center gap-1">
                      <span className="bg-white px-3 py-1 rounded-full text-sm text-[#0f172a] border border-[#e2e8f0]">
                        {area.text || "Research area"}
                      </span>
                      {secondaryAreas.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-[#94a3b8]"
                          onClick={() => removeSecondaryArea(area.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white hover:bg-[#f8fafc] border border-[#e2e8f0]"
                    onClick={addSecondaryArea}
                  >
                    <Plus className="h-4 w-4 text-[#64748b]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Primary area no. 2 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#0f172a]">
              Primary area no. 2
            </Label>
            <Input
              placeholder="Research area"
              className="border-[#e2e8f0] text-[#64748b] placeholder:text-[#94a3b8]"
            />
          </div>

          {/* Primary area no. 3 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#0f172a]">
              Primary area no. 3
            </Label>
            <Input
              placeholder="Research area"
              className="border-[#e2e8f0] text-[#64748b] placeholder:text-[#94a3b8]"
            />
          </div>

          <div className="space-y-2 flex items-center gap-2">
            <Label className="text-sm font-medium text-[#0f172a] m-0">
              Make this conference public on approval?
            </Label>
            <Input
              type="checkbox"
              className="h-4 w-4"
              {...register("isPublic")}
            />
            {errors.isPublic && (
              <p className="text-sm text-red-500">{errors.isPublic.message}</p>
            )}
          </div>
        </div>

        {/* Call for Papers */}
        {/* TODO: replace with rich text editor and put in a separate page if necessary*/}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-[#0f172a]">
            Call for Papers
          </h2>
          <div className="space-y-2">
            <textarea
              {...register("callForPapers")}
              placeholder="Enter call for papers"
              className="w-full p-3 border border-[#e2e8f0] rounded-md text-slate-900 placeholder:text-[#94a3b8] min-h-[100px]"
            />
            {errors.callForPapers && (
              <p className="text-sm text-red-500">
                {errors.callForPapers.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#1e293b] hover:bg-[#334155] text-white py-3 text-base font-medium disabled:opacity-50"
        >
          {isPending ? "Sending Request..." : "Send Creation Request"}
        </Button>
      </form>
    </div>
  );
}
