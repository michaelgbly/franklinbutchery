// THE FULL SELECTION — Wix Custom Element (Web Component)
// Host this file and point Wix Studio Custom Element to its URL

class TfbFullSelection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Helvetica Neue', 'Arial', sans-serif;
          color: #1D283E;
          -webkit-font-smoothing: antialiased;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tfb-section {
          padding: 120px 32px;
          max-width: 1100px;
          margin: 0 auto;
          background: #FAF7F2;
          text-align: center;
        }

        .tfb-inner {
          max-width: 720px;
          margin: 0 auto;
        }

        .tfb-divider {
          width: 40px;
          height: 1px;
          background: #C8A96E;
          margin: 0 auto 28px;
          opacity: 0.5;
        }

        .tfb-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(30px, 3.8vw, 52px);
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          line-height: 1.1;
          text-align: center;
          margin-bottom: 24px;
          color: #1D283E;
        }

        .tfb-desc {
          font-family: 'Helvetica Neue', 'Arial', sans-serif;
          font-size: clamp(15px, 1.4vw, 17px);
          color: #7A7368;
          text-align: center;
          max-width: 580px;
          margin: 0 auto 40px;
          line-height: 1.8;
          font-weight: 300;
        }

        .tfb-tabs {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 48px;
          border: 1px solid #C8A96E;
        }

        .tfb-tab {
          padding: 12px 28px;
          font-family: 'Helvetica Neue', 'Arial', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: transparent;
          color: #C8A96E;
          border: none;
          border-right: 1px solid #C8A96E;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .tfb-tab:last-child {
          border-right: none;
        }

        .tfb-tab.active {
          background: #C8A96E;
          color: #1D283E;
        }

        .tfb-tab:hover:not(.active) {
          background: rgba(200, 169, 110, 0.1);
        }

        .tfb-panel {
          display: none;
        }

        .tfb-panel.active {
          display: block;
        }

        .tfb-list {
          list-style: none;
          padding: 0;
          margin: 0;
          columns: 2;
          column-gap: 64px;
          text-align: left;
        }

        .tfb-list li {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 15px;
          color: #1D283E;
          padding: 14px 0;
          border-bottom: 1px solid #EDE8E0;
          letter-spacing: 0.02em;
          break-inside: avoid;
        }

        @media (max-width: 768px) {
          .tfb-section { padding: 80px 24px; }
          .tfb-list { columns: 2; column-gap: 32px; }
          .tfb-tabs {
            justify-content: center;
            border: none;
            gap: 4px;
          }
          .tfb-tab {
            padding: 10px 16px;
            font-size: 9px;
            letter-spacing: 0.1em;
            border: 1px solid #C8A96E;
          }
          .tfb-tab:last-child {
            border-right: 1px solid #C8A96E;
          }
        }
      </style>

      <div class="tfb-section">
        <div class="tfb-inner">
          <div class="tfb-divider"></div>
          <h2 class="tfb-title">The Full Selection</h2>
          <p class="tfb-desc">Hand-cut daily and thoughtfully sourced — our case rotates with the seasons. Stop in or call to see what's available today.</p>

          <div class="tfb-tabs">
            <button class="tfb-tab active" data-tab="beef">Beef</button>
            <button class="tfb-tab" data-tab="pork">Pork</button>
            <button class="tfb-tab" data-tab="lamb">Lamb</button>
            <button class="tfb-tab" data-tab="poultry">Poultry</button>
            <button class="tfb-tab" data-tab="bacon-sausage">Bacon &amp; Sausage</button>
            <button class="tfb-tab" data-tab="jerky">Jerky</button>
          </div>

          <div class="tfb-panel active" data-panel="beef">
            <ul class="tfb-list">
              <li>Ground Beef</li>
              <li>Back Ribs</li>
              <li>Blade Steak</li>
              <li>Bottom Round</li>
              <li>Brisket</li>
              <li>Chuck Eye Steak</li>
              <li>Chuck Roast</li>
              <li>Cube Steak</li>
              <li>Denver Steak</li>
              <li>Eye Round</li>
              <li>Filet Mignon</li>
              <li>Flank Steak</li>
              <li>Flat Iron</li>
              <li>Hanger Steak</li>
              <li>London Broil</li>
              <li>New York Strip Boneless</li>
              <li>New York Strip Bone-In</li>
              <li>Porter House</li>
              <li>Prime Rib Bone-In</li>
              <li>Prime Rib Boneless</li>
              <li>Ribeye Boneless</li>
              <li>Ribeye Bone-In</li>
              <li>Rump Roast</li>
              <li>Shank Cross Cut</li>
              <li>Short Ribs</li>
              <li>Sierra Steak</li>
              <li>Skirt Steak</li>
              <li>T-Bone Steak</li>
              <li>Top Round</li>
              <li>Top Sirloin</li>
              <li>Top Sirloin Filet</li>
              <li>Tri-Tip</li>
              <li>Marrow Bones Sliced</li>
              <li>Bones Stock / Bone Broth</li>
            </ul>
          </div>

          <div class="tfb-panel" data-panel="pork">
            <ul class="tfb-list">
              <li>Ground Pork</li>
              <li>Belly</li>
              <li>Blade Roast</li>
              <li>Chops Boneless</li>
              <li>Chops Bone-In</li>
              <li>Chops T-Bone</li>
              <li>Country Style Ribs</li>
              <li>Fatback</li>
              <li>Hock</li>
              <li>Jowl</li>
              <li>Loin Roast Boneless</li>
              <li>Loin Roast Bone-In</li>
              <li>Shank</li>
              <li>Shoulder Picnic</li>
              <li>Shoulder Boston Butt</li>
              <li>Spare Ribs</li>
              <li>St. Louis Ribs</li>
              <li>Baby Back Ribs</li>
              <li>Tenderloin</li>
              <li>Eye Round Filet</li>
              <li>Salt Pork</li>
              <li>Bones Soup / Broth</li>
              <li>Lard</li>
            </ul>
          </div>

          <div class="tfb-panel" data-panel="lamb">
            <ul class="tfb-list">
              <li>Leg</li>
              <li>Rack</li>
              <li>Shoulder</li>
              <li>Ground</li>
              <li>Shank</li>
              <li>Stewing</li>
            </ul>
          </div>

          <div class="tfb-panel" data-panel="poultry">
            <ul class="tfb-list">
              <li>Springer Mountain WOGS</li>
              <li>Springer Mountain Portion Cuts</li>
              <li>Chicken Thigh Boneless Skinless</li>
              <li>Chicken Wings</li>
              <li>Chicken Feet</li>
              <li>Airline Breast</li>
              <li>Boneless Skinless Breast</li>
              <li>Duck</li>
              <li>Duck Legs</li>
              <li>Duck Fat</li>
            </ul>
          </div>

          <div class="tfb-panel" data-panel="bacon-sausage">
            <ul class="tfb-list">
              <li>Canadian Peameal Bacon</li>
              <li>Smoked Bacon</li>
              <li>Bacon Ends</li>
              <li>Jowl Bacon</li>
              <li>Sweet Italian Ground</li>
              <li>Sweet Italian Link</li>
              <li>Hot Italian Link</li>
              <li>Brats</li>
              <li>Jalapeño Cheddar</li>
              <li>Knackwurst</li>
              <li>Linguiça</li>
              <li>Mexican Chorizo</li>
              <li>Chorizo Verde</li>
              <li>Al Pastor</li>
              <li>Breakfast Sausage</li>
            </ul>
          </div>

          <div class="tfb-panel" data-panel="jerky">
            <ul class="tfb-list">
              <li>Beef Jerky</li>
            </ul>
          </div>

        </div>
      </div>
    `;

    // Tab switching
    this.shadowRoot.querySelectorAll('.tfb-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.shadowRoot.querySelectorAll('.tfb-tab').forEach(t => t.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.tfb-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = this.shadowRoot.querySelector(`[data-panel="${tab.dataset.tab}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }
}

customElements.define('tfb-full-selection', TfbFullSelection);
