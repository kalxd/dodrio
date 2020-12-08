class User {
	id: String;

	constructor(id: String) {
		this.id = id;
	}
}

let user: User = new User("id")

console.log(user);
