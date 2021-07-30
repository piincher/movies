const fetch = async (searchTerm) => {
	const { data } = await axios.get('http://www.omdbapi.com', {
		params: {
			apikey: '66847f69',
			s: searchTerm
		}
	});
	console.log(data);
};

const input = document.querySelector('input');

let timeoutId;
const onInput = (event) => {
	fetch(event.target.value);
};
input.addEventListener('input', debounce(onInput, 1000));
