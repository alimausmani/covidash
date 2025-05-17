# 🦠 CoviDash - COVID-19 Dashboard

A responsive and interactive COVID-19 Dashboard built with React.js that visualizes pandemic statistics using Pie and Line charts and clean UI components.

![Screenshot](./assets/image.png)

---

## 📌 Features

- 📊 Displays COVID-19 historical data (cases, deaths, recoveries) for the last 1500 days  
- 🌐 Country selector dropdown with search functionality  
- 📈 Interactive **Line Chart** showing case trends over time  
- 🧮 Statistical Cards showing total cases, deaths, and recovered  
- 📉 Pie Chart for visual distribution  
- ✅ Fully responsive layout  
- 🔁 API Integration with error handling  
- 💡 Clean and modular code structure  

---

## 🔗 Live Demo

_Optional: Add link here if deployed (e.g., Vercel/Netlify)._

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:alimausmani/covidash.git
cd covidash
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm run dev
```

Then open your browser at:
👉 `http://localhost:5173`

---

## 🔌 APIs Used

### 📈 COVID-19 Historical Data

* Endpoint: `https://disease.sh/v3/covid-19/historical/{country}?lastdays=1500`
* Replace `{country}` with the **ISO code** (e.g., `usa`, `ind`)

### 🌍 Country List

* Endpoint: `https://restcountries.com/v3.1/all`

---

## 🗂️ Project Structure

```
covidash/
├── assets/                # Images and static files
│   └── image.png          # Project screenshot
├── components/            # Reusable React components
├── App.css                # CSS files
├── App.jsx
├── main.jsx
└── README.md
```

---

## 🛠️ Technologies Used

* React.js
* Vite
* Recharts
* REST APIs
* HTML5 + CSS3

---

## 📦 Future Improvements

* Add global vs country toggle
* Enhance chart interactions
* Add dark/light mode

---

## 🙋‍♀️ Author

Made with ❤️ by [Alima Usmani](https://github.com/alimausmani)
