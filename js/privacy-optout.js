/* Opt-out switch for the self-hosted Umami tracker.
 *
 * External on purpose: the site CSP is `script-src 'self' https://cdnjs.cloudflare.com
 * https://umami.drunik.be` (deploy/swarm/nginx.conf) with no 'unsafe-inline', so an
 * inline block would be refused by the browser.
 *
 * The tracker reads localStorage['umami.disabled'] before every send and bails when it
 * is set, so flipping this key is the entire mechanism. */
(function () {
  var KEY = 'umami.disabled';
  var btn = document.getElementById('umami-optout');
  var state = document.getElementById('umami-optout-state');
  if (!btn || !state) return;

  function read() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return null; }
  }

  function render() {
    var off = read();
    if (off === null) {
      btn.textContent = 'unavailable';
      btn.setAttribute('disabled', '');
      state.textContent = 'This browser blocks local storage, so the choice cannot be saved here.';
      return;
    }
    btn.textContent = off ? 'Analytics off — turn back on' : 'Turn analytics off';
    state.textContent = off
      ? 'Opted out. Nothing is sent from this browser.'
      : 'Currently counted, anonymously.';
  }

  btn.addEventListener('click', function () {
    try { read() ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, '1'); } catch (e) {}
    render();
  });

  render();
})();
