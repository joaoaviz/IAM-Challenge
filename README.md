# IAM Security Challenge

An interactive web application designed to teach Identity and Access Management (IAM) security concepts through practical examples and challenges.

## Features

- Mobile-first, responsive design
- Interactive security challenges
- Real-time achievement tracking
- Simulated vulnerabilities for learning
- Multi-factor authentication simulation
- Detailed explanations of security concepts

## Security Concepts Covered

1. User Enumeration
2. Password Security
3. Multi-Factor Authentication (MFA)
4. Access Control
5. Session Management

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Challenge Structure

1. **Home Page**
   - Introduction to the challenge
   - Links to learning resources

2. **Login Page**
   - Username/password authentication
   - MFA for boss accounts
   - Intentional vulnerabilities for learning

3. **Dashboard**
   - IAM security information
   - Achievement tracking

4. **Admin Page**
   - Hidden functionality
   - Access control challenges

5. **Logs Page**
   - Simulated system logs
   - Developer comments

## Available Accounts

- **Company Account**
  - Username: `exalt`
  - Password: `shield`

- **Boss Accounts**
  - Username: `Morgan` / Password: `Elodie`
  - Username: `Elodie` / Password: `Morgan`
  - Both require MFA code: `1234`

- **Bypass Account**
  - Username: `joao`
  - Password: `AVIZ`

## Achievements

Track your progress through various security challenges:

- User Enumeration
- Password Cracker
- MFA Destroyer
- Path Finder
- Too Good to Be True
- Gimme That Money
- Straight to the Point
- Robin Hood
- Selfish Hacker

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- NextAuth.js
- React-Confetti

## Development

### Project Structure

```
src/
├── app/
│   ├── admin/
│   ├── dashboard/
│   ├── login/
│   ├── logs/
│   └── win/
├── components/
│   ├── AchievementsPanel.tsx
│   └── Navbar.tsx
├── styles/
│   └── globals.css
└── types/
```

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- PortSwigger Academy for OWASP resources
- The security community for vulnerability research 