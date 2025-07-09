# 🚀 LinkAid Admin Dashboard

A modern React + Firebase dashboard template with full authentication, Firestore integration, and role-based access control (RBAC).

---

## 📦 Project Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
If you face peer dependency issues:

bash
Copy
Edit
npm install --legacy-peer-deps
2. Start the Development Server
bash
Copy
Edit
npm run dev
# or
yarn dev
Runs on http://localhost:5173

🔐 Key Features (Firebase RBAC)
🔑 Firebase Auth + Firestore Role-Based Access Control (RBAC)

🧠 AuthContext with real-time user role and auth state

👮‍♂️ ProtectedRoute component to restrict pages based on role

⚙️ Auto-create users/{uid} document in Firestore on sign-up

👤 Role badges: Admin, Mechanic, Service User

🗃️ Full User Table with View/Edit/Delete actions

🎨 Light & Dark Mode toggle with persistence

📊 Data visualization with ApexCharts

📅 Calendar integration using Flatpickr

📦 Modular UI components: buttons, badges, modals, alerts

🧩 Project Structure
bash
Copy
Edit
src/
├── components/
│   ├── auth/              # AuthContext, ProtectedRoute
│   ├── common/            # PageMeta, Breadcrumb, Layout Helpers
│   ├── tables/            # BasicTableOne, MechanicTable etc.
│   ├── ui/                # Badge, Button, Table, etc.
├── config/
│   └── firebase.ts        # Firebase config and setup
├── context/
│   ├── AuthContext.tsx    # Handles login state & roles
│   └── ThemeContext.tsx   # Handles light/dark mode
├── layout/
│   └── AppLayout.tsx      # Sidebar, header, outlet layout
├── pages/
│   ├── AuthPages/         # SignIn, SignUp
│   ├── Dashboard/         # Home, Analytics
│   ├── User/              # TotalUser, UserForm, etc.
│   └── OtherPage/         # NotFound, Unauthorized
└── App.tsx                # Route configuration with RBAC
⚙️ Enhancements
✅ Removed repetitive layout wrappers via nested routing

✅ ClickOutside utility for dropdowns (header/user)

✅ Role-based conditional rendering of pages and UI

✅ Table with status badges and user actions

✅ Optimized useEffect and error handling

✅ Dark mode persisted via localStorage

✅ UI/UX Improvements
Integrated flatpickr in Date Pickers (Forms)

Live color change on Select Element

Enhanced MultiSelect Dropdown

Editable fields in Pricing Table

Folder structure optimized for scalability

💡 Upcoming Features
🔐 Admin-only User CRUD with Firestore

📤 Export tables to PDF/CSV

🧪 Unit tests (Jest + React Testing Library)

📲 Push notifications via Firebase

🌍 Deploy-ready setup (Vercel/Netlify)

🔗 Live Demo
Coming soon...

🧑‍💻 Author
Developed by [Muhammad Shamim Shoaib]
📧 your.shamim.akhonzada@gmail.com
