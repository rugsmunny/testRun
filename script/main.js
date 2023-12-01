
document.addEventListener('DOMContentLoaded', checkUserMedia);

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

function checkUserMedia() {

    const regex = 'Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini';
    if(navigator.userAgent.includes(regex)) {
        document.querySelector('#speech_banana_container').style.overflowX = 'scroll';
        /* set height to 100% of screen */
        document.querySelector('#speech_banana_container').style.height = '100vh';
        document.querySelector('#speech_banana_container').style.width = 'auto';
        document.querySelector('#speech_banana_container').style.padding = '0 10px';
        document.querySelector('#speech_banana_container').style.boxSizing = 'border-box';
        document.querySelector('#speech_banana_container').style.display = 'flex';
        document.querySelector('#speech_banana_container').style.flexDirection = 'row';
        document.querySelector('#speech_banana_container').style.alignItems = 'center';
        document.querySelector('#speech_banana_container').style.justifyContent = 'center';
        document.querySelector('#speech_banana_container').style.flexWrap = 'nowrap';
        document.querySelector('#speech_banana_container').style.overflowY = 'hidden';
        document.querySelector('#speech_banana_container').style.fontSize = '1.5rem';
        document.querySelector('#speech_banana_container').style.fontWeight = 'bold';
        document.querySelector('#speech_banana_container').style.color = 'white';
        document.querySelector('#speech_banana_container').style.backgroundColor = 'black';
        document.querySelector('#speech_banana_container').style.textAlign = 'center';
        document.querySelector('#speech_banana_container').style.padding = '20px';
        document.querySelector('#speech_banana_container').style.textShadow = '2px 2px 0px #000000';
        document.querySelector('#speech_banana_container').style.fontFamily = 'Arial, Helvetica, sans-serif';
        document.querySelector('#speech_banana_container').style.lineHeight = '1.5';
        document.querySelector('#speech_banana_container').style.position = 'relative';
        document.querySelector('#speech_banana_container').style.zIndex = '1';
        document.querySelector('#speech_banana_container').style.margin = '0';
        document.querySelector('#speech_banana_container').style.boxShadow = '0 0 10px #000000';
        document.querySelector('#speech_banana_container').style.borderRadius = '10px';
        document.querySelector('#speech_banana_container').style.border = '2px solid #000000';
        document.querySelector('#speech_banana_container').style.transform = 'rotate(90deg)';
        document.querySelector('#speech_banana_container').style.transformOrigin = '50% 50%';
        document.querySelector('#speech_banana_container').style.overflowX = 'scroll';
    }
}
