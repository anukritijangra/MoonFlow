# MoonFlow

**MoonFlow** is a modern, fullstack period tracker app built using the MERN stack. It helps users easily track their menstrual cycles, interpret blood color patterns, analyze trends, and learn more about their reproductive health — all with a clean, user-friendly interface.


## About the Project

MoonFlow empowers individuals by giving them control and clarity over their menstrual health. From tracking periods and symptoms to learning what different blood colors indicate — MoonFlow is more than just a tracker; it's a personal cycle assistant.


## Features

- **Cycle Tracking** — Easily log period start dates and view your history
- **Blood Color Analysis** — Insights on what different period blood colors may indicate
- **Stats Dashboard** — Track cycle length, bleeding days, and view trends over time
- **Learn Section** — Education on period health, blood changes, symptoms, and more
- **Settings** — Customize average cycle length and app behavior


## Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Tools**: Git, GitHub, Postman, VS Code


## Folder Structure

```
MoonFlow/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── App.js
│       └── index.js
├── server/                 # Backend using Express.js
│   ├── routes/             # API routes
│   ├── models/             # MongoDB models
│   └── server.js           # Main entry point
├── .gitignore
└── README.md
```


## Installation & Running Locally

### Step-by-step setup guide:

```bash
# 1. Clone the repository
git clone https://github.com/anukritijangra/MoonFlow.git

# 2. Navigate into the project folder
cd MoonFlow

# 3. Install frontend dependencies
cd client
npm install

# 4. Install backend dependencies
cd ../server
npm install

# 5. Start the backend server
node server.js

# 6. Start the frontend (in a new terminal)
cd ../client
npm start
```

**Note:** Make sure you have MongoDB installed and running locally (or set up with MongoDB Atlas).


## Future Enhancements

- User authentication (login/signup)
- Mobile responsive UI
- Period reminder notifications
- Email alerts & cycle predictions
- Advanced analytics dashboard


## Author

Made with love & logic by **Anukriti Jangra** 

If you liked the project, feel free to leave a ⭐️ and connect!


## License

This project is open source and available under the [MIT License](LICENSE).

