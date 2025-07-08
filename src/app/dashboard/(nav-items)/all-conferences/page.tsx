"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/server/client";
import Link from "next/link";
import { toast } from "sonner";

export default function AllConferences() {
  const {
    data: conferences,
    isLoading,
    error,
  } = trpc.conference.getAllPublicConferences.useQuery();

  if (isLoading || !conferences) {
    return <LoadingSpinner />;
  }

  if (error) {
    toast.error("An unexpected error occured: " + error.message);
  }

  return (
    <div className="main-content-height bg-gradient-to-br from-background via-muted/20 to-muted/40 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            All Conferences
          </h1>
        </div>
        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">
              Conferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-base font-semibold">
                    Acronym
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Name
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conferences.map((conf) => (
                  <TableRow
                    key={conf.id}
                    className="group border-border/30 hover:bg-muted/50 transition-all duration-300 ease-in-out"
                  >
                    <TableCell className="py-6">
                      <Link href={`/dashboard/conference/${conf.id}`}>
                        <p className="text-lg font-medium group-hover:text-foreground/90 transition-colors">
                          {conf.acronym}
                        </p>
                      </Link>
                    </TableCell>
                    <TableCell className="py-6">
                      <Link href={`/dashboard/conference/${conf.id}`}>
                        <p className="text-lg font-medium group-hover:text-foreground/90 transition-colors">
                          {conf.title}
                        </p>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
