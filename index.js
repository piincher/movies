const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '66847f69',
			s: searchTerm
		}
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);

	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}
	resultsWrapper.innerHTML = '';

	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const option = document.createElement('a');
		const imageSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		option.innerHTML = `
      <img src="${imageSRC}" />
      ${movie.Title}
	`;
		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie);
		});

		resultsWrapper.appendChild(option);
	}
};
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '66847f69',
			i: movie.imdbID
		}
	});
	console.log(response.data);
};
const movieTemplate = (movieDetail) => {
	return `<article class="media>
	<figure class="media-left">
	<p class="image">
	<img src="${movieDetail.Poster}"/>
	</p>
	</figure>
	</article>
	
	`
}