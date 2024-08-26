import { useState } from "react";
import { utils, writeFile } from "xlsx";
import LoadingState from "../../components/LoadingState";
import useUser from "../../hooks/useUser";
import Button from "../../components/Button";

export default function QuizzesTab() {
  const { marks, isMarksLoading } = useUser();
  const [isDownloading, setIsDownloading] = useState(false);

  if (isMarksLoading) return <LoadingState />;

  const generateExcel = () => {
    setIsDownloading(true);

    const worksheet = utils.json_to_sheet(marks.map(mark => ({
      "Nom du candidat": mark?.userId?.name || "Inconnu",
      Email: mark?.userId?.email || "Inconnu",
      Note: mark.fullMark,
    })));

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Quizzes");

    writeFile(workbook, "quizzes.xlsx");
    setIsDownloading(false);
  };

  return (
    <>
      <div className="flex justify-end">
      <Button
        onClick={generateExcel}
        className=" mb-5 py-2 px-3 text-sm"
        disabled={isDownloading}
      >
        {isDownloading ? "Generating..." : "Download Excel"}
      </Button>
      </div>
      <div className="relative overflow-x-auto border border-quiz-dark sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-slate-400 text-slate-900">
          <tr>
            <th scope="col" className="px-6 py-3">Nom du candidat</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Note</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            
            <tr key={mark._id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                {mark?.userId?.name || "Inconnu"}
              </th>
              <td className="px-6 py-4">{mark?.userId?.email || "Inconnu"}</td>
              <td className="px-6 py-4">{mark.fullMark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </> 
  );
}
