const chapters = [
  {
    title: 'Chapter 1 - Fundamentals of Testing',
    description: 'Understand the purpose of testing, key principles, and common testing concepts.',
    link: 'src/page/chapter1/index.html'
  }
];

const grid = document.getElementById('chapters-grid');

if (grid) {
  grid.innerHTML = chapters
    .map(
      (chapter) => `
        <article class="card">
          <h3>${chapter.title}</h3>
          <p>${chapter.description}</p>
          <a href="${chapter.link}">Open module →</a>
        </article>
      `
    )
    .join('');
}
