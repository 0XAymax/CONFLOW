import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Submission } from "@prisma/client";

export default function SubmissionsTable({
  submissions,
}: {
  submissions: Array<Submission> | undefined;
}) {
  if (!submissions || submissions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Submissions for {submissions?.[0]?.conference?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            No submissions found.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Submissions for {submissions?.[0]?.conference?.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submissions ? (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div key={submission.id}>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Submission ID {submission.id}
                </h3>
                <div className="grid grid-cols-1 gap-0 border border-border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 min-h-[60px]">
                    <div className="bg-muted p-4 border-r border-border flex items-center">
                      <span className="font-medium text-foreground">Title</span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-foreground">
                        {submission.title}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 min-h-[60px] border-t border-border">
                    <div className="bg-muted p-4 border-r border-border flex items-center">
                      <span className="font-medium text-foreground">Paper</span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <Link
                        href={`/${submission.paperFilePath}`}
                        className="text-primary hover:text-primary/80 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {submission.paperFileName}
                      </Link>
                      <span className="text-muted-foreground ml-2">
                        [
                        {new Date(submission.updatedAt).toLocaleDateString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        ]
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 min-h-[60px] border-t border-border">
                    <div className="bg-muted p-4 border-r border-border flex items-center">
                      <span className="font-medium text-foreground">Area</span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-foreground">{`${submission.primaryArea} - ${submission.secondaryArea}`}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 min-h-[60px] border-t border-border">
                    <div className="bg-muted p-4 border-r border-border flex items-center">
                      <span className="font-medium text-foreground">
                        Keywords
                      </span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-foreground">
                        {submission.keywords?.join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 border-t border-border">
                    <div className="bg-muted p-4 border-r border-border flex items-start pt-4">
                      <span className="font-medium text-foreground">
                        Abstract
                      </span>
                    </div>
                    <div className="col-span-3 p-4">
                      <p className="text-foreground leading-relaxed">
                        {submission.abstract}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No submissions found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
