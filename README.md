````markdown
# 📱 CSV Mobile Number Cleaner & Validator: The Ultimate Data Prep Tool

> A powerful, interactive **React** web application for cleaning, validating, categorizing, and exporting mobile number datasets. Perfect for prepping bulk customer lists, marketing data, and CRM imports.

🌐 **Live Demo:** [https://csv-cleaner-six.vercel.app](https://csv-cleaner-six.vercel.app)

---

## 🚀 Key Features at a Glance

| Icon | Feature                        | Description                                                                                                      | Tech Highlight                 |
| :--- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| 🔍   | **Intelligent Parsing**        | Accepts any `.csv` file with headers and efficiently parses large files.                                         | **PapaParse**                  |
| 🧹   | **Auto-Cleaning & Validation** | Normalizes numbers (removes symbols/spacing), validates correctness, and provides detailed invalidation reasons. | `cleanPhoneNumber()` utility   |
| ♻️   | **Duplicate Detection**        | Automatically flags and highlights repeated mobile numbers. One-click bulk removal.                              | `detectDuplicates()` utility   |
| 📊   | **Visual Analytics**           | Built-in charts show **Telco** (Safaricom, Airtel, etc.) and **Country** distributions.                          | Charting Libraries             |
| 🗑️   | **Data Cleanup Actions**       | Filter by invalid/duplicate status, delete individual rows, or remove all invalid/duplicate rows instantly.      | **TanStack Table**             |
| 📥   | **Cleaned CSV Export**         | Export the final, validated dataset with the normalized `mobile` column and all supporting data.                 | **PapaParse** & **file-saver** |
| 🎨   | **Modern UI**                  | Responsive, color-coded interface for clear visual feedback on data status.                                      | **TailwindCSS + DaisyUI**      |

---

## 🧠 Processing Flow: How It Works

The application provides an immediate feedback loop from upload to export:

1.  **Upload CSV**
2.  **Parse** with **PapaParse** (with instant toast feedback)
3.  **Clean & Validate** each mobile number
4.  **Detect Duplicates**
5.  **Render** Summary Cards, Charts, and the main Data Table
6.  **User Actions** (Filter, Delete, Clean Data)
7.  **Export** as a Cleaned CSV

---

## ⚙️ Core Technology Stack

| Area                   | Technology                | Purpose                                                                           |
| :--------------------- | :------------------------ | :-------------------------------------------------------------------------------- |
| **Frontend Framework** | **React** (Vite)          | Main application structure and component management.                              |
| **Table Library**      | **TanStack Table**        | High-performance data grid with filtering, sorting, and pagination.               |
| **CSV Handling**       | **PapaParse**             | Efficiently parses CSV data into JavaScript objects and unparses data for export. |
| **Data Export**        | **file-saver**            | Handles client-side file downloads.                                               |
| **Styling & UI**       | **TailwindCSS + DaisyUI** | Clean, responsive, and component-rich user interface.                             |

---

## 📜 Code Highlights: Validation & Cleanup

### 🎯 Phone Number Cleaning & Validation

The `cleanPhoneNumber()` utility is the core engine, performing symbol stripping, normalization, and country format validation.

```js
// Inside utils/phoneUtils.js
{
  cleaned, // normalized phone number (e.g., '2547XXXXXXXX')
    isValid, // boolean (true/false)
    reason // null or string detailing the reason for invalidation
}
```
````

### 🧬 Duplicate Detection

`detectDuplicates()` marks repeated rows, enabling powerful filtering and bulk removal options for the user.

```js
// Applied to the data row object
row.isDuplicate = true
```

### 📦 Export Structure

The `Download Cleaned CSV` button uses `Papa.unparse()` to generate the final file.

**Output CSV Columns:**

```go
mobile,firstName,lastName,package
```

- _Note: Invalid rows are automatically removed during export unless explicitly retained by the user. Duplicate rows are removed if the **Remove Duplicates** action is taken._

---

## 🎨 Visual Indicators & User Experience

The UI uses strategic color coding to provide immediate insight into the data status.

### Row Background Colors

| Condition            | Visual Indicator            | Purpose                                                   |
| :------------------- | :-------------------------- | :-------------------------------------------------------- |
| **Invalid number**   | Purple secondary background | Indicates data that needs immediate attention or removal. |
| **Duplicate number** | Neutral gray background     | Flags repeated entries for easy cleanup.                  |

### Telco Badge Colors

| Telco     | Badge Color |
| :-------- | :---------- |
| Safaricom | **Green**   |
| Airtel    | **Red**     |
| Telkom    | **Blue**    |
| Faiba     | **Purple**  |
| Tanzania  | **Yellow**  |

### 🖱️ User Actions & Filtering

Users control the cleanup process via prominent buttons and filters:

- **Filter Buttons:** **All / Invalid / Duplicates**
- **Bulk Cleanup:** **Remove Duplicates** / **Delete All Invalid**
- **Download:** **Download Cleaned CSV**
- **Feedback:** Comprehensive **Toast Notifications** for success and error messages.

---

## 📂 Project Structure (Key Components)

The codebase is modular and organized for easy maintenance:

```yaml
src/
├── App.jsx           # Main application logic and state management
├── components/
│ ├── Navbar.jsx
│ ├── Toast.jsx
│ ├── SummaryCards.jsx # Totals, Invalid Count, Duplicate Count
│ ├── FileUpload.jsx   # Handles PapaParse integration
│ ├── PhoneTable.jsx   # TanStack Table implementation
│ ├── TelcoChart.jsx
│ └── CountryChart.jsx
└── utils/
└── phoneUtils.js     # All cleaning, validation, and telco logic
```

---

## 🛠️ Getting Started

You can try the **live deployed version** here:  
🌐 [https://csv-cleaner-six.vercel.app](https://csv-cleaner-six.vercel.app)

### 📄 CSV Format Requirements

Your input file **must** include a header column named `mobile`.

**Supported Optional Columns:** `firstName`, `lastName`, `package`.

### ✔️ Example CSV Snippet

```diff
mobile,firstName,lastName,package
254712345678,John,Doe,5550
0712345678,Jane,Smith,2880
+254700111222,Bob,Brown,2542

## 📂 Sample Dataset

If you don’t have your own CSV file to test the application, you can use this ready-made dataset:  
📥 [Download Sample Dataset](https://github.com/joelorie/csv-cleaner/blob/main/Sample%20Dataset%20-%20Sample%20Dataset.csv)

It includes the required `mobile` column and optional fields like `firstName`, `lastName`, and `package`.

```

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/owalkz/csv-cleaner.git](https://github.com/owalkz/csv-cleaner.git)
    cd csv-cleaner
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start development server:**
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 💡 Future Enhancements (Roadmap Ideas)

- **Drag-and-drop** functionality for CSV file upload.
- Allow users to define **custom telco rules** or regex patterns.
- Implement **bulk editing** capabilities directly within the table.
- Add **contact enrichment** features (e.g., country lookup, network type).
- Export data as **Excel (.xlsx)** format.

<!-- end list -->

```

```
