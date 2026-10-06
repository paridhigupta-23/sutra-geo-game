
/* SUTRA-GEO Tourism Expansion Layer
   ADDITIVE ONLY: this file does not replace or modify existing SUTRA-GEO features. */
(function(){
  'use strict';

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  function getStates(){
    return Array.isArray(window.SUTRA_DATA?.states) ? window.SUTRA_DATA.states : [];
  }

  function stateOptions(){
    return getStates().map(s => `<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('');
  }

  function buildTourismLayer(){
    if(document.body.dataset.page !== 'explore') return;
    if(document.getElementById('sutraTourismLayer')) return;

    const anchor = document.querySelector('.hero-panel');
    if(!anchor) return;

    const section = document.createElement('section');
    section.id = 'sutraTourismLayer';
    section.className = 'sutra-tourism-layer';

    section.innerHTML = `
      <div class="tourism-layer-head">
        <div>
          <p class="eyebrow">TRAVEL & TOURISM · NEW LAYER</p>
          <h2>Turn discovery into a <em>complete local experience.</em></h2>
          <p class="tourism-lead">
            Keep SUTRA-GEO's heritage discovery exactly as it is — now connect the discovery
            to food, events, stays, guides and trip planning.
          </p>
        </div>
        <div class="tourism-mode-badge">✦ TOURISM MODE</div>
      </div>

      <div class="tourism-experience-grid">
        <a class="tourism-experience-card" href="map.html">
          <span class="tourism-icon">📍</span>
          <b>Discover Nearby</b>
          <small>Open the live map and explore location-based heritage nodes.</small>
          <span class="tourism-card-link">Open Map →</span>
        </a>
        <a class="tourism-experience-card" href="food.html">
          <span class="tourism-icon">🍛</span>
          <b>Taste Local</b>
          <small>Discover regional dishes and local food experiences.</small>
          <span class="tourism-card-link">Explore Food →</span>
        </a>
        <a class="tourism-experience-card" href="events.html">
          <span class="tourism-icon">🎭</span>
          <b>Experience Events</b>
          <small>Find festivals, cultural events and local celebrations.</small>
          <span class="tourism-card-link">See What's On →</span>
        </a>
        <a class="tourism-experience-card" href="stays.html">
          <span class="tourism-icon">🏡</span>
          <b>Stay Local</b>
          <small>Explore the existing heritage-stay layer in the prototype.</small>
          <span class="tourism-card-link">Find Stays →</span>
        </a>
        <a class="tourism-experience-card" href="guides.html">
          <span class="tourism-icon">🧑‍🤝‍🧑</span>
          <b>Meet Local Guides</b>
          <small>Connect the traveller with the community and local knowledge.</small>
          <span class="tourism-card-link">Find a Guide →</span>
        </a>
        <a class="tourism-experience-card" href="planner.html">
          <span class="tourism-icon">🧭</span>
          <b>Plan the Route</b>
          <small>Turn the selected destination into a structured travel day.</small>
          <span class="tourism-card-link">Build a Trip →</span>
        </a>
      </div>

      <div class="tourism-planner-mini panel">
        <div class="mini-plan-copy">
          <p class="eyebrow">QUICK TRIP STARTER</p>
          <h3>Choose a region. Start with the right experience.</h3>
          <p id="tourismPlanText" class="muted">Select a state and travel interest to get a one-click starting route.</p>
        </div>
        <div class="mini-plan-controls">
          <label>
            <span>Region</span>
            <select id="tourismStateSelect">${stateOptions()}</select>
          </label>
          <label>
            <span>Interest</span>
            <select id="tourismInterestSelect">
              <option value="heritage">Heritage & history</option>
              <option value="food">Food & local flavours</option>
              <option value="culture">Culture & traditions</option>
              <option value="event">Events & festivals</option>
              <option value="mixed">A little of everything</option>
            </select>
          </label>
          <button class="btn btn-primary" id="tourismPlanButton" type="button">Start My Route →</button>
        </div>
      </div>

      <div class="tourism-bottom-grid">
        <div class="tourism-local panel">
          <div>
            <p class="eyebrow">LOCAL TOURISM CONNECT</p>
            <h3>Let travellers discover the people behind the place.</h3>
            <p>Use the existing community, living heritage and guide features to connect discovery with local participation.</p>
          </div>
          <div class="local-connect-actions">
            <a href="living.html" class="mini-action">🧵 Artisans & crafts</a>
            <a href="community.html" class="mini-action">📖 Community stories</a>
            <a href="guides.html" class="mini-action">🧑‍🏫 Local guides</a>
          </div>
        </div>

        <div class="tourism-ai panel">
          <p class="eyebrow">AI TRAVEL COMPANION</p>
          <h3>Ask Sutra for a destination idea.</h3>
          <p>Use the existing grounded AI layer for state, district, food, event and heritage questions.</p>
          <a class="btn btn-ghost" href="ai.html">Ask Sutra →</a>
        </div>
      </div>

      <div class="tourism-context panel">
        <div>
          <p class="eyebrow">INDIA TOURISM · OFFICIAL CONTEXT</p>
          <h3>Tourism is a large and growing discovery opportunity.</h3>
          <p class="muted">Official Ministry of Tourism figures show <strong>2,948.19 million domestic tourist visits in 2024</strong> and <strong>20.94 million foreign tourist visits</strong>.</p>
        </div>
        <div class="tourism-stat-pair">
          <div><strong>2,948.19M</strong><span>Domestic visits · 2024</span></div>
          <div><strong>20.94M</strong><span>Foreign visits · 2024</span></div>
        </div>
        <a class="text-link tourism-source" href="https://tourism.gov.in/tourism-data" target="_blank" rel="noreferrer">
          Ministry of Tourism · India Tourism Data ↗
        </a>
      </div>

      <div class="tourism-safety panel" id="tourismSafetyCard" hidden>
        <div class="tourism-safety-icon">🌍</div>
        <div>
          <p class="eyebrow">INTERNATIONAL TRAVELLER SUPPORT</p>
          <h3>Safety & hygiene information stays visible.</h3>
          <p>Keep the existing foreign-traveller pathway, with clear visitor guidance and verified local experience information.</p>
        </div>
        <a class="btn btn-primary" href="guides.html">Find Local Support →</a>
      </div>
    `;

    anchor.insertAdjacentElement('afterend', section);

    const stateEl = document.getElementById('tourismStateSelect');
    const interestEl = document.getElementById('tourismInterestSelect');
    const textEl = document.getElementById('tourismPlanText');
    const planBtn = document.getElementById('tourismPlanButton');

    function updateText(){
      const state = getStates().find(s => s.name === stateEl?.value) || getStates()[0];
      const interestLabels = {
        heritage:'heritage & history',
        food:'food & local flavours',
        culture:'culture & traditions',
        event:'events & festivals',
        mixed:'a mixed local experience'
      };
      if(state && textEl){
        const district = state.districts?.[0];
        const districtName = typeof district === 'string' ? district : district?.name;
        textEl.innerHTML =
          `<strong>${esc(state.name)}</strong> · Start with ${esc(interestLabels[interestEl?.value || 'mixed'])}` +
          `${districtName ? ` · Suggested first stop: <strong>${esc(districtName)}</strong>` : ''}.`;
      }
    }

    stateEl?.addEventListener('change', updateText);
    interestEl?.addEventListener('change', updateText);
    planBtn?.addEventListener('click', function(){
      const state = stateEl?.value || getStates()[0]?.name || 'Rajasthan';
      const interest = interestEl?.value || 'mixed';
      const moodMap = {
        heritage:'Heritage & architecture',
        food:'Food & local flavours',
        culture:'Festivals & living culture',
        event:'Festivals & living culture',
        mixed:'Heritage & architecture'
      };
      const district = getStates().find(s => s.name === state)?.districts?.[0];
      const districtName = typeof district === 'string' ? district : district?.name;
      const params = new URLSearchParams({
        state,
        ...(districtName ? {district:districtName} : {}),
        mood:moodMap[interest] || moodMap.mixed
      });
      window.location.href = `planner.html?${params.toString()}`;
    });

    updateText();

    try{
      const user = window.SutraAuth?.user?.() || {};
      if(user.travellerType === 'international'){
        const safety = document.getElementById('tourismSafetyCard');
        if(safety) safety.hidden = false;
      }
    }catch(e){}
  }

  document.addEventListener('DOMContentLoaded', buildTourismLayer);
})();
