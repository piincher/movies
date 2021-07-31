const fetch = async (searchTerm) => {
	const { data } = await axios.get('http://www.omdbapi.com', {
		params: {
			apikey: '66847f69',
			s: searchTerm
		}
	});

	if (data.Error) {
		return [];
	}
	return data.Search;
};
const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search For a movie </b></label>
<input class="input/>
<div class="dropdown>
	<div class="dropdown-menu">
		<div class="dropdown-content results">

		</div>
	</div>
</div>
`;
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultWrapper = document.querySelector('.results');

let timeoutId;
const onInput = async (event) => {
	const movies = await fetch(event.target.value);
	for (let movie of movies) {
		const div = document.createElement('div');
		div.innerHTML = `
		<img src="${movie.Poster}"/>
		<h1>${movie.Title}</h1>
		`;
		document.querySelector('#target').appendChild(div);
	}
};
input.addEventListener('input', debounce(onInput, 1000));
