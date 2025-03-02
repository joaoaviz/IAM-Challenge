export const translations = {
  en: {
    achievements: {
      title: 'Achievements',
      expand: 'Expand achievements',
      collapse: 'Collapse achievements',
      user_enumeration: {
        title: 'User Enumeration',
        description: 'You discovered a user enumeration vulnerability!'
      },
      password_cracker: {
        title: 'Password Cracker',
        description: 'You successfully cracked a user password!'
      },
      mfa_destroyer: {
        title: 'MFA Destroyer',
        description: 'You bypassed the MFA security!'
      },
      path_finder: {
        title: 'Path Finder',
        description: 'You found a hidden path in the application!'
      },
      too_good: {
        title: 'Too Good',
        description: 'You found a way to bypass the authentication!'
      },
      gimme_money: {
        title: 'Gimme Money',
        description: 'You found a way to increase your balance!'
      },
      straight_to_point: {
        title: 'Straight to the Point',
        description: 'You found a direct way to access sensitive data!'
      },
      robin_hood: {
        title: 'Robin Hood',
        description: 'You transferred money to another user!'
      },
      selfish_hacker: {
        title: 'Selfish Hacker',
        description: 'You transferred money to yourself!'
      },
      description: 'Track your progress through the challenge',
      unlocked: 'Unlocked!',
      locked: 'Keep trying!'
    },
    login: {
      title: 'Login',
      username: 'Username',
      password: 'Password',
      submit: 'Submit',
      error: 'Invalid credentials',
      errorUsername: 'Invalid username',
      errorPassword: 'Incorrect password for this user',
      errorHighlight: 'Pay attention to this error message...',
      loginButton: 'Login',
      resetGame: 'Reset Game',
      resetConfirmation: 'Are you sure you want to reset the game? This will clear all your progress.',
      cancel: 'Cancel',
      checkHints: 'There are some hints in the home page if you need',
      exaltHint: 'The best Exalt entity',
      companyNameHint: 'Hint: We work for a great company',
      homePageHint: 'There are some hints in the home page if you need them',
      mfa: {
        title: 'Two-Factor Authentication',
        description: 'Please enter the verification code sent to your device',
        expiresIn: 'Code expires in',
        verifyButton: 'Verify Code',
        backToLogin: 'Back to Login',
        error: 'Incorrect MFA code',
        hints: {
          noMaxAttempts: "Hint: there's no maximum number of attempts ?",
          simpleDemo: 'Hint: try something simple, this is a demo…',
          tryCode: 'Hint: ok I really want you to complete the challenge, try 1234'
        }
      }
    },
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      viewLogs: 'View Logs',
      win: 'The End 🎭',
      admin: 'Admin',
      logout: 'Logout',
      login: 'Login'
    },
    dashboard: {
      title: 'IAM Security Dashboard',
      attackDistribution: 'IAM Attack Distribution',
      bestPractices: 'IAM Best Practices Adoption',
      securityTips: 'Security Tips',
      tips: {
        errorMessages: 'Always implement consistent error messages',
        passwordPolicies: 'Enforce strong password policies',
        sessionManagement: 'Use secure session management',
        accessControls: 'Implement proper access controls',
        rateLimiting: 'Rate limit authentication attempts',
        title: 'IAM Security Tips',
        mfa: {
          title: 'Multi-Factor Authentication',
          description: 'Implement MFA for all privileged accounts to prevent unauthorized access.'
        },
        leastPrivilege: {
          title: 'Least Privilege',
          description: 'Grant minimal permissions required for users to perform their tasks.'
        },
        monitoring: {
          title: 'Continuous Monitoring',
          description: 'Monitor and audit access patterns to detect suspicious activities.'
        }
      },
      vulnerabilities: {
        userEnumeration: {
          title: 'User Enumeration',
          description: 'User enumeration occurs when an application reveals whether a username exists in the system. This commonly happens through different error messages for invalid usernames vs. invalid passwords.'
        },
        weakPasswords: {
          title: 'Weak Password Policies',
          description: 'Many systems fail to enforce strong password requirements or allow common passwords. This makes brute-force and dictionary attacks more effective.'
        },
        mfa: {
          title: 'Insufficient MFA Implementation',
          description: 'Poor MFA implementation, such as using predictable codes or not limiting attempts, can make this additional security layer ineffective.'
        },
        accessControl: {
          title: 'Broken Access Control',
          description: 'When applications fail to properly verify permissions at each request, users might access unauthorized resources by manipulating URLs or parameters.'
        }
      },
      stats: {
        title: 'IAM Security Statistics',
        breaches: {
          title: 'Data Breaches',
          description: '94% of data breaches involve compromised identities'
        },
        costs: {
          title: 'Financial Impact',
          description: 'Average cost of a data breach: $4.35M in 2022'
        },
        attacks: {
          title: 'Attack Surface',
          description: '61% of breaches involve credentials'
        },
        mfa: {
          title: 'MFA Effectiveness',
          description: 'MFA can prevent 99.9% of account compromise attacks'
        },
        phishing: 'Phishing',
        bruteforce: 'Brute Force',
        privilegeEsc: 'Privilege Escalation',
        sessionHijack: 'Session Hijacking',
        other: 'Other'
      },
      practices: {
        title: 'Adoption Rate',
        mfa: 'MFA',
        passwordPolicy: 'Password Policy',
        accessReview: 'Access Review',
        logging: 'Security Logging',
        automation: 'IAM Automation'
      }
    },
    logs: {
      title: 'System Logs',
      tableHeaders: {
        timestamp: 'Timestamp',
        ipAddress: 'IP Address',
        method: 'Method',
        path: 'Path',
        status: 'Status'
      },
      devNotes: {
        title: 'Developer Notes',
        frontEnd: {
          author: 'Front End Dev',
          comment: "I've removed the button from the navigation bar, no one will go to it manually…"
        },
        backEnd: {
          author: 'Back End Dev',
          comment: "you should improve the autorisation process, I did the backend…"
        },
        devOps: {
          author: 'Dev Ops',
          comment: "I left the logs visible for debugging"
        }
      },
      finalHint: 'Really ???? try manually navigating to /admin'
    },
    home: {
      title: 'IAM Security Challenge: Break the System!',
      description: 'Welcome to the Identity and Access Management (IAM) Security Challenge! Your mission is to exploit security vulnerabilities and gain unauthorized access. Complete each step to win, and collect achievements along the way!',
      steps: {
        title: 'Challenge Steps:',
        step1: {
          title: 'Step 1: Crack the Gate',
          description: 'First, you need to find a way into the system. Look for valid credentials.',
          hint: 'If you ever feel lost, remember that \'Exalt\' might offer both guidance and protection like a \'Shield\'.'
        },
        step2: {
          title: 'Step 2: Explore the System',
          description: 'Every system keeps records of what\'s happening. Developers often leave valuable information behind.',
          hint: 'System logs and developer notes can reveal secrets. Where would you find such information?'
        },
        step3: {
          title: 'Step 3: Find the Secret Path',
          description: 'There\'s a hidden section in this application that\'s not meant to be found.',
          hint: 'You can go to a webpage without clicking a link... What paths might exist that aren\'t shown in the navigation?'
        },
        step4: {
          title: 'Step 4: Bypass the Guards',
          description: 'Security measures are in place, but they might not be perfect.',
          hint: 'Multi-factor authentication can be tricky to implement correctly. Look for weaknesses in how it\'s validated.'
        },
        step5: {
          title: 'Step 5: Secure the Prize',
          description: 'Now that you have access, it\'s time to claim your reward.',
          hint: 'Some actions are restricted to certain roles. But are these restrictions properly enforced everywhere?'
        }
      },
      tips: {
        title: 'Security Vulnerabilities to Watch For:',
        authentication: 'Pay attention to how the system responds to repeated attempts',
        navigation: 'Important data can be found in unexpected places',
        permissions: 'Authorization checks might be inconsistent',
        sessions: 'Security features can have implementation flaws',
        parameters: 'Input validation might not cover all cases'
      },
      buttons: {
        course: 'Begin the Hunt',
        owasp: 'Learn About Security Vulnerabilities'
      }
    },
    admin: {
      title: 'Admin Dashboard',
      revenue: {
        title: 'Revenue Growth',
        current: 'Current Revenue',
        growth: 'Revenue Growth',
        billion: 'B',
        million: 'M'
      },
      stats: {
        growth: 'YoY Growth',
        employees: 'Total Employees'
      },
      actions: {
        raise: {
          button: 'Give Everyone a Raise',
          individual: {
            button: 'Give Individual Raise',
            title: 'Give a Raise to Employee',
            label: 'Employee Name',
            submit: 'Give Raise',
            cancel: 'Cancel'
          },
          success: 'Raises have been given successfully!',
          error: 'Only the General Directors can give raises.',
          notConnected: 'You must be logged in to perform this action.',
          collectiveError: "You can't just give everyone a raise!\nWhat do you think this is, a charity?\nYou must be connected with a General Director to perform this action.",
          individualError: "Nice try, but {employee} isn't getting a raise today!\nYou must be connected with a General Director to perform this action.",
          successMessages: {
            collective: "🎉 Woohoo! You're the best boss ever!\n💰 Everyone's getting a raise!\n🌟 Time to celebrate!",
            individual: "🌟 Great choice! {employee} deserves it!\n💸 The raise has been processed!\n🎯 Making dreams come true, one raise at a time!"
          },
          continueToWin: "🏆 Mission Accomplished! Let's Celebrate! 🎉"
        }
      }
    },
    win: {
      title: '🎉 Congratulations! You\'ve Completed the Challenge!',
      vulnerabilities: {
        title: 'Vulnerabilities Exploited & Best Practices',
        userEnumeration: {
          title: '1. User Enumeration & Information Leakage',
          exploited: 'What Was Exploited:',
          description: 'The application revealed different error messages for "incorrect username" vs "incorrect password", allowing attackers to enumerate valid usernames. This vulnerability was used to discover the \'exalt\' and boss accounts.',
          bestPractice: 'Best Practice:',
          solution: 'Use uniform error messages (e.g., "Invalid credentials") regardless of whether the username exists or the password is incorrect. This prevents attackers from determining which usernames are valid.'
        },
        bruteForce: {
          title: '2. Brute Force & Lack of Rate Limiting',
          exploited: 'What Was Exploited:',
          description: 'The application had no limit on login attempts, allowing unlimited password guessing. After 10 attempts, it even provided hints to help crack the passwords.',
          bestPractice: 'Best Practice:',
          solution: 'Implement account lockouts, CAPTCHAs, or exponential back-off mechanisms. Never provide hints that could help attackers guess credentials.'
        },
        mfa: {
          title: '3. Broken Multi-Factor Authentication (MFA)',
          exploited: 'What Was Exploited:',
          description: 'The MFA implementation used a static, predictable code (1234) and provided hints after failed attempts. There was no rate limiting on MFA attempts.',
          bestPractice: 'Best Practice:',
          solution: 'Use strong MFA methods like TOTP (Time-based One-Time Password) with proper rate limiting. Never use static codes or provide hints that could help bypass MFA.'
        },
        idor: {
          title: '4. Insecure Direct Object References (IDOR) / URL Manipulation',
          exploited: 'What Was Exploited:',
          description: 'The admin page could be accessed by directly typing the URL, bypassing the UI-based access controls. The application relied on hiding the admin button rather than proper authorization.',
          bestPractice: 'Best Practice:',
          solution: 'Implement proper authorization checks on all endpoints. Never rely on UI hiding for security. Validate user permissions server-side for every request.'
        },
        session: {
          title: '5. Session Management Issues',
          exploited: 'What Was Exploited:',
          description: 'The application used simple cookie-based authentication without proper session management. No session timeout or proper session binding was implemented.',
          bestPractice: 'Best Practice:',
          solution: 'Implement proper session management with timeouts, secure session IDs, and proper session binding. Use secure session storage and implement proper logout functionality.'
        }
      },
      learnMore: {
        title: 'Learn More About Security:',
        iamCourse: 'Introduction to IAM Course',
        owasp: 'Introduction to OWASP'
      }
    }
  },
  fr: {
    achievements: {
      title: 'Réalisations',
      expand: 'Développer les succès',
      collapse: 'Réduire les succès',
      user_enumeration: {
        title: 'Énumération des Utilisateurs',
        description: 'Vous avez découvert une vulnérabilité d\'énumération des utilisateurs !'
      },
      password_cracker: {
        title: 'Casseur de Mot de Passe',
        description: 'Vous avez réussi à craquer un mot de passe utilisateur !'
      },
      mfa_destroyer: {
        title: 'Destructeur MFA',
        description: 'Vous avez contourné la sécurité MFA !'
      },
      path_finder: {
        title: 'Trouveur de Chemin',
        description: 'Vous avez trouvé un chemin caché dans l\'application !'
      },
      too_good: {
        title: 'Trop Fort',
        description: 'Vous avez trouvé un moyen de contourner l\'authentification !'
      },
      gimme_money: {
        title: 'Donnez-moi de l\'Argent',
        description: 'Vous avez trouvé un moyen d\'augmenter votre solde !'
      },
      straight_to_point: {
        title: 'Droit au But',
        description: 'Vous avez trouvé un moyen direct d\'accéder aux données sensibles !'
      },
      robin_hood: {
        title: 'Robin des Bois',
        description: 'Vous avez transféré de l\'argent à un autre utilisateur !'
      },
      selfish_hacker: {
        title: 'Hacker Égoïste',
        description: 'Vous avez transféré de l\'argent à vous-même !'
      },
      description: 'Suivez votre progression dans le défi',
      unlocked: 'Débloqué !',
      locked: 'Continuez d\'essayer !'
    },
    login: {
      title: 'Connexion',
      username: 'Nom d\'utilisateur',
      password: 'Mot de passe',
      submit: 'Soumettre',
      error: 'Identifiants invalides',
      errorUsername: 'Nom d\'utilisateur invalide',
      errorPassword: 'Mot de passe incorrect pour cet utilisateur',
      errorHighlight: 'Faites attention à ce message d\'erreur...',
      loginButton: 'Se connecter',
      resetGame: 'Réinitialiser le jeu',
      resetConfirmation: 'Êtes-vous sûr de vouloir réinitialiser le jeu ? Cela effacera toute votre progression.',
      cancel: 'Annuler',
      checkHints: 'Il y a des indices sur la page d\'accueil si vous en avez besoin',
      exaltHint: 'La meilleure entité Exalt',
      companyNameHint: 'Indice : Nous travaillons pour une super entreprise',
      homePageHint: 'Il y a des indices sur la page d\'accueil si vous en avez besoin',
      mfa: {
        title: 'Authentification à Deux Facteurs',
        description: 'Veuillez entrer le code de vérification envoyé à votre appareil',
        expiresIn: 'Le code expire dans',
        verifyButton: 'Vérifier le Code',
        backToLogin: 'Retour à la Connexion',
        error: 'Code MFA incorrect',
        hints: {
          noMaxAttempts: "Indice : il n'y a pas de nombre maximum de tentatives ?",
          simpleDemo: 'Indice : essayez quelque chose de simple, ceci est une démo…',
          tryCode: 'Indice : ok je veux vraiment que vous complétiez le défi, essayez 1234'
        }
      }
    },
    nav: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      viewLogs: 'Voir les logs',
      win: 'La Fin 🎭',
      admin: 'Admin',
      logout: 'Déconnexion',
      login: 'Connexion'
    },
    dashboard: {
      title: 'Tableau de Bord de Sécurité IAM',
      attackDistribution: 'Distribution des Attaques IAM',
      bestPractices: 'Adoption des Meilleures Pratiques IAM',
      securityTips: 'Conseils de Sécurité',
      tips: {
        errorMessages: 'Toujours implémenter des messages d\'erreur cohérents',
        passwordPolicies: 'Appliquer des politiques de mots de passe strictes',
        sessionManagement: 'Utiliser une gestion sécurisée des sessions',
        accessControls: 'Mettre en place des contrôles d\'accès appropriés',
        rateLimiting: 'Limiter les tentatives d\'authentification',
        title: 'Conseils de Sécurité IAM',
        mfa: {
          title: 'Authentification Multi-Facteurs',
          description: 'Implémentez la MFA pour tous les comptes privilégiés pour prévenir les accès non autorisés.'
        },
        leastPrivilege: {
          title: 'Moindre Privilège',
          description: 'Accordez les permissions minimales nécessaires aux utilisateurs pour effectuer leurs tâches.'
        },
        monitoring: {
          title: 'Surveillance Continue',
          description: 'Surveillez et auditez les modèles d\'accès pour détecter les activités suspectes.'
        }
      },
      vulnerabilities: {
        userEnumeration: {
          title: 'Énumération des Utilisateurs',
          description: 'L\'énumération des utilisateurs se produit lorsqu\'une application révèle si un nom d\'utilisateur existe dans le système. Cela se produit généralement à travers différents messages d\'erreur pour les noms d\'utilisateur invalides vs. les mots de passe invalides.'
        },
        weakPasswords: {
          title: 'Politiques de Mots de Passe Faibles',
          description: 'De nombreux systèmes ne parviennent pas à imposer des exigences strictes pour les mots de passe ou autorisent des mots de passe courants. Cela rend les attaques par force brute et par dictionnaire plus efficaces.'
        },
        mfa: {
          title: 'Implémentation MFA Insuffisante',
          description: 'Une mauvaise implémentation MFA, comme l\'utilisation de codes prévisibles ou l\'absence de limitation des tentatives, peut rendre cette couche de sécurité supplémentaire inefficace.'
        },
        accessControl: {
          title: 'Contrôle d\'Accès Défectueux',
          description: 'Lorsque les applications ne vérifient pas correctement les permissions à chaque requête, les utilisateurs peuvent accéder à des ressources non autorisées en manipulant les URLs ou les paramètres.'
        }
      },
      stats: {
        title: 'Statistiques de Sécurité IAM',
        breaches: {
          title: 'Fuites de Données',
          description: '94% des fuites de données impliquent des identités compromises'
        },
        costs: {
          title: 'Impact Financier',
          description: 'Coût moyen d\'une fuite de données : 4,35M$ en 2022'
        },
        attacks: {
          title: 'Surface d\'Attaque',
          description: '61% des violations impliquent des identifiants'
        },
        mfa: {
          title: 'Efficacité MFA',
          description: 'La MFA peut prévenir 99,9% des attaques de compromission de compte'
        },
        phishing: 'Hameçonnage',
        bruteforce: 'Force Brute',
        privilegeEsc: 'Élévation de Privilèges',
        sessionHijack: 'Détournement de Session',
        other: 'Autre'
      },
      practices: {
        title: 'Taux d\'Adoption',
        mfa: 'MFA',
        passwordPolicy: 'Politique de Mot de Passe',
        accessReview: 'Revue des Accès',
        logging: 'Journalisation de Sécurité',
        automation: 'Automatisation IAM'
      }
    },
    logs: {
      title: 'Journaux Système',
      tableHeaders: {
        timestamp: 'Horodatage',
        ipAddress: 'Adresse IP',
        method: 'Méthode',
        path: 'Chemin',
        status: 'Statut'
      },
      devNotes: {
        title: 'Notes des Développeurs',
        frontEnd: {
          author: 'Développeur Front-End',
          comment: "J'ai supprimé le bouton de la barre de navigation, personne n'y accédera manuellement…"
        },
        backEnd: {
          author: 'Développeur Back-End',
          comment: "vous devriez améliorer le processus d'autorisation, j'ai fait le backend…"
        },
        devOps: {
          author: 'DevOps',
          comment: "J'ai laissé les logs visibles pour le débogage"
        }
      },
      finalHint: 'Vraiment ???? essayez de naviguer manuellement vers /admin'
    },
    home: {
      title: 'Défi de Sécurité IAM : Infiltrez le Système !',
      description: 'Bienvenue au Défi de Sécurité IAM ! Votre mission est d\'exploiter les vulnérabilités de sécurité et d\'obtenir un accès non autorisé. Complétez chaque étape pour gagner, et collectez des succès en cours de route !',
      steps: {
        title: 'Étapes du Défi :',
        step1: {
          title: 'Étape 1 : Forcez la Porte',
          description: 'D\'abord, vous devez trouver un moyen d\'entrer dans le système. Cherchez des identifiants valides.',
          hint: 'Si jamais tu te sens perdu, souviens-toi que \'Exalt\' pourrait offrir à la fois guidance et protection, tel un \'Bouclier\'.'
        },
        step2: {
          title: 'Étape 2 : Explorez le Système',
          description: 'Chaque système garde des traces de ce qui se passe. Les développeurs laissent souvent des informations précieuses.',
          hint: 'Les journaux système et les notes des développeurs peuvent révéler des secrets. Où pourriez-vous trouver ces informations ?'
        },
        step3: {
          title: 'Étape 3 : Trouvez le Chemin Secret',
          description: 'Il y a une section cachée dans cette application qui n\'est pas censée être trouvée.',
          hint: 'Vous pouvez accéder à une page web sans cliquer sur un lien... Quels chemins pourraient exister qui ne sont pas affichés dans la navigation ?'
        },
        step4: {
          title: 'Étape 4 : Contournez les Gardes',
          description: 'Des mesures de sécurité sont en place, mais elles pourraient ne pas être parfaites.',
          hint: 'L\'authentification à deux facteurs peut être délicate à implémenter correctement. Cherchez des faiblesses dans sa validation.'
        },
        step5: {
          title: 'Étape 5 : Sécurisez le Prix',
          description: 'Maintenant que vous avez accès, il est temps de réclamer votre récompense.',
          hint: 'Certaines actions sont réservées à certains rôles. Mais ces restrictions sont-elles correctement appliquées partout ?'
        }
      },
      tips: {
        title: 'Vulnérabilités de Sécurité à Surveiller :',
        authentication: 'Faites attention à la façon dont le système répond aux tentatives répétées',
        navigation: 'Des données importantes peuvent se trouver dans des endroits inattendus',
        permissions: 'Les vérifications d\'autorisation peuvent être incohérentes',
        sessions: 'Les fonctionnalités de sécurité peuvent avoir des défauts d\'implémentation',
        parameters: 'La validation des entrées peut ne pas couvrir tous les cas'
      },
      buttons: {
        course: 'Commencer la Chasse',
        owasp: 'En Savoir Plus sur les Vulnérabilités'
      }
    },
    admin: {
      title: 'Tableau de Bord Admin',
      revenue: {
        title: 'Croissance des Revenus',
        current: 'Chiffre d\'affaire',
        growth: 'Croissance des Revenus',
        billion: 'Mrd',
        million: 'M'
      },
      stats: {
        growth: 'Croissance Annuelle',
        employees: 'Nombre Total d\'Employés'
      },
      actions: {
        raise: {
          button: 'Donner une Augmentation à Tous',
          individual: {
            button: 'Donner une Augmentation Individuelle',
            title: 'Donner une Augmentation à un Employé',
            label: 'Nom de l\'Employé',
            submit: 'Donner l\'Augmentation',
            cancel: 'Annuler'
          },
          success: 'Les augmentations ont été accordées avec succès !',
          error: 'Seuls les Directeurs Généraux peuvent donner des augmentations.',
          notConnected: 'Vous devez être connecté pour effectuer cette action.',
          collectiveError: "Vous ne pouvez pas simplement donner une augmentation à tout le monde !\nQue pensez-vous que c'est, une charité ?\nVous devez être connecté avec un Directeur Général pour effectuer cette action.",
          individualError: "Bien essayé, mais {employee} n'obtient pas d'augmentation aujourd'hui !\nVous devez être connecté avec un Directeur Général pour effectuer cette action.",
          successMessages: {
            collective: "🎉 Hourra ! Vous êtes le meilleur patron !\n💰 Tout le monde reçoit une augmentation !\n🌟 C'est l'heure de célébrer !",
            individual: "🌟 Excellent choix ! {employee} le mérite !\n💸 L'augmentation a été traitée !\n🎯 Réaliser des rêves, une augmentation à la fois !"
          },
          continueToWin: "🏆 Mission Accomplie ! Célébrons ! 🎉"
        }
      }
    },
    win: {
      title: '🎉 Félicitations ! Vous avez terminé le défi !',
      vulnerabilities: {
        title: 'Vulnérabilités Exploitées & Bonnes Pratiques',
        userEnumeration: {
          title: '1. Énumération des Utilisateurs & Fuite d\'Information',
          exploited: 'Ce qui a été exploité :',
          description: 'L\'application affichait différents messages d\'erreur pour "nom d\'utilisateur incorrect" vs "mot de passe incorrect", permettant aux attaquants d\'énumérer les noms d\'utilisateur valides. Cette vulnérabilité a été utilisée pour découvrir les comptes \'exalt\' et administrateur.',
          bestPractice: 'Bonne Pratique :',
          solution: 'Utiliser des messages d\'erreur uniformes (ex : "Identifiants invalides") indépendamment de l\'existence du nom d\'utilisateur ou de l\'incorrection du mot de passe. Cela empêche les attaquants de déterminer quels noms d\'utilisateur sont valides.'
        },
        bruteForce: {
          title: '2. Force Brute & Absence de Limitation de Taux',
          exploited: 'Ce qui a été exploité :',
          description: 'L\'application n\'avait pas de limite sur les tentatives de connexion, permettant des essais illimités de mots de passe. Après 10 tentatives, elle fournissait même des indices pour aider à craquer les mots de passe.',
          bestPractice: 'Bonne Pratique :',
          solution: 'Mettre en place des verrouillages de compte, des CAPTCHAs ou des mécanismes de temporisation exponentielle. Ne jamais fournir d\'indices qui pourraient aider les attaquants à deviner les identifiants.'
        },
        mfa: {
          title: '3. Authentification Multi-Facteurs (MFA) Défectueuse',
          exploited: 'Ce qui a été exploité :',
          description: 'L\'implémentation MFA utilisait un code statique et prévisible (1234) et fournissait des indices après des tentatives échouées. Il n\'y avait pas de limitation de taux sur les tentatives MFA.',
          bestPractice: 'Bonne Pratique :',
          solution: 'Utiliser des méthodes MFA robustes comme TOTP (Mot de passe à usage unique basé sur le temps) avec une limitation de taux appropriée. Ne jamais utiliser de codes statiques ou fournir des indices qui pourraient aider à contourner la MFA.'
        },
        idor: {
          title: '4. Références Directes à des Objets Non Sécurisées (IDOR) / Manipulation d\'URL',
          exploited: 'Ce qui a été exploité :',
          description: 'La page d\'administration était accessible en tapant directement l\'URL, contournant les contrôles d\'accès basés sur l\'interface utilisateur. L\'application se fiait à la dissimulation du bouton admin plutôt qu\'à une autorisation appropriée.',
          bestPractice: 'Bonne Pratique :',
          solution: 'Mettre en place des contrôles d\'autorisation appropriés sur tous les points d\'accès. Ne jamais se fier à la dissimulation dans l\'interface pour la sécurité. Valider les permissions des utilisateurs côté serveur pour chaque requête.'
        },
        session: {
          title: '5. Problèmes de Gestion de Session',
          exploited: 'Ce qui a été exploité :',
          description: 'L\'application utilisait une authentification simple basée sur les cookies sans gestion de session appropriée. Aucun délai d\'expiration de session ou liaison de session appropriée n\'était implémenté.',
          bestPractice: 'Bonne Pratique :',
          solution: 'Mettre en place une gestion de session appropriée avec des délais d\'expiration, des identifiants de session sécurisés et une liaison de session appropriée. Utiliser un stockage de session sécurisé et implémenter une fonctionnalité de déconnexion appropriée.'
        }
      },
      learnMore: {
        title: 'En Savoir Plus sur la Sécurité :',
        iamCourse: 'Introduction à la Sécurité IAM',
        owasp: 'Introduction à l\'OWASP'
      }
    }
  }
} 