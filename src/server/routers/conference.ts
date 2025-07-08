// import { TRPCError } from "@trpc/server";
import {
  userProcedure,
  router,
  protectedProcedure,
  adminProcedure,
} from "../trpc";
import { z } from "zod";

export const conferenceRouter = router({
  getAllPublicConferences: userProcedure.query(async ({ ctx }) => {
    const conferences = await ctx.prisma.conference.findMany({
      where: {
        status: "APPROVED",
        isDeleted: false,
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        acronym: true,
        description: true,
        locationCountry: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });
    return conferences;
  }),
  getAllPendingConferences: adminProcedure.query(async ({ ctx }) => {
    const conferences = await ctx.prisma.conference.findMany({
      where: {
        status: "PENDING",
        isDeleted: false,
      },
      select: {
        id: true,
        title: true,
        acronym: true,
        description: true,
        locationCountry: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return conferences;
  }),
  // I want to only get public conferences for users BUT admins can see all conferences...
  getConference: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const isAdmin = ctx.session.user.role === "ADMIN";
      const conference = await ctx.prisma.conference.findUnique({
        where: { id: input, isDeleted: false, isPublic: !isAdmin },
        select: {
          id: true,
          title: true,
          acronym: true,
          description: true,
          locationVenue: true,
          locationCity: true,
          locationCountry: true,
          callForPapers: true,
          websiteUrl: true,
          startDate: true,
          endDate: true,
          abstractDeadline: true,
          submissionDeadline: true,
          cameraReadyDeadline: true,
          status: true,
          researchAreas: true,
          mainChairId: isAdmin,
          mainChair: isAdmin && {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          isPublic: isAdmin,
        },
      });

      return conference;
    }),
  createConference: userProcedure
    .input(
      z.object({
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
        isPublic: z.boolean().default(false),
        researchAreas: z.record(z.string(), z.array(z.string())),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const conferenceRequest = ctx.prisma.conference.create({
        data: { ...input, mainChairId: ctx.session.user.id },
      });
      return conferenceRequest;
    }),
});
