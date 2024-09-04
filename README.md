# 🎮 TicTacToe

## 💬 Description

This project is a versatile web-based application that allows users to engage in various modes of gameplay, including Local Co-op, Single Player, and Online Mode. The project utilizes a combination of HTML, CSS, JavaScript, AJAX, and PHP to deliver an interactive and responsive gaming experience.

## ⚙️ Features

- **Local Co-op Mode**: Play with a friend on the same device.
- **Single Player Mode**: Play against the computer AI.
- **Online Mode**: Connect and play with other players online.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-Time Gameplay**: Smooth and seamless gaming experience across all modes.
- **Session Handling**: Supports multiple pairs of players playing simultaneously, ensuring each game session is independent and isolated.

## 📹 Demo

- **Live Demo**: Check out the [Tic Tac Toe](https://gunavarthan.github.io/TicTacToe/HTML/MainMenue.html) to experience the game.

https://github.com/user-attachments/assets/6df98d28-c398-4ad1-8efc-22d00cca9fdf

## 🔧 Usage

### 👥 Local Co-op Mode
- Navigate to the Local Co-op section.
- Two players can use the same device to play against each other.

###  👤 Single Player Mode
- Navigate to the Single Player section.
- Play against the computer with AI.

### 🌐 Online Mode
####  (Currently Unavailable due to lack of Server Resources) ❌
- Navigate to the Online Mode section.
- Connect with players online and engage in real-time gameplay.
- Use of QR code / Room ID to connect to a session.
- The online Mode can be accessed by recreating the database

### 🗒️ Other Instructions
- Ensure your internet connection is active for Online Mode.
- Customize your gameplay experience in the settings menu.

## 💡 Technologies Used

- **HTML**: Structure and content of the web pages.
- **CSS**: Styling and layout of the application.
- **JavaScript**: Interactivity and dynamic content handling.
- **AJAX**: Asynchronous data loading and real-time updates.
- **PHP**: Server-side scripting and database interaction.
- **MySQL**: Database management for user data and game records.

## ⛁ SQL Queries to Recreate Online Mode
```sql
CREATE TABLE `sessions` (
  `session_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`session_id`)
)

CREATE TABLE `board` (
  `cell_index` int NOT NULL,
  `value` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`cell_index`)
) 
```

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
