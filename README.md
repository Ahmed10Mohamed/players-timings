🕌 Prayer Times App (React + MUI)

This project is a Prayer Times Application built with React and Material UI (MUI).
It fetches daily prayer times dynamically based on the selected city and determines the next upcoming prayer in real time.

🔗 Live Demo:
👉 https://players-timings.netlify.app/

🚀 Features

📍 City-based prayer times using the Aladhan API

⏱️ Real-time clock with automatic updates every second

🕌 Next prayer detection based on the current time

🔄 Live countdown logic for upcoming prayers

🎨 Modern and responsive UI built with Material UI

🌍 Arabic localization using Moment.js

⚡ Fully dynamic city selection

🛠️ Technologies Used

React (Hooks & Functional Components)

Material UI (MUI)

Axios for API requests

Moment.js for time handling and localization

Aladhan Prayer Times API

📌 How It Works

The app fetches prayer times from the API based on the selected city.

Prayer times are stored in React state.

A timer runs every second to:

Update the current date & time

Detect the next upcoming prayer

The UI updates automatically when:

The city changes

New prayer times are loaded

🏙️ Supported Cities

Cairo

Alexandria

Beni Suef

Aswan

📷 UI Highlights

Prayer cards displaying each prayer time

Clean and minimal layout

City selector using MUI Select component

🔮 Future Improvements

Countdown timer until the next prayer

Automatic prayer highlighting

Dark / Light mode support

More cities and countries

Mobile-first optimizations

📦 Installation & Run
npm install
npm start

📄 License

This project is open-source and free to use for learning and development purposes
