var mongodb = require('mongodb');

var nameList = ['Diego', 'Daniel', 'Sebastian', 'Maximiliano', 'Eduardo', 'Andres', 'Zacarias', 'Cristian', 'Florencia', 'Vanesa', 'Micaela', 'Ailin', 'Kassandra', 'Constanza', 'Victoria', 'Ana'];
var lastNameList = ['Fernandez', 'Perez', 'Vega', 'Jelinek', 'Luna', 'Aniston', 'Gates', 'Brown', 'Castro', 'Montiel', 'Tejedor', 'Bohm', 'Cardenas', 'Smith', 'Kruger', 'Vargas'];
var ageList = [11, 22, 33, 44, 55, 66, 77, 88, 99, 100, 21, 32, 43, 54, 65, 76, 87, 98, 89, 78, 67, 56, 45, 34, 23, 12];
var dateList = [10, 25, 11, 6, 1, 17, 15, 5];
var monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var yearList = [2001, 2002, 2003, 2004, 1989, 1990, 1998, 1984, 1932, 1915, 1923];
var occipationList = ['Plomero', 'Arquitecto', 'Mecanico', 'Ing en Sistemas', 'Astronauta', 'Contratista', 'RRHH', 'Artista Independiente', 'Abogado', 'Cronista de Deportes', 'Policia', 'Lic en Turismo'];
var amountOfPeopleToBeCreated = 2000;
var amountOfLoops = 1000;

var databaseUrl = 'mongodb://mongodb.mvargas:27017/DB_PERFORMANCE_TEST';
var collectionName = 'DB_TEST_NOT_INDEXED';

var chooseItemFromList = function(list) {
	var index = Math.floor(Math.random() * list.length);
	return list[index];
};

var createPersonName = function() {
	var name = chooseItemFromList(nameList);
	var lastName = chooseItemFromList(lastNameList);
	
	return {
		'first': name,
		'last': lastName,
		'full': name + ' ' + lastName 
	}
};

var createDate = function() {
	var date = chooseItemFromList(dateList);
	var month = chooseItemFromList(monthList);
	var year = chooseItemFromList(yearList);

	return month + '-' + date + '-' + year;
};

var createPerson = function(){
	var occupationList = [];
	var occupationCount = Math.floor((Math.random() * 10) + 1);	

	for(var i=0; i < occupationCount; i++){
		var bossCount = Math.floor((Math.random() * 3) + 1);
		var bossList = [];
		for(var j=0; j < bossCount; j++){
			bossList.push({
				'name': createPersonName(),					
				'occupation': chooseItemFromList(occipationList)
			});	
		}
		occupationList.push({
			'name': chooseItemFromList(occipationList),
			'dateIn': createDate(),
			'dateOut': createDate(),
			'bossList': bossList
		});
	}

	return {
		'name': createPersonName(),
		'dateBorn': createDate(),
		'occupationList': occupationList,
		'age': chooseItemFromList(ageList)
	}
	
};

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
MongoClient.connect(databaseUrl, function (err, db) {
  	if (err) {
    	console.log('Unable to connect to the mongoDB server. Error:', err);
  	} else {
  		//HURRAY!! We are connected. :)
   		console.log('Connection established to', databaseUrl);

		// Get the documents collection
		var collection = db.collection(collectionName);

		var i = 0;
		setInterval(function(){ 
			var peopleList = [];
			for(var j=0; j < amountOfPeopleToBeCreated; j++){
				peopleList.push(createPerson());
			}

			// Insert some users
			collection.insert(peopleList, function (err, result) {
	  			if (err) { console.log(err);
	  			} else { console.log( i + ' DONE' ); }
	  			if (amountOfLoops === i) { db.close(); }
			});

			i++;
			if (i == amountOfLoops){
				clearInterval(this);
			}
		}, 2000);
	}
});
