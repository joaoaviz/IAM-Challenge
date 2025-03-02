
## General Design & Navigation

### Mobile-First Design

- **Responsive Layout:**  
  Every page must be built responsively using CSS media queries (or equivalent frameworks) so that the UI adapts to smartphones, tablets, and desktops.
- **Adaptive Components:**  
  Navigation bars, forms, and panels should adjust gracefully on smaller screens.
- **Achievements Panel:**  
  Should be available as a collapsible or slide-out panel on mobile devices to preserve screen real estate.

### Global Navbar (For Connected Users)

- **Left Section:**  
  - “Home” button (always redirects to the Home page).
- **Right Section:**  
  - A language toggle button (switch between English and French).
  - For every connected user, a **“View Logs” button** must appear.
  - Depending on the authentication state, display either a **“Login”** (if not logged in) or **“Logout”** button (if logged in).

### Achievements Panel (On Every Page Except Home)

- **Display:**  
  - A list of achievement titles.
  - Once an achievement is completed, its description appears under the title.
- **Unlocking Mechanism:**  
  Achievements are unlocked based on user actions (e.g., discovering a valid username, cracking a password, entering a correct MFA code, etc.).
- **Mobile Consideration:**  
  On mobile devices, the panel should be accessible via a toggle or slide-out mechanism.

---

## Page Specifications

### 1. Home Page

- **Purpose:**  
  - Introduce the challenge.
  - Explain the objective (“hack” the system).
  - Provide links to additional learning resources.
  
- **Navbar:**  
  - **Left:** “Home” button.
  - **Right:** “Login” button and the language toggle.

- **Content:**  
  - A clear explanation of the game’s goal and its educational intent.
  - **Two buttons at the bottom:**
    - **Introduction to IAM Course:**  
      - Must link to a locally built course page or custom resource (not merely an href to YouTube).
    - **Introduction to OWASP:**  
      - Link this button to PortSwigger Academy.

- **Mobile-First Considerations:**  
  - Use large, touch-friendly buttons and legible text.
  - Ensure proper padding and spacing for a comfortable mobile experience.

---

### 2. Login Page

- **Access:**  
  - Accessible only when the user is not logged in.

- **Navbar:**  
  - Display only the “Home” button (the language toggle remains on the far right).

- **Login Form:**  
  - **Fields:** Username and Password.
  - Use clear, responsive input fields and a prominent submit button.

- **Error Handling & Hints:**

  - **Error Messages:**
    - Display “incorrect username” when the username is not recognized.
    - Display “incorrect password” when the username is found but the password is wrong.
  
  - **User Enumeration & Account Details:**
    - **Available Accounts:**
      - **exalt:**
        - Company account (should be discovered first).
        - **Password:** `shield`
      - **Morgan & Elodie:**
        - Boss accounts (discovered only after exalt).
        - **Passwords:** Each boss’s password is the name of the other (e.g., if logging in as Elodie, the password is `Morgan` and vice versa).
      - **Bypass Account:**
        - **Username:** `joao`
        - **Password:** `AVIZ`
        - **Special Behavior:**  
          If a wrong password is entered for “joao”, immediately display the hint: “WHAT ARE YOU DOING?”.

  - **Hint System & Attempt Tracking:**
    - **Global Wrong Attempt Counter:**
      - Displayed on the page (e.g., “Global failed attempts: X”).
    - **Backend Tracking:**
      - Track failed attempts individually per account; however, only the cumulative global counter is shown.
    - **Hints for the “exalt” Account:**
      - If no valid login occurs after **10 wrong attempts** (either globally or for the exalt account), display the hint: “the name of the company.”
      - Once the exalt account is identified, if the password is not entered correctly after **10 wrong attempts**, display: “Our entity.”
    - **Hints for Boss Accounts:**
      - Once exalt is discovered, display an additional hint: “find the account of one of the bosses.”
      - For Morgan or Elodie:  
        If a user fails **10 times** to enter the correct password for either, display the hint: “The bosses really like each other.”

  - **Multi-Factor Authentication (MFA) for Boss Accounts:**
    - After a successful boss account login, prompt the user for a **4-digit MFA code** (simulate it as “sent by text”).
    - **MFA Error Hints:**
      - After **5 wrong MFA attempts:** Display “there’s no maximum number of attempts ?”
      - After **10 wrong MFA attempts:** Display “try something simple, this is a demo…”
      - After **15 wrong MFA attempts:** Display “ok I really want you to complete the challenge, try 1234.”
    - **Note:** Every failed MFA attempt also increments the global wrong-attempt counter.

- **Mobile-First Considerations:**  
  - Ensure all form elements and error messages are legible on small screens.
  - The global attempt counter should be visible and easy to read without cluttering the interface.

---

### 3. Dashboard Page

- **Access:**  
  - Only accessible after successful login.
  - If not logged in, redirect to the Login page.

- **Navbar:**  
  - **Left:** “Home” button.
  - **Right:**  
    - Language toggle.
    - **“View Logs” button** (appears for every connected user).
    - **“Logout” button** (replacing the Login button).
  - **Additional:**  
    - If logged in as a boss (Morgan or Elodie), an **“Admin” button** must appear in the navbar.

- **Content:**  
  - Display random information about common vulnerabilities arising from bad IAM practices.
  - **Achievements Panel:**  
    - Displayed on the right (or via a toggle on mobile) and updates based on the actions the user performs.

- **Mobile-First Considerations:**  
  - Ensure the content and achievements panel adapt to smaller screen sizes, possibly stacking vertically or accessible via an expandable section.

---

### 4. Logs Page

- **Access:**  
  - Accessible only if the user is logged in, via the **“View Logs” button** available on every page for connected users.

- **Content:**

  - **Fake Log Simulation:**
    - The logs are simulated and do not represent real backend data.
  
  - **Fixed Developer Comments:**
    - **Front End Dev:**  
      “I’ve removed the button from the navigation bar, no one will go to it manually…”
    - **Back End Dev:**  
      “you should improve the autorisation process, I did the backend…”

  - **HTTP Request Logs:**
    - Display several static entries simulating HTTP requests to pages such as:
      - Home
      - Dashboard
      - Logs
      - A few entries for Admin (which should appear rarely)
    - **Each log entry must include:**
      - Date and Time.
      - A random IP address.
      - The requested page.

  - **Dynamic Real-Time Logs:**
    - In addition to the static logs, periodically (or on a timed interval) display random “real-time” log entries to simulate ongoing connections.

- **Mobile-First Considerations:**  
  - Format log entries for clarity on small screens (consider a collapsible/scrollable container).
  - Ensure that dynamic updates do not interfere with the mobile user experience.

---

### 5. Admin Page

- **Access:**  
  - Accessible only when the user is logged in.
  - **For users logged in with the exalt account:**  
    The Admin page is not linked via a visible button (users must navigate manually via URL).
  - **For boss accounts (Morgan or Elodie):**  
    The Admin button is visible on the Dashboard navbar.

- **Behavior Based on Logged-In Account:**

  - **If Logged in with the exalt Account:**
    - **Content:**
      - Display fun, “real-time” graphics showing simulated company revenue (a very high amount).
      - **Two Buttons:**
        1. **Give a 20% Salary Raise to Everyone:**  
           - On click, display an error message: “Only the bosses can give collective raises.”
        2. **Give a Raise to a Particular User:**  
           - On click, prompt for a username; then display an error message: “Only the bosses can give individual raises.”

  - **If Logged in as a Boss (Morgan or Elodie):**
    - **Content:**
      - When either raise button is clicked, trigger a confetti effect.
      - After a boss successfully “gives a raise” (either collective or individual), display a prominent button:
        - **“Click here to complete the challenge.”**  
          - This button redirects the user to the Win page.

- **Mobile-First Considerations:**  
  - Ensure that graphics, buttons, and any animations (such as confetti) are optimized for touch interaction on small screens.
  - Layouts must adjust so that all interactive elements remain easily clickable.

---

### 6. Win Page

- **Access:**  
  - Reachable only after a boss account successfully issues a raise and clicks the **“complete the challenge”** button.

- **Content:**
  - Provide a detailed explanation of **every vulnerability exploited** during the challenge.
  
  - **Example Vulnerabilities to Highlight:**
    1. **User Enumeration & Information Leakage:**
       - **What Was Exploited:**  
         Distinct error messages (“incorrect username” vs. “incorrect password”) allow attackers to enumerate valid usernames.
       - **Best Practice:**  
         Use uniform error messages (e.g., “Invalid credentials”) to prevent disclosing whether a username exists.
    2. **Brute Force & Lack of Rate Limiting:**
       - **What Was Exploited:**  
         The absence of rate limiting lets an attacker repeatedly try passwords until success.
       - **Best Practice:**  
         Implement account lockouts, CAPTCHAs, or exponential back-off mechanisms.
    3. **Broken Multi-Factor Authentication (MFA):**
       - **What Was Exploited:**  
         The demo illustrates how a weak MFA mechanism that doesn’t limit attempts can be brute forced.
       - **Best Practice:**  
         Use robust MFA methods (e.g., one-time passwords via authenticator apps) with secure delivery, validation, and a limit on the number of tries.
    4. **Insecure Direct Object References (IDOR) / URL Manipulation:**
       - **What Was Exploited:**  
         Manual navigation to the admin page shows that URLs and access controls can be bypassed if not properly validated.
       - **Best Practice:**  
         Validate user permissions on every endpoint and avoid exposing sensitive URLs without strict checks.
    5. **Session Management Issues:**
       - **What Was Exploited:**  
         Sessions remain active and the application relies on a “hidden” admin button rather than robust session checks.
       - **Best Practice:**  
         Enforce session expiration, regenerate session IDs after login, and bind sessions to user contexts.

  - **At the Bottom:**  
    Display the two course buttons:
    - **Introduction to IAM Course**
    - **Introduction to OWASP** (linking to PortSwigger Academy)

- **Mobile-First Considerations:**  
  - Use a clean, legible layout that scales well on small devices.
  - Ensure text and call-to-action buttons are prominent and touch-friendly.

---

## Backend & Data Tracking Requirements

- **Attempt Tracking:**
  - **Individual Account Tracking:**
    - Track failed login attempts for each account (exalt, Morgan, Elodie, and joao) separately in the backend.
    - Track MFA attempts separately for boss accounts.
  - **Global Wrong-Attempt Counter:**
    - Only the cumulative number of failed attempts is displayed on the front end.
    - Every failed login and every failed MFA attempt increments this global counter.

- **Session Management:**
  - Implement robust session management ensuring that only authenticated users can access Dashboard, Logs, Admin, and Win pages.
  - Redirect users to the Login page if their session expires or is invalid.

- **Language Switching:**
  - All text content must be fully localized in English and French.
  - Switching languages should update UI elements dynamically without requiring a full page reload if possible.

- **Logging & Analytics (Simulated):**
  - Create simulated logs that record HTTP request information:
    - Timestamps, random IP addresses, and the requested pages.
  - **Include Fixed Developer Comments:**
    - **Front End Dev:** “I’ve removed the button from the navigation bar, no one will go to it manually…”
    - **Back End Dev:** “you should improve the autorisation process, I did the backend…”
  - Generate several static log entries (targeting pages such as Home, Dashboard, Logs, and a few for Admin) as well as dynamic “real-time” entries to simulate ongoing activity.

---

## Achievements System

- **Display:**
  - The Achievements panel appears on every page except the Home page (or via a toggle on mobile).
- **Unlock Conditions & Examples:**
  - **User Enumeration:**  
    Unlocked when the first valid username is discovered.
  - **Password Cracker:**  
    Unlocked when the first correct password is identified.
  - **MFA Destroyer:**  
    Unlocked upon entering the first correct MFA code.
  - **Path Finder:**  
    Unlocked if a user logged in as “exalt” accesses the Admin page (even manually).
  - **Too Good to Be True:**  
    Unlocked when a user with the exalt account attempts a collective raise.
  - **Gimme That Money:**  
    Unlocked when a user with the exalt account attempts an individual raise.
  - **Straight to the Point:**  
    Unlocked when a user tries accessing the Admin page without being logged in.
  - **Robin Hood:**  
    Unlocked when a boss account successfully issues a collective raise.
  - **Selfish Hacker:**  
    Unlocked when a boss account successfully issues an individual raise.
  - **Bypass Account Achievement:**  
    Logging in as the bypass account (`joao`/`AVIZ`) automatically unlocks all achievements and reveals all hidden buttons.

---

## Summary

This PRD specifies a **mobile-first, responsive educational game** that simulates a flawed IAM system with multiple vulnerabilities. It details every aspect from page layout and navigation to backend tracking of failed attempts, multi-factor authentication, dynamic fake logs, and achievement unlocking. The application is designed to educate users on how poor IAM practices lead to security issues and how proper controls can mitigate these risks.

