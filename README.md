# Personal Portfolio Template

A modern, minimalist portfolio website template built with Node.js, Express, and EJS. This project features real-time Discord integration via Lanyard, a custom cursor implementation, and a responsive split-layout design.

## Features

- **Modern Architecture:** Built on a robust Node.js and Express backend with EJS templating.
- **Discord Integration:** Real-time status updates (Online, Idle, DND, Offline) and activity tracking (Spotify, Games) using the Lanyard API.
- **Dynamic Content:** Automatically fetches and displays GitHub repositories.
- **Responsive Design:** A split-layout interface that adapts seamlessly to mobile, tablet, and desktop viewports.
- **Custom UI Elements:** Includes a custom cursor, glassmorphism effects, and smooth CSS animations.
- **Configurable:** Centralized configuration file for easy customization of personal details, social links, and theme settings.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hzKamburga/Personal-portfolios.git
    cd Personal-portfolios
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration:**
    Open `config/settings.js` and update the following fields:
    - `personal`: Update name, title, description, and social links.
    - `social.discord`: Enter your Discord User ID (Required for Lanyard integration).
    - `social.github`: Enter your GitHub username.
    - `skills`: Add or remove skills from the array.

4.  **Start the application:**
    ```bash
    npm start
    ```
    For development with auto-reload:
    ```bash
    npm run dev
    ```

5.  **Access the site:**
    Open your browser and navigate to `http://localhost:3000`.

## Configuration Guide

The application is configured via `config/settings.js`. Below is an overview of the configuration structure:

```javascript
module.exports = {
    personal: {
        name: "Your Name",
        title: "Your Title",
        description: "Your bio...",
        social: {
            discord: "YOUR_DISCORD_ID", // Critical for Lanyard integration
            github: "your_github_username",
            // Add other social links as needed
        }
    },
    skills: ["JavaScript", "Node.js", "React"],
    // ...
};
```

## Project Structure

- `server.js`: Entry point of the application. Handles routing and server configuration.
- `config/`: Contains configuration files (`settings.js`).
- `public/`: Static assets (CSS, JavaScript, Images).
- `views/`: EJS templates for rendering pages.

## Contributing

Contributions are welcome. Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.