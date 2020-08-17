// Capturing Different Areas
const contentArea = document.getElementById("content-area");
const searchArea = document.getElementById("search-area");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const lyricsShow = document.getElementById("lyrics-show");
const apiURL = 'https://api.lyrics.ovh';
/// adding event listener in form
searchArea.addEventListener('submit', e=> {   
    e.preventDefault();
    searchValue = searchButton.value.trim()
    if(!searchValue){
        alert("There is nothing to search");
    }
    else{ 
        searchSong(searchValue);
    }
    searchArea.reset();
})
//search song 
async function searchSong(searchValue){
    const searchResults = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResults.json();  
    showData(data);
}
//display final result 
function showData(data){
    searchResults.innerHTML = `<div class="song-list">
      ${data.data.slice(0, 10).map(song=>`<div class="single-result row align-items-center my-3 p-3">
                                            <div class="col-md-9">
                                            <h3 class="lyrics-name">${song.title}</h3>
                                            <p class="author lead">Album by <span>${song.artist.name}</span></p>
                                            </div>
                                            <div class="col-md-3 text-md-right text-center">
                                            <button class="btn2 btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                                            </div>
                                          </div>`
                                    ).join('')
        }
                                </div>`;
}
//event listener in get lyrics button
searchResults.addEventListener('click', e=>{
    const clickedElement = e.target;
    //checking clicked elemet is button or not
        if (clickedElement.tagName === 'BUTTON'){
            const artist = clickedElement.getAttribute('data-artist');
            const songTitle = clickedElement.getAttribute('data-songtitle');   
            getLyrics(artist, songTitle);
        }
    contentArea.style.display = 'none';
    lyricsShow.style.display = 'block';
})
// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
            lyricsShow.innerHTML = ` <div class="single-lyrics text-center">
                                <button onclick="goBack()" class="btn1 btn-success">Go Back</button>
                                <h2 class="text-success mb-4"><strong>${artist}</strong> - ${songTitle}</h2>
                                <pre class="lyric text-white">${lyrics}</pre>
                                </div>`;
}
//Go back to main window
function goBack(){
    contentArea.style.display = 'block';
    lyricsShow.style.display = 'none';
} 