function StorageSession(key){
	let storage = JSON.parse(sessionStorage.getItem(key)) ?? {};
	const save = () =>{
		sessionStorage.setItem(key, JSON.stringify(storage));
	}
	return {
		get(key){
			return storage[key];
		},
		set(key, value){
			storage[key] = value;
			save();
		},
		remove(key){
			delete storage[key];
			save();
		},
		isEmpty(){
			return Object.keys(storage).length === 0;
		}
	}
}

function LocalStorage(key){
	let storage = JSON.parse(localStorage.getItem(key)) ?? {};
	const save = () =>{
		localStorage.setItem(key, JSON.stringify(storage));
	}
	return {
		get(key){
			return storage[key];
		},
		set(key, value){
			storage[key] = value;
			save();
		},
		remove(key){
			delete storage[key];
			save();
		},
		isEmpty(){
			return Object.keys(storage).length === 0;
		}
	}
}

export {
	StorageSession,
	LocalStorage
}