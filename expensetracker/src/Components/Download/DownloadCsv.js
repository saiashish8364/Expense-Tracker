import { useSelector } from "react-redux";
const DownloadCsv = () => {
  const data = useSelector((state) => state.expense.expenses);
  const convertArrayToCSV = (data) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    return `${headers}\n${rows.join("\n")}`;
  };

  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  const downloadHandler = () => {
    const csvContent = convertArrayToCSV(data);
    downloadCSV(csvContent);
  };
  return (
    <button
      type="submit"
      style={{
        color: "white",
        backgroundColor: "black",
        height: "40px",
        marginTop: "1.5%",
        borderRadius: "10px",
        width: "75px",
        marginLeft: "45%",
      }}
      onClick={downloadHandler}
    >
      Download Expenses
    </button>
  );
};
export default DownloadCsv;
