const mods = [
  {
    name: 'Case IH JXU 85 - 115 Pack',
    game: 'FS2015',
    category: ['Tractors'],
    author: 'RivalBomb',
    version: '1.0',
    image: 'assets/mods/',
    modIcon: 'assets/mods/26FF6C85F831394DB3EDBBA414391913950F9AD146/iconBig.jpg',
    description: 'To stay on top, you need a tractor that delivers the performance you need to do your daily tasks.',
    page: 'mods/26FF6C85F831394DB3EDBBA414391913950F9AD146.html',
    isNew: true
  },

  {
    name: 'Silver Expansion',
    game: 'FS2015',
    category: ['Tractors', 'Combines','Implements', 'Trailers'],
    author: 'Giants Software',
    version: '1.0',
    image: 'assets/mods/',
    modIcon: 'assets/mods/Silver Expansion/iconBig.jpg',
    description: 'This DLC contains new brand Zetor!.',
    page: 'mods/26FF6C85F831394DB3EDBBA414391913950F9AD146.html',
    isNew: false
  },

  {
    name: 'ITRunner DLC',
    game: 'FS2015',
    category: ['Trailers'],
    author: 'Giants Software',
    version: '1.0',
    image: 'assets/mods/itrunner/itrunner.jpg',
    modIcon: 'assets/mods/itrunner/itrunner.jpg',
    description: 'This DLC contains new Trailer equipment from ITRunner, Bergmann and Farmtech.',
    page: 'mods/FF19E5850B47A418FE47A4D4BF05550F22FD163B46.html',
    isNew: false
  }
];

const state = {
  game: 'all',
  category: 'all'
};

const list = document.getElementById('list');
const search = document.getElementById('search');
const sort = document.getElementById('sort');
const count = document.getElementById('count');

function render() {
  const q = (search?.value || '').toLowerCase().trim();

  let filtered = mods.filter(mod => {

    const gameOk =
      state.game === 'all' ||
      mod.game === state.game;

    const catOk =
      state.category === 'all' ||
      mod.category.includes(state.category);

    const text =
      `${mod.name} ${mod.category.join(' ')} ${mod.game} ${mod.author}`
      .toLowerCase();

    return gameOk && catOk && (!q || text.includes(q));
  });

  if (sort?.value === 'name') {
    filtered.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else {
    filtered.sort((a, b) =>
      Number(b.isNew) - Number(a.isNew) ||
      mods.indexOf(a) - mods.indexOf(b)
    );
  }

  if (count) {
    count.textContent =
      `${filtered.length} mod${filtered.length === 1 ? '' : 's'}`;
  }

  list.innerHTML = filtered.map(mod => {

    const categories = mod.category
      .map(category =>
        `<span class="tag">${category}</span>`
      )
      .join(' ');

    return `
      <article class="mod">

        <a href="${mod.page}">
          <img
            class="pic modIcon"
            src="${mod.modIcon}"
            alt="${mod.name} icon"
            onerror="this.onerror=null;this.src='${mod.image}'"
          >
        </a>

        <div class="details">

          <h3>
            <a class="modTitle" href="${mod.page}">
              ${mod.name}
            </a>

            ${mod.isNew
              ? '<span class="newBadge">NEW</span>'
              : ''
            }
          </h3>

          <div class="meta">
            ${mod.game} •
            ${mod.category.join(' • ')} •
            by ${mod.author}
          </div>

          <p>${mod.description}</p>

          ${categories}

          <span class="tag">
            ${mod.game}
          </span>

        </div>

        <div class="action">
          <span class="free">FREE MOD</span>
          <a class="download" href="${mod.page}">
            VIEW MOD
          </a>
        </div>

      </article>
    `;

  }).join('') || `
    <div class="aero empty">
      No mods found.
    </div>
  `;
}


// GAME FILTERS

document.querySelectorAll('.tabs button').forEach(btn => {

  btn.addEventListener('click', () => {

    document
      .querySelectorAll('.tabs button')
      .forEach(b => b.classList.remove('sel'));

    btn.classList.add('sel');

    state.game = btn.dataset.game;

    render();
  });

});


// CATEGORY FILTERS

document.querySelectorAll('.cat').forEach(btn => {

  btn.addEventListener('click', () => {

    document
      .querySelectorAll('.cat')
      .forEach(b => b.classList.remove('sel'));

    btn.classList.add('sel');

    state.category = btn.dataset.cat;

    render();
  });

});


// SEARCH

search?.addEventListener('input', render);


// SORT

sort?.addEventListener('change', render);


// INITIAL RENDER

render();