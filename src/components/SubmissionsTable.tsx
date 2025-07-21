import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Submission } from "@prisma/client";

export default function SubmissionsTable({
  submissions,
}: {
  submissions: Array<Submission> | undefined;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#000000]">
          Submissions for {submissions?.[0]?.conference?.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submissions ? (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div key={submission.id}>
                <h3 className="text-xl font-semibold text-[#000000] mb-4">
                  Submission ID {submission.id}
                </h3>
                <div className="grid grid-cols-1 gap-0 border border-[#e2e8f0] rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 min-h-[60px]">
                    <div className="bg-[#f1f5f9] p-4 border-r border-[#e2e8f0] flex items-center">
                      <span className="font-medium text-[#000000]">Title</span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-[#000000]">{submission.title}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 min-h-[60px] border-t border-[#e2e8f0]">
                    <div className="bg-[#f1f5f9] p-4 border-r border-[#e2e8f0] flex items-center">
                      <span className="font-medium text-[#000000]">Paper</span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <Link
                        href={`/${submission.paperFilePath}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {submission.paperFileName}
                      </Link>
                      <span className="text-[#64748b] ml-2">
                        [{new Date(submission.updatedAt).toLocaleDateString()}]
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 min-h-[60px] border-t border-[#e2e8f0]">
                    <div className="bg-[#f1f5f9] p-4 border-r border-[#e2e8f0] flex items-center">
                      <span className="font-medium text-[#000000]">Area</span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-[#000000]">{`${submission.primaryArea} - ${submission.secondaryArea}`}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 min-h-[60px] border-t border-[#e2e8f0]">
                    <div className="bg-[#f1f5f9] p-4 border-r border-[#e2e8f0] flex items-center">
                      <span className="font-medium text-[#000000]">
                        Keywords
                      </span>
                    </div>
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-[#000000]">
                        {submission.keywords?.join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 border-t border-[#e2e8f0]">
                    <div className="bg-[#f1f5f9] p-4 border-r border-[#e2e8f0] flex items-start pt-4">
                      <span className="font-medium text-[#000000]">
                        Abstract
                      </span>
                    </div>
                    <div className="col-span-3 p-4">
                      <p className="text-[#000000] leading-relaxed">
                        {submission.abstract}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No submissions found.</div>
        )}
      </CardContent>
    </Card>
  );
}
