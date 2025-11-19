import Papa from 'papaparse'

const FileUpload = ({ handleFileChange }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Pick a CSV file</legend>
      <input
        type="file"
        className="file-input"
        accept=".csv"
        onChange={handleFileChange}
      />
      <label className="label">Only .csv files are allowed!</label>
    </fieldset>
  )
}

export default FileUpload
