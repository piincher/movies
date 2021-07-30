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
input.addEventListener('input', (event) => {
	fetch(event.target.value);
});
