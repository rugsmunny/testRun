document.querySelectorAll('.sb_sound_btn')
    .forEach(btn => btn.addEventListener('click', runPlayBack));

document.querySelector('#mute_btn')
    .addEventListener('click', toggleMute);

const tooltipContainer = document.querySelector('#tooltip_container');
let isMuted = false;


function runPlayBack() {

    if(!isMuted) {
        positionTooltip(this);
        const soundToGet = this.querySelector('img').getAttribute('alt');
        const toPlay = new Audio(`resources/sounds/${soundToGet}.wav`);
        toPlay.addEventListener('ended', () => {
            tooltipContainer.style.display = 'none';
        });
        tooltipContainer.style.display = 'inline-flex';
        toPlay.play();
    }
}

function positionTooltip(btn) {
    const btnSize = btn.getBoundingClientRect();
    const tooltipLeft = btnSize.left + 23;
    const tooltipTop = btnSize.top + btnSize.height;

    const p = document.querySelector('#tooltip p')
    tooltipContainer.style.left = `${tooltipLeft}px`;
    tooltipContainer.style.top = `${tooltipTop}px`;
}

function toggleMute() {
    isMuted = !isMuted;
    const speakerBtnIcon = document.querySelector('#mute_btn_img');
    speakerBtnIcon.src = speakerBtnIcon.src.includes('resources/img/icons/speaker-on.svg')  ? 'resources/img/icons/speaker-off.svg' : 'resources/img/icons/speaker-on.svg';

}
// Extra stuff bara för showcase byte av språk
document.querySelectorAll('#language img')
    .forEach(btn => btn.addEventListener('click', changeLanguage));

let languageData;

function changeLanguage() {
    const language = this.getAttribute('id');
    document.querySelectorAll('p').forEach(p => {
        const key = p.className.split(' ').find(key => languageData[language][key]);
        if (key) {
            p.textContent = languageData[language][key];
        }
    });
}
function fetchLanguageData() {
    const jsonPath = 'resources/text/language.json';

    return fetch (jsonPath)
        .then(response => response.json())
        .then(data => {
            languageData = data;

        }).catch(error => {
            console.error('Error fetching language data:', error);
        });
}

fetchLanguageData().then(changeLanguage);
