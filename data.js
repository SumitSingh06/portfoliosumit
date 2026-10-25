// ============================================================
// SINGLE SOURCE OF TRUTH — edit ONLY this file for your details.
// Used by the website AND by the chatbot (api/chat.js).
// Search for "YOUR_" — every one must be replaced before submission.
// ============================================================
const PORTFOLIO = {
  name: "Sumit",
  tagline: "AI/ML student • Web builder • DSA in C++",
  intro:
    "Hi, I'm Sumit, a second-year B.Tech CSE AIML student in Jaipur. I use AI to solve real problems and build clean, interactive websites.",
  photo: "assets/profile.jpg", // put your photo here (falls back to initials if missing)
  location: "Jaipur, Rajasthan, India",

  github: "SumitSingh06", 
  email: "sumitapple622@gmail.com",
  linkedin: "https://www.linkedin.com/in/sumit-singh-9a4372315?utm_source=", 

  about: [
    "I am a second-year B.Tech Computer Science & Engineering student (AI/ML specialization) at JECRC University, Jaipur.",
    "I am a ex-Google Student Ambassador (GSA) under the Communique India / TeamGemini program, and I take the CTO role in team projects through my Entrepreneur Development Programme (EDP).",
    " I am an ex-NCC cadet — I cleared the 'B' Certificate exam with Grade A.",
  ],

  education: [
    {
      title: "B.Tech CSE (AI/ML)",
      place: "JECRC University, Jaipur",
      period: "2026 – present (2nd year)",
    },
  ],

  skills: {
    Languages: ["Python", "C++", "JavaScript", "HTML", "CSS"],
    "AI / ML": ["Machine Learning basics", "Data handling", "Prompting & AI-assisted coding"],
    "Tools & Web": ["Git", "GitHub", "Vercel", "Cursor AI", "REST APIs"],
    Core: ["Data Structures & Algorithms", "Problem solving", "Team leadership (CTO, EDP)"],
  },

  // Live links: put the deployed URL, or "" if none (button is then hidden).
  projects: [
    {
      id: "python-programs",
      title: "Python Programs Collection",
      repo: "python-25bcon2013",
      live: "https://github.com/SumitSingh06/python-25bcon2013",
      tech: ["Python", "Git", "GitHub", "Markdown"],
      description:
        "Beginner-friendly Python programs: Factorial, Fibonacci series, and Structure-to-Dictionary conversion, with a clean updated README.",
      details:
        "Factorial multiplies all numbers from 1 to n (done with a loop and with recursion). Fibonacci prints a series where each number is the sum of the previous two. The Structure-to-Dictionary program converts structured data (like a list of fields/records) into a Python dictionary of key-value pairs. The repository README explains each program and how to run it.",
    },
    {
      id: "messy-code",
      title: "Messy Python Code Improvement",
      repo: "prompting_25bcon2013",
      live: "https://github.com/SumitSingh06/prompting-25bcon2013",
      tech: ["Python", "AI Assistance", "Refactoring"],
      description:
        "A deliberately messy Python script cleaned up with AI help: better names, structure, functions and comments.",
      details:
        "The original script had unclear variable names, repeated code and no structure. With AI assistance I renamed variables meaningfully, split logic into small reusable functions, removed duplication and added comments, so the same behaviour became readable and maintainable.",
    },
    {
      id: "bug-fixing",
      title: "Bug Fixing Using Cursor AI",
      repo: "experiment-8-ai-debugging-25bcon2013", 
      live: "https://github.com/SumitSingh06/experiment-8-ai-debugging-25bcon2013",
      tech: ["Python", "unittest", "Cursor AI", "Debugging", "Testing"],
      description:
        "A buggy Python script (student_utils.py) with 3 bugs, proven with 9 unit tests (RED), fixed, and verified (GREEN).",
      details:
        "student_utils.py has three functions: calculate_average, is_passing and get_grade. I first wrote 9 unittest tests and ran them on the buggy code (RED), then fixed the code without changing the tests (GREEN: all 9 pass). Bug 1: calculate_average divided by len(marks) - 1, giving 135.0 instead of 90.0 for [80, 90, 100] and a ZeroDivisionError for a single mark; fixed by dividing by len(marks). Bug 2: is_passing used > instead of >=, so a mark of exactly 40 failed; fixed with >= PASS_MARK. Bug 3: get_grade checked >= 60 before >= 90, so 95 returned First instead of Distinction; fixed by checking Distinction (>= 90) first. AI was used to understand failures, not to rewrite the tests.",
    },
    {
      id: "quiz-app",
      title: "Interactive Quiz Application",
      repo: "Code-With-AI-Quiz",
      live: "https://ai-quiz-mocha-pi.vercel.app",
      tech: ["HTML", "CSS", "JavaScript", "Quiz", "Web App"],
      description:
        "The 'Code With AI Quiz' (Lecture 10): 5 multiple-choice questions on AI and coding, with scoring and a final result.",
      details:
        "The quiz is called 'Code With AI Quiz' and has 5 multiple-choice questions (LLMs, commit-message format, unit tests, CSS files, nested-loop time complexity). It shows one question at a time as option buttons. JavaScript checks the clicked answer, adds to the score, moves to the next question and finally shows 'Your score is X out of 5'. It is styled in a blue, white and gold theme.",
    },
    {
      id: "reading-list",
      title: "Book Reading List Application",
      repo: "reading-list-app",
      live: "https://reading-list-app-kappa.vercel.app/",
      tech: ["Bolt AI", "Vercel", "GitHub", "Book", "Web App"],
      description:
        "A responsive reading list app (Lecture 11) built with Bolt AI: add books, set status, filter, delete and see summary counts. Deployed on Vercel.",
      details:
        "The visitor adds a book with a title and a reading status (Want to Read, Reading or Finished), can change the status later, and can filter the list by status. Each book is a card with a Delete button, and a summary section shows Total Books, Currently Reading and Finished counts. If the list is empty it shows 'Your reading list is empty. Add your first book.' Duplicate titles are blocked (ignoring upper/lower case and extra spaces) and titles are limited to 60 characters. Data is stored only in the browser, with no login, payments, external APIs or cloud database. It was generated with Bolt AI, pushed to GitHub as reading-list-app and deployed with Vercel; the README (updated through a pull request) has the deployed link.",
    },
  ],
};

if (typeof module !== "undefined") module.exports = PORTFOLIO;
