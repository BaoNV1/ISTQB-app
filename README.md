# ISTQB App

ISTQB App is a local-friendly study project for learning ISTQB CTFL concepts through a simple web page.

## What this project includes

- A landing dashboard with Chapter 1–6 interactive study pages
- English and Vietnamese chapter notes for Chapters 1–6
- Chapter quizzes, glossaries, and mind maps for Chapters 1–6
- A one-page summary and a 2.5-month study plan
- ISTQB CTFL syllabus references and mock exam practice materials

## Main files

- `index.html` – the main study page
- `src/page/chapter1/index.html` through `src/page/chapter6/index.html` – interactive chapter content
- `doc/` – study materials, summaries, and planning files
- `doc/chapter1` to `doc/chapter6` – chapter-specific glossary and mind map files
- `doc/one_page_summary.html` – quick revision summary
- `doc/Mock_Exam/` – mock exam questions and answer materials

## How to open it

Option 1: Open the HTML file directly in a browser
- Double-click `index.html`

Option 2: Serve it locally (recommended for markdown preview)
1. Open a terminal in the project folder
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open this address in your browser:
   ```text
   http://127.0.0.1:8000/index.html
   ```

## How to use it

- Start with Chapter 1 and move through Chapters 2–6 using the dashboard
- Open the chapter glossary and mind map for quick concept review
- Use the built-in chapter quizzes to test your understanding
- Review quiz feedback and explanations to improve retention

## Notes

- The markdown preview works best when the page is served from a local web server
- You can switch between English and Vietnamese using the chapter page tabs
- All Chapter 1–6 pages are available; their source notes, quizzes, glossaries, and mind maps are stored under `doc/`

## License

This project is intended for educational purposes only.
