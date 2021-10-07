

var json = 
`
{
    "login": {
		"fields": [
			{
				"id": 1000,
				"type": "email",
				"name": "email",
				"placeholder": "Login",
				"label": "",
				"required": true
			},
			{
				"id": 1045,
				"type": "password",
				"name": "password",
				"hints": "insert hints here",
				"placeholder": "Password",
				"label": "",
				"required": true,
				"minLength": 4,
				"maxLength": 10
			}
		],
		"buttons": [
			{
				"label": "Login",
				"variant": "primary",
				"type": "submit",
				"function": "onSubmit"
			}
		],
		"post": "login"
	}
}`;

