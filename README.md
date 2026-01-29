🔐 Password Strength Checker

A real-time password strength checker that evaluates password security using entropy calculation, common security rules, and estimated crack time — all performed on the client side for privacy and speed.

🚀 Features

Real-time strength analysis as the user types

Entropy-based evaluation to measure password randomness

Checks common security criteria:

Length

Uppercase & lowercase letters

Numbers

Special characters

Estimated crack time display to show resistance against brute-force attacks

Client-side processing — no passwords are stored or sent to a server

🛠️ Tech Stack

HTML

CSS

JavaScript

(Optional if applicable) TypeScript / TailwindCSS

📸 Demo

👉 Live Demo: (Add your deployed link here)

📂 Project Structure
password-strength-checker/
│
├── index.html
├── style.css
├── script.js
└── README.md

⚙️ How It Works

User enters a password

The application:

Calculates entropy based on character set

Applies predefined security rules

Estimates time required to crack the password

Displays strength feedback instantly (Weak / Medium / Strong)

🔒 Security Note

All analysis is performed locally in the browser

No passwords are logged, stored, or transmitted

Safe for testing sensitive passwords

📌 Future Improvements

Dictionary and leaked-password detection

Visual strength meter with animations

Dark mode support

Mobile UI enhancements
