localDB.initialize().then(function () {
	document.getElementById("get-item").onclick = function () {
		var key = document.getElementById("key").value;
		
		localDB.getItem(key).then(function (value) {
			document.getElementById("result").innerHTML = value;
		});
	};
	
	document.getElementById("set-item").onclick = function () {
		var key = document.getElementById("key").value,
			value = document.getElementById("value").value;
			
		localDB.setItem(key, value);
	};
	
	document.getElementById("remove-item").onclick = function () {
		var key = document.getElementById("key").value;
			
		localDB.removeItem(key);
	};
});