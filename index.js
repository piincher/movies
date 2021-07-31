const fetch = async (searchTerm) => {
	const { data } = await axios.get('http://www.omdbapi.com', {
		params: {
			apikey: '66847f69',
			s: searchTerm
		}
	});
	return data.Search;
};

const input = document.querySelector('input');

let timeoutId;
const onInput = async (event) => {
	const movie = await fetch(event.target.value);
	console.log(movie);
};
input.addEventListener('input', debounce(onInput, 1000));
