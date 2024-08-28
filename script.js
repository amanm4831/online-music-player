document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Spotify");

    let songIndex = 0;
    let audioElement = new Audio('songs/1.mp3');
    let masterPlay = document.getElementById("masterPlay");
    let myProgressBar = document.getElementById("myProgressBar");
    let gif = document.getElementById("gif");
    let songItems = Array.from(document.getElementsByClassName("songItem")); 
    let songInfo = document.getElementById('masterSongName')
    let songs = [
        { songName: "Fly me to the moon", filepath: "songs/1.mp3", coverPath: "covers/1.jpg" },
        { songName: "Still Got the blues", filepath: "songs/2.mp3", coverPath: "covers/2.jpg" },
        { songName: "Hotel California", filepath: "songs/3.mp3", coverPath: "covers/3.jpg" },
        { songName: "Free Bird", filepath: "songs/4.mp3", coverPath: "covers/4.jpg" },
        { songName: "Cant help falling in love with you", filepath: "songs/5.mp3", coverPath: "covers/5.jpg" },
        { songName: "Random1", filepath: "songs/6.mp3", coverPath: "covers/6.jpg" },
        { songName: "Random2", filepath: "songs/7.mp3", coverPath: "covers/7.jpg" },
        { songName: "Random3", filepath: "songs/8.mp3", coverPath: "covers/8.jpg" },
        { songName: "Random4", filepath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    ];
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    });

    songItems.forEach((element, i) => {
        element.getElementsByTagName('img')[0].src = songs[i].coverPath;
        element.getElementsByClassName('songNames')[0].innerText = songs[i].songName;
    });

    audioElement.addEventListener('timeupdate', () => {
        console.log("Time Updated");
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        console.log(progress);
        myProgressBar.value = progress;
    });

    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    });

    const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-circle-pause');
           element.classList.add('fa-circle-play');
        })
    }

   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e)=>{
            songIndex = parseInt(e.target.id)
            makeAllPlays();
            songInfo.innerText=songs[songIndex-1].songName;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src=`songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        })
    });

    document.getElementById('next').addEventListener('click', () => {
        if(songIndex>=9){
            songIndex=0;
        }
        else{
            songIndex+=1;
        }
        songInfo.innerText=songs[songIndex-1].songName;
        audioElement.src=`songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })

    document.getElementById('previous').addEventListener('click', () => {
        if(songIndex<=0){
            songIndex=0;
        }
        else{
            songIndex-=1;
        }
        songInfo.innerText=songs[songIndex-1].songName;
        audioElement.src=`songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});
