const compositions = [
    "Türkischer Marsch (Rondo Alla Turca), K 331",
    "Requiem in D Minor (Lacrimosa), K 626",
    "Canción de Cuna",
    "Die Zauberflöte (The magic flute), KV 620",
    "Eine kleine Nachtmusik (A little night music), K 525"
]

/* AUDIO AND SOURCE OF THE PLAYER */
const audioPlayer = document.getElementById('composition-player');
const audioSource = document.getElementById('composition-source');

/* COMPOSITION DURATION */
const compositionDuration = document.getElementById('composition-duration');

/* CREATE EVERY COMPOSITION */
const createCompositionsList = () => {
    const compositionsList = document.createElement('ol');

    for(let i = 0; i < compositions.length; i++) {
        const composition = document.createElement('li');
        composition.appendChild(document.createTextNode(compositions[i]));

        compositionsList.appendChild(composition);
    }

    return compositionsList;
}

const compositionsList = document.getElementById('compositions-list').appendChild(createCompositionsList());

compositionsList.onclick = (e) => {
    const compositionName = e.target.innerText;   
    
    audioSource.src = 'songs/' + compositionName + '.mp3';
    audioPlayer.load();
    document.getElementById('composition-name').innerText = compositionName;
    audioPlayer.play();
}

/* PLAY BUTTON */
const playComposition = document.getElementById('play-composition');
const pauseComposition = document.getElementById('pause-composition');

playComposition.onclick = () => {
    if(audioPlayer.currentSrc){ 
        audioPlayer.play();
    } else {
        alert("Select a composition first");
    }
}

/* PAUSE BUTTON */
pauseComposition.onclick = () => {
    audioPlayer.pause();
}

/* VOLUME CONTROLER */
const compositionVolume = document.getElementById('composition-volume');

compositionVolume.oninput = (e) => {
    audioPlayer.volume = e.target.value;
}

/* TIME CONTROL */
const compositionCurrentTime = document.getElementById('composition-current-time');
const compositionTime = document.getElementById('composition-time');

audioPlayer.ontimeupdate = (e) => {
    if(audioPlayer.readyState === 4) {
        compositionDuration.innerText = formatSecondsAsTime(audioPlayer.duration);
        compositionCurrentTime.innerText = formatSecondsAsTime(audioPlayer.currentTime);
        compositionTime.value = (audioPlayer.currentTime / 60).toFixed(2);
		compositionTime.max = (audioPlayer.duration / 60).toFixed(2);
    }
}

/* CONVERT AUDIO TIME TO 00:00 FORMAT */
function formatSecondsAsTime(secs) {
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

  if (min < 10){ 
    min = "0" + min; 
  }
  if (sec < 10){ 
    sec  = "0" + sec;
  }

  return min + ':' + sec;
}

compositionTime.onchange = (e) => {
    audioPlayer.currentTime = e.target.value * 60;
}

/* PREPARING COMPOSITION TEXT */
const preparingComposition = document.getElementById('preparing-composition');

audioPlayer.onprogress = e => {
	preparingComposition.innerText = "Preparing composition...";
	/*for(let i = 0; i < 100; i++) {
		preparingComposition.style.opacity = 0;
	}
	preparingComposition.style.color = "#868686";
	preparingComposition.style.color = "#e4e4e4";*/
}

audioPlayer.oncanplay = e => {
	// Hide #preparing-composition
	preparingComposition.innerText = "";
}