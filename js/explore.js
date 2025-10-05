// ---------------- Sidebar Toggle ----------------
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const content = document.getElementById("content");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  }

  // Example Category Data
  const categoryData = {
    hills: { title: "Beautiful Hills", description: "Explore scenic hills." },
    mountains: { title: "Majestic Mountains", description: "Snow-capped peaks await." },
    waterfalls: { title: "Stunning Waterfalls", description: "Feel the nature’s beauty." },
    trek: { title: "Exciting Treks", description: "Perfect for adventurers." },
    monuments: { title: "Historic Monuments", description: "Step into history." }
  };

  // Handle category click
  document.querySelectorAll(".sidebar a[data-category]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const category = link.dataset.category;
      if (categoryData[category]) {
        content.innerHTML = `
          <h2>${categoryData[category].title}</h2>
          <p>${categoryData[category].description}</p>
        `;
        sidebar.classList.remove("active");
      }
    });
  });
});

// ---------------- Category Page Redirect ----------------
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    window.location.href = `../html/category.html?cat=${encodeURIComponent(cat)}`;
  });
});

// ---------------- Search + Explore Page ----------------
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const destinationsGrid = document.getElementById('allDestinations');
  let allDestinationsData = [];

  // Fetch data
  fetch('../data/destinations.json')
    .then(r => r.json())
    .then(data => {
      allDestinationsData = shuffleArray(data);
      renderAllDestinations(allDestinationsData);
    });

  function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderAllDestinations(list) {
    if (!destinationsGrid) return;
    destinationsGrid.innerHTML = '';
    list.forEach(d => {
      const card = document.createElement('div');
      card.className = 'destination-card';
      card.innerHTML = `
        <img src="${d.images[0]}" alt="${d.name}">
        <div class="overlay">
          <div class="overlay-inner">
            <h3>${d.name}</h3>
            <p class="place">${d.place}</p>
          </div>
        </div>
        <div class="card-foot">
          <h4>${d.name}</h4>
          <p class="short">${d.shortDesc}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        window.location.href = `destination.html?id=${encodeURIComponent(d.id)}`;
      });
      destinationsGrid.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const val = e.target.value.toLowerCase();
      const filtered = allDestinationsData.filter(d =>
        d.name.toLowerCase().includes(val) ||
        (d.place && d.place.toLowerCase().includes(val)) ||
        (d.shortDesc && d.shortDesc.toLowerCase().includes(val))
      );
      renderAllDestinations(filtered);
    });
  }
});

// ---------------- Category.js ----------------
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('cat') || 'beach';
  const categoryTitle = document.getElementById('categoryTitle');
  if (categoryTitle) {
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  }

  fetch('../data/destinations.json')
    .then(r => r.json())
    .then(data => {
      const list = data.filter(d => d.category === category);
      renderList(list);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('destinations').innerHTML = "<p>Failed to load destinations.</p>";
    });

  function renderList(list) {
    const container = document.getElementById('destinations');
    if (!container) return;
    container.innerHTML = '';

    list.forEach(d => {
      const card = document.createElement('div');
      card.className = 'destination-card';
      card.innerHTML = `
        <img src="${d.images[0]}" alt="${d.name}">
        <div class="overlay">
          <div class="overlay-inner">
            <h3>${d.name}</h3>
            <p class="place">${d.place}</p>
          </div>
        </div>
        <div class="card-foot">
          <h4>${d.name}</h4>
          <p class="short">${d.shortDesc}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        window.location.href = `destination.html?id=${encodeURIComponent(d.id)}`;
      });
      container.appendChild(card);
    });
  }
});

// ---------------- Destination.js ----------------
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.getElementById('detailTop').innerHTML = '<p>No destination selected.</p>';
    return;
  }

  fetch('../data/destinations.json')
    .then(r => r.json())
    .then(list => {
      const d = list.find(x => x.id === id);
      if (!d) {
        document.getElementById('detailTop').innerHTML = '<p>Destination not found.</p>';
        return;
      }
      renderDestination(d);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('detailTop').innerHTML = '<p>Failed to load data.</p>';
    });

  function renderDestination(d) {
    document.getElementById('pageTitle').textContent = d.name;
    document.getElementById('backBtn').href = `category.html?cat=${encodeURIComponent(d.category)}`;

    const topHTML = `
      <div class="detail-left">
        <h2>${d.name}</h2>
        <p class="place">${d.place} • Posted by ${d.poster}</p>
        <p class="longdesc">${d.description}</p>
        <h3>Activities</h3>
        <div class="activity-list">
          ${d.activities.map(a =>
            typeof a === 'object'
              ? `<div class="activity-item"><img src="${a.img}" alt="${a.name}" class="modal-img" tabindex="0"><div>${a.name}</div></div>`
              : `<div class="activity-item"><div>${a}</div></div>`
          ).join('')}
        </div>
        <h3>Foods</h3>
        <div class="food-list">
          ${d.foods.map(f =>
            typeof f === 'object'
              ? `<div class="food-item"><img src="${f.img}" alt="${f.name}" class="modal-img" tabindex="0"><div>${f.name}</div></div>`
              : `<div class="food-item"><div>${f}</div></div>`
          ).join('')}
        </div>
      </div>
    `;
    document.getElementById('detailTop').innerHTML = topHTML;

    document.getElementById('gallery').innerHTML = `
      <h3>Gallery</h3>
      <div class="gallery-grid">
        ${d.images.map(img => `
          <div class="gallery-item">
            <img src="${img}" alt="${d.name}" class="modal-img" tabindex="0">
          </div>
        `).join('')}
      </div>
      ${d.video ? `
      <div class="destination-video">
        <h3>Video</h3>
        <video controls width="100%" height="380" style="max-width:900px;max-height:380px;" poster="${d.images[0]}">
          <source src="${d.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      ` : ''}
    `;

    // Modal
    let modal = document.getElementById('imgModal');
    if (!modal) {
      const modalDiv = document.createElement('div');
      modalDiv.innerHTML = '<div id="imgModal" class="img-modal" style="display:none;">' +
        '<div class="img-modal-imgwrap">' +
        '<span class="img-modal-close">&times;</span>' +
        '<img class="img-modal-content" id="imgModalImg">' +
        '</div>' +
        '</div>';
      document.body.appendChild(modalDiv.firstElementChild);
      modal = document.getElementById('imgModal');
    }
    const modalImg = document.getElementById('imgModalImg');
    const closeBtn = document.querySelector('.img-modal-close');
    document.querySelectorAll('.modal-img').forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
      });
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          modal.style.display = 'flex';
          modalImg.src = img.src;
        }
      });
    });
    closeBtn.onclick = () => modal.style.display = 'none';
    modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
  }
});

// ---------------- Gallery.js ----------------
document.addEventListener("DOMContentLoaded", async () => {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  let data;
  try {
    const response = await fetch("../data/destinations.json");
    data = await response.json();
  } catch (e) {
    galleryGrid.innerHTML = "<p>Could not load images.</p>";
    return;
  }


  let allMedia = [];
  data.forEach(dest => {
    // Add images
    if (Array.isArray(dest.images)) {
      dest.images.forEach(img => {
        allMedia.push({ type: 'img', src: img, alt: dest.name + " - " + dest.place });
      });
    }
    // Add video if present
    if (dest.video) {
      allMedia.push({ type: 'video', src: dest.video, poster: dest.images && dest.images[0] ? dest.images[0] : '', alt: dest.name + " - video" });
    }
  });

  // Shuffle
  for (let i = allMedia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allMedia[i], allMedia[j]] = [allMedia[j], allMedia[i]];
  }


  function renderGallery(filterType) {
    let filtered = allMedia;
    if (filterType === 'img') filtered = allMedia.filter(m => m.type === 'img');
    if (filterType === 'video') filtered = allMedia.filter(m => m.type === 'video');
    galleryGrid.innerHTML = filtered.map(mediaObj => {
      if (mediaObj.type === 'img') {
        return `<div class="gallery-item">
          <img src="${mediaObj.src}" alt="${mediaObj.alt}" class="modal-img" tabindex="0">
        </div>`;
      } else if (mediaObj.type === 'video') {
        return `<div class="gallery-item">
          <video controls width="100%" height="220" style="max-width:320px;max-height:220px; border-radius:10px; background:#000;" poster="${mediaObj.poster}">
            <source src="${mediaObj.src}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>`;
      }
      return '';
    }).join("");
  }

  // Initial render: show all
  renderGallery();

  // Button event listeners
  const showImagesBtn = document.getElementById('showImagesBtn');
  const showVideosBtn = document.getElementById('showVideosBtn');
  if (showImagesBtn) showImagesBtn.onclick = () => renderGallery('img');
  if (showVideosBtn) showVideosBtn.onclick = () => renderGallery('video');

  if (!document.getElementById('imgModal')) {
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = '<div id="imgModal" class="img-modal" style="display:none;">' +
      '<div class="img-modal-imgwrap">' +
      '<span class="img-modal-close">&times;</span>' +
      '<img class="img-modal-content" id="imgModalImg">' +
      '</div>' +
      '</div>';
    document.body.appendChild(modalDiv.firstElementChild);
  }

  setTimeout(() => {
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('imgModalImg');
    const closeBtn = document.querySelector('.img-modal-close');
    document.querySelectorAll('.modal-img').forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
      });
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          modal.style.display = 'flex';
          modalImg.src = img.src;
        }
      });
    });
    closeBtn.onclick = () => modal.style.display = 'none';
    modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
  }, 100);
});
