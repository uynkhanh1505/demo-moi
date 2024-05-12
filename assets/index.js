const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();


const songs = [
    {
        path:'assets/mp3/EP Hope Is the Thing With Feathers  Honkai Star Rail.mp3',
        displayName: 'Hope Is the Thing With Feathers',
        cover:'../assets/img/Screenshot (2331).png',
        artist: 'Hoyo Mix/Chevy'
    },

    {
        path:'assets/mp3/EP If I Can Stop One Heart From Breaking  Honkai Star Rail.mp3',
        displayName: 'If I Can Stop One Heart From Breaking',
        cover:'assets/img/robin2.jpg',
        artist: 'Hoyo Mix/Chevy'
    },

    {
        path:'assets/mp3/Sway to My Beat.mp3',
        displayName: 'Sway to My Beat in Cosmos',
        cover:'assests/img/robin3.jpeg',
        artist: 'Hoyo Mix/Chevy'
    },
]; 

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    //Change play button icon
    playBtn.classList.replace('fa-play','fa-pause');
    //set button hover title
    playBtn.setAttribute('title','Pause');
    music.play();

}

function pauseMusic(){
    isPlaying = false;
    //Change pause button icon
    playBtn.classList.replace('fa-pause','fa-play');
    //set button hover title
    playBtn.setAttribute('title','Play');
    music.pause();
    
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime/duration) *100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent =   `${formatTime(duration / 60)}:${formatTime(duration%60)}`;
    currentTimeEl.textContent =   `${formatTime(currentTime / 60)}:${formatTime(currentTime%60)}`;

}


function setProgressBar (e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', ()=> changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
 
loadMusic(songs[musicIndex]);
