const fetch = async () => {
	const { data } = await axios.get('http://www.omdbapi.com', {
		params: {
			apikey: '66847f69',
			i: 'tt0468569'
		}
	});
	console.log(data);
};

fetch();
