
document.addEventListener('DOMContentLoaded', checkUserMedia);
function checkUserMedia() {
    
    const regex = 'Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini';
    if(navigator.userAgent.includes(regex)) {
        document.querySelector('#speech_banana_container').style.overflowX = 'scroll';
    }
}
const soundBtns = document.querySelectorAll('.sb_sound_btn');
const tooltipContainer = document.querySelector('#tooltip_container');
const tooltip = document.querySelector('#tooltip');
const languageBtns = document.querySelectorAll('#language img');
const allPElements = document.querySelectorAll('p');
document.querySelector('#mute_btn').addEventListener('click', toggleMute);
let isMuted = false;

let languageData;

function fetchLanguageData() {
    const jsonPath = 'resources/text/language.json';

    
    return fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            languageData = data;
        })
        .catch(error => {
            console.error('Error fetching language data:', error);
        });
}

fetchLanguageData().then(() => changeLanguage());


languageBtns.forEach(btn => btn.addEventListener('click', changeLanguage));
soundBtns.forEach(btn => btn.addEventListener('click', initPlayback));

function changeLanguage() {
    const language = this.getAttribute('id');
    allPElements.forEach(p => {
        const key = p.className.split(' ').find(key => languageData[language][key]);
        if (key) {
            p.textContent = languageData[language][key];
        }
    });
}


function initPlayback() {
    positionTooltip(this);
    if(!isMuted) {
        const soundToGet = this.querySelector('img').getAttribute('alt');
        new Audio(`resources/sounds/${soundToGet}.wav`).play();
    }
    tooltipContainer.style.display = 'inline-flex';
    setTimeout(function() {
        tooltipContainer.style.display = 'none';
    }, 3000); // sätta tiden till ljudlängden
}

function positionTooltip(btn) {
    const btnSize = btn.getBoundingClientRect();
    const tooltipLeft = btnSize.left;
    const tooltipTop = btnSize.top + btnSize.height + 10;

    const p = tooltip.querySelector('p');
    p.textContent = `${btn.innerText} hello!`;
    tooltipContainer.style.left = `${tooltipLeft}px`;
    tooltipContainer.style.top = `${tooltipTop}px`;
}

function toggleMute() {
    isMuted = !isMuted;
    const speakerBtnIcon = document.querySelector('#mute_btn_img');
    speakerBtnIcon.src = speakerBtnIcon.src.includes('resources/img/icons/speaker-on.svg')  ? 'resources/img/icons/speaker-off.svg' : 'resources/img/icons/speaker-on.svg';

}
