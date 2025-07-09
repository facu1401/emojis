/* const emojiDisplay = document.getElementById('emojiDisplay');
const reloadBtn = document.getElementById('reloadBtn');
const errorMsg = document.getElementById('errorMsg');

const fetchEmoji = async () => {
  errorMsg.textContent = '';

  try {
    const response = await fetch('https://emojihub.yurace.pro/api/random');

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { htmlCode } = await response.json();

    if (htmlCode?.length) {
      const [emojiHTML] = htmlCode;
      const parser = new DOMParser();
      const doc = parser.parseFromString(emojiHTML, 'text/html');
      emojiDisplay.textContent = doc.body.textContent;
    } else {
      throw new Error('Respuesta sin emoji');
    }
  } catch (error) {
    console.error(error);
    errorMsg.textContent = 'Error cargando emoji. Intenta nuevamente.';
  }
};

reloadBtn.addEventListener('click', fetchEmoji);
fetchEmoji();
 */

const emojiDisplay = document.getElementById('emojiDisplay');
const emojiInfo = document.getElementById('emojiInfo');
const reloadBtn = document.getElementById('reloadBtn');
const errorMsg = document.getElementById('errorMsg');
const loader = document.getElementById('loader');

const fetchEmoji = async () => {
  loader.style.display = 'block';
  emojiDisplay.style.visibility = 'hidden';
  emojiInfo.textContent = '';
  errorMsg.textContent = '';

  try {
    const resp = await fetch('https://emojihub.yurace.pro/api/random');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const { htmlCode, name, category } = await resp.json();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode[0], 'text/html');
    const char = doc.body.textContent;

    emojiDisplay.textContent = char;
    emojiInfo.textContent = `Nombre: ${name} · Categoría: ${category}`;
    emojiDisplay.style.visibility = 'visible';
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error cargando emoji. Intenta nuevamente.';
  } finally {
    loader.style.display = 'none';
  }
};

reloadBtn.addEventListener('click', fetchEmoji);
fetchEmoji();

// Registrar service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(console.error);
}
