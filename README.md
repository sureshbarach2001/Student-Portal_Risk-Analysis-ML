<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:2563eb,100:14b8a6&height=220&section=header&text=Student%20Portal%20Risk%20Analysis%20ML&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-powered%20academic%20risk%20prediction%20dashboard&descAlignY=58&descSize=16" alt="Student Portal Risk Analysis ML Banner" />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=0f172a)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-Analytics-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Recharts](https://img.shields.io/badge/Recharts-Data%20Viz-22C55E?style=for-the-badge)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=2600&pause=900&color=38BDF8&center=true&vCenter=true&width=850&lines=Student+performance+monitoring;Attendance+and+marks+analytics;Machine-learning+risk+prediction;Teacher+and+student+dashboards;CSV+data+export+workflow" alt="Typing SVG" />

</div>

---

## 📌 Project Overview

**Student Portal Risk Analysis ML** is a modern academic analytics dashboard built to help institutions monitor student performance, attendance, grades, and potential academic risk.

The platform provides role-based dashboards for **teachers/admins** and **students**, using API-driven data to display performance summaries, prediction results, grade insights, and risk levels.

It is designed as a frontend interface for an ML-backed academic risk analysis system.

---

## 🎯 Core Objective

The goal of this project is to identify students who may need academic support by analyzing indicators such as:

- Attendance percentage
- Marks and assessment history
- GPA trends
- Assignment submission behavior
- Engagement metrics
- Predicted grade
- Risk level classification

The system helps educators make faster, data-driven decisions instead of waiting until students fail.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 👨‍🏫 Teacher / Admin Dashboard

- View student performance overview
- Upload student data
- Add student records manually
- Search student details
- Export student data as CSV
- View high-risk students
- Run performance prediction

</td>
<td width="50%">

### 🎓 Student Dashboard

- View personal academic overview
- Track marks and attendance
- View course-level predictions
- Download personal academic data
- Monitor predicted grade
- See risk status by course

</td>
</tr>
</table>

---

## 🧠 ML & Analytics Capabilities

The project interface supports ML-based academic prediction workflows, including:

- Student risk-level prediction
- Grade prediction
- Performance trend visualization
- Course-wise risk analysis
- High marks with low attendance detection
- Teacher-side performance review

> The ML/backend API is expected to run separately and provide prediction endpoints consumed by this frontend.

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| Charts | Chart.js, React Chart.js 2, Recharts |
| API Handling | Fetch API, Axios |
| Authentication | Token-based Auth |
| Data Export | CSV Download |
| Package Manager | npm |

</div>

---

## 🏗️ Project Structure

```bash
Student-Portal_Risk-Analysis-ML/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── FileUpload.jsx
│   │   ├── Header.jsx
│   │   ├── Header_Student.jsx
│   │   ├── ManualForm.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── StudentTable.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── AttendancePage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── GradePage.jsx
│   │   ├── GradePredictionPage.jsx
│   │   ├── HighMarksLowAttendancePage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── OverviewPage.jsx
│   │   ├── PerformancePredictionPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SearchPage.jsx
│   │   └── TeacherProfilePage.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/sureshbarach2001/Student-Portal_Risk-Analysis-ML.git
cd Student-Portal_Risk-Analysis-ML
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

> Make sure your backend API server is running before using API-based features.

### 4. Start Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

---

## 🔐 Authentication Flow

The application uses token-based authentication.

General flow:

```text
User Login
   ↓
Backend returns token + user role
   ↓
Token stored in localStorage/AuthContext
   ↓
User redirected based on role
   ↓
Teacher/Admin or Student dashboard loads
```

Supported roles:

- **Teacher/Admin**
- **Student**

---

## 🧭 Main Application Routes

| Route | Purpose |
|---|---|
| `/` | Login / authentication |
| `/teacher-dashboard` | Teacher dashboard |
| `/student-dashboard` | Student overview dashboard |
| `/student-profile` | Student profile |
| `/student-grades` | Student grade page |
| `/student-attendance` | Student attendance page |
| `/high-risk-marks` | High-risk student analysis |
| `/performance-prediction` | Performance prediction |
| `/grade-prediction` | Grade prediction |
| `/search` | Student search |
| `/teacher-profile` | Teacher profile |

---

## 📊 Dashboard Modules

### Performance Overview

Displays:

- Overall marks percentage
- Attendance percentage
- GPA trend
- Course prediction table
- Risk level indicators

### Grade Prediction

Displays:

- Predicted student grades
- Grade distribution chart
- Improvement suggestions
- Student filtering

### Performance Prediction

Supports:

- Student lookup by roll number
- Manual prediction input
- Risk level output
- Predicted score summary
- Performance trend chart

---

## 🔌 Expected Backend API

The frontend expects a backend API running on:

```text
http://localhost:8000
```

Common endpoint patterns used by the frontend:

```text
POST /api/login/
GET  /api/my-attendance/
GET  /api/my-marks/
GET  /api/student/courses/
GET  /api/student/course-prediction/:courseId/
GET  /api/my-data/export-csv/
GET  /api/teacher/students/export-csv/
GET  /api/students/search/:rollNumber/
GET  /api/teacher/risk-analysis/:studentName/
POST /api/custom/risk-analysis/
```

> Update the API base URL through `VITE_API_URL` when deploying.

---

## 📈 Risk Level Classification

The project displays risk levels using visual indicators:

| Risk Level | Meaning |
|---|---|
| Low | Student is performing well |
| Medium | Student needs monitoring |
| High | Student may require academic support |

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## 🖼️ Recommended Screenshots

For a stronger GitHub profile, add screenshots to an `assets/` folder and update this section.

```text
assets/dashboard-preview.png
assets/prediction-preview.png
assets/student-overview.png
```

Example:

```md
![Dashboard Preview](assets/dashboard-preview.png)
```

> A project with screenshots looks much more serious than a project with only text.

---

## ⚠️ Important Notes

- This repository currently represents the **frontend application**.
- The backend API must be running separately.
- Do not commit real secrets, tokens, passwords, or production environment files.
- Use `.env.example` for public environment variable examples.
- Replace hardcoded localhost URLs with `VITE_API_URL` before production deployment.

---

## 🔮 Future Improvements

- Add live hosted demo
- Add backend repository link
- Add screenshots and demo GIF
- Replace all hardcoded localhost URLs with environment variables
- Add loading skeletons and better error states
- Add unit tests
- Add role-based route guards with improved security
- Add deployment guide for Vercel/Netlify
- Add API documentation

---

## 👨‍💻 Author

<div align="center">

### Suresh Kumar Barach

**Full-Stack Developer**

[![GitHub](https://img.shields.io/badge/GitHub-sureshbarach2001-181717?style=for-the-badge&logo=github)](https://github.com/sureshbarach2001)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sureshkumarbarach-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sureshkumarbarach/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Website-14B8A6?style=for-the-badge&logo=vercel&logoColor=white)](https://sureshkumar2001.vercel.app/)

</div>

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:14b8a6,50:2563eb,100:0f172a&height=120&section=footer" alt="Footer Wave" />

⭐ If this project helped you understand student risk prediction dashboards, consider starring the repository.

</div>
