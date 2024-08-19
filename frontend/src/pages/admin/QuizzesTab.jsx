import LoadingState from "../../components/LoadingState";
import useUser from "../../hooks/useUser";

export default function QuizzesTab() {
  const { marks, isMarksLoading } = useUser();
  if (isMarksLoading) return <LoadingState />;

  return (
    <div className="relative overflow-x-auto border border-quiz-dark sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-slate-400 text-slate-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              nom du candidat
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Note
            </th>
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
  );
}
