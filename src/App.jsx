import { useState } from 'react'
import Papa from 'papaparse'
import { cleanPhoneNumber, detectDuplicates } from './utils/phoneUtils'
import { saveAs } from 'file-saver'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import SummaryCards from './components/SummaryCards'
import PhoneTable from './components/PhoneTable'
import FileUpload from './components/FileUpload'
import TelcoChart from './components/TelcoChart'
import CountryChart from './components/CountryChart'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [csvData, setCsvData] = useState([])
  const [toast, setToast] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('good')
  const [filter, setFilter] = useState('all')

  const filteredData = csvData.filter((row) => {
    if (filter === 'invalid') return row.isInvalid
    if (filter === 'duplicates') return row.isDuplicate
    return true
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) {
      setMessageType('bad')
      setMessage('Failed to upload file!')
      setToast(true)
      setTimeout(() => {
        setToast(false)
        setMessage(null)
      }, 3000)
      return
    }

    setSelectedFile(file)
    setMessage('File uploaded successfully!')
    setMessageType('good')
    setToast(true)
    setTimeout(() => {
      setToast(false)
      setMessage(null)
    }, 3000)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let cleanedRows = results.data.map((row) => {
          const { cleaned, isValid, reason } = cleanPhoneNumber(row.mobile)
          return {
            ...row,
            mobile: cleaned,
            isInvalid: !isValid,
            reason,
          }
        })

        cleanedRows = detectDuplicates(cleanedRows)
        setCsvData(cleanedRows)
      },
    })
  }

  const downloadCSV = () => {
    if (!csvData || csvData.length === 0) return

    const exportData = csvData.map(
      ({ mobile, firstName, lastName, package: pkg }) => ({
        mobile,
        firstName,
        lastName,
        package: pkg,
      })
    )

    const csv = Papa.unparse(exportData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'cleaned_data.csv')
  }

  const handleDeleteRow = (rowIndex) => {
    setCsvData((prev) => prev.filter((_, i) => i !== rowIndex))
    setMessage('Row deleted successfully!')
    setMessageType('bad')
    setToast(true)
    setTimeout(() => {
      setMessageType('good')
      setToast(false)
      setMessage(null)
    }, 3000)
  }

  const removeDuplicateRows = () => {
    const seen = new Set()
    const uniqueRows = csvData.filter((row) => {
      if (seen.has(row.mobile)) {
        return false // skip duplicate
      } else {
        seen.add(row.mobile)
        return true // keep first occurrence
      }
    })

    // Recalculate duplicates (none should remain now)
    const recalculatedRows = uniqueRows.map((row) => ({
      ...row,
      isDuplicate: false,
    }))

    setCsvData(recalculatedRows)
    setMessage('Duplicate rows removed successfully!')
    setMessageType('good')
    setToast(true)
    setTimeout(() => {
      setToast(false)
      setMessage(null)
    }, 3000)
  }

  const deleteInvalidRows = () => {
    const remaining = csvData.filter((row) => !row.isInvalid)
    setCsvData(remaining)
    setMessage('All invalid rows deleted successfully!')
    setMessageType('good')
    setToast(true)
    setTimeout(() => {
      setToast(false)
      setMessage(null)
    }, 3000)
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-2h-screen flex-col pt-20 px-4">
        <div className="flex flex-col gap-2">
          {csvData.length === 0 && (
            <FileUpload handleFileChange={handleFileChange} />
          )}

          {csvData.length > 0 && (
            <>
              <SummaryCards csvData={csvData} />
              <TelcoChart csvData={csvData} />
              <CountryChart csvData={csvData} />
              <PhoneTable
                setFilter={setFilter}
                filter={filter}
                removeDuplicateRows={removeDuplicateRows}
                filteredData={filteredData}
                handleDeleteRow={handleDeleteRow}
                deleteInvalidRows={deleteInvalidRows}
                downloadCSV={downloadCSV}
              />
            </>
          )}
        </div>
      </div>
      {toast && <Toast message={message} type={messageType} />}
    </>
  )
}

export default App
