app.constant("config",
	{
		baseUrl: "http://localhost",
		auth: (JSON.parse( sessionStorage.getItem('user') ) == null) ? null : JSON.parse( sessionStorage.getItem('user') ).auth,
		user: (JSON.parse( sessionStorage.getItem('user') ) == null) ? null : JSON.parse( sessionStorage.getItem('user') ),
	}
);