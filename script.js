const searchArea = document.getElementById("search-area");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
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
})
//search song 
async function searchSong(searchValue){
    const searchResults = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResults.json();
    
    showData(data);
}

//display final result 
function showData(data){
    searchResults.innerHTML = `
    <div class="song-list">
      ${data.data.slice(0, 10).map(song=> `<p class="author lead">
                        <strong>${song.title}</strong> Album By
                        <span>${song.artist.name}</span> 
                        <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics </button>
                </p>`
        )
        .join('')}
    </div>
  `;
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
})
// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    searchResults.innerHTML = `<h2 class="text-success mb-4"><strong>${artist}</strong> - ${songTitle}</h2>
    <pre class="lyric text-white">${lyrics}</pre>`;
  
  }