<div align="center">

# UrbanSync 🏙️

<!-- Note: Add your logo to an 'assets' folder in your repository to display it here -->
<img src="./assets/urbansync-logo.png" alt="UrbanSync Logo" width="220"/>

### 🌍 Centralized Smart-Governance & Issue Management Platform

*Bridging the gap between citizens and local authorities through transparent, location-aware public issue reporting and automated resolution workflows.*

</div>

---

## 🎯 Overview

**UrbanSync** is a cutting-edge, comprehensive platform designed to revolutionize municipal governance. By integrating a mobile citizen app with powerful web-based departmental portals, UrbanSync replaces fragmented reporting methods with a unified, data-driven ecosystem. 

### 🔥 Core Pillars

* **👁️ Transparency:** Real-time status tracking and automated citizen notifications for every step of the resolution lifecycle.
* **⚡ Efficiency:** Intelligent auto-assignment of complaints based on precise geolocation and departmental jurisdictions.
* **📊 Accountability:** Data-driven performance monitoring for government departments via a centralized Super Admin command center.

---

## ✨ Key Features

### 👤 For Citizens (Mobile App)
* **📍 Pinpoint Geotagged Reporting:** Submit issues with precise GPS coordinates for highly accurate field-team dispatch.
* **🛡️ Smart Duplicate Detection:** A spatial-logic engine (`ST_Distance_Sphere`) automatically identifies and prevents redundant reports for the exact same issue within a 50-meter radius.
* **🔐 Secure 2FA Onboarding:** Integrated Firebase OTP verification ensures every reporter is a verified, authentic citizen.
* **📸 Evidence-Based Reporting:** Multi-image upload support provides immediate visual context to authorities.

### 👮‍♂️ For Officers (Departmental Portal)
* **🏢 Restricted Authority Workspace:** A streamlined dashboard securely filtered to show only complaints strictly within the officer's regional and departmental jurisdiction.
* **🔄 Status Lifecycle Management:** Seamless one-click transitions (Pending → In Progress → Resolved) that instantly trigger live citizen alerts.
* **🚩 Internal Escalation:** Flag complex or ambiguous reports to Super Admins using secure, internal "Escalation Notes".

### 👑 For Super Admins (Master Dashboard)
* **🗺️ Workload Heatmaps:** High-level visual analytics displaying real-time case distributions across all national departments.
* **🔀 Dynamic Authority Reassignment:** Seamlessly route misfiled complaints to the correct authority without breaking data links or losing history.
* **📈 Performance KPIs:** Automated tracking of average resolution times and departmental completion rates.

---

## 🛠️ Technology Stack

**Frontend Ecosystem**
* 📱 **Mobile:** React Native, Expo, React Navigation
* 💻 **Web/Admin:** React.js (Vite), Tailwind CSS, Chart.js

**Backend & Infrastructure**
* ⚙️ **Server:** Node.js, Express.js (RESTful API)
* 🗄️ **Database:** MySQL (Highly Normalized 3NF Architecture)
* 🤖 **AI Integration:** OpenAI API (GPT-4) for automated issue categorization and priority analysis
* 📁 **Media:** Multer (Secure multi-part image uploads and storage)

**Security & Auth**
* 🔑 **Authentication:** JWT (JSON Web Tokens) & Firebase OTP
* 🛡️ **Encryption:** bcrypt (Industrial-grade password hashing)
* 🚦 **Authorization:** Custom Role-Based Access Control (RBAC) middleware

---

## 🏛️ Architecture & Security Highlights

* **Database Excellence (3NF):** Designed with a decoupled architecture. A master `users` table handles credentials, while `citizens` and `officers` store role-specific metadata. Geographical data is cleanly normalized into `districts` and `divisions`, enabling dynamic cascading reassignments and entirely eliminating data duplication.
* **Regex-Validated Identity:** Strict NIC (National Identity Card) formatting validation prevents duplicate or fake citizen profiles.
* **Bulletproof Middleware:** All administrative and officer routes are guarded by strict role-verification middleware, ensuring complete data isolation.
* **SQL Sanitization:** Absolute reliance on parameterized queries (via `mysql2`) to completely neutralize SQL Injection vulnerabilities.

---

## 🚀 Quick Start / Development Setup

### Prerequisites
* **Node.js** (v18 or higher) 📦
* **MySQL Server** 🗄️
* **Expo Go** app (for mobile testing) 📱

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/UrbanSync.git](https://github.com/yourusername/UrbanSync.git)
cd UrbanSync
