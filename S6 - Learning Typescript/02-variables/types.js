var found = true;
var grade = 88.6;
var firstName = "Pedro";
var lastName = "Freitas";
console.log(found);
console.log("Grade: " + grade);
console.log("Hi " + firstName + " " + lastName);
console.log("Hi ".concat(firstName, " ").concat(lastName));
// lOOPS
var reviews = [5, 5, 4.5, 1];
var total = 0;
for (var i = 0; i < reviews.length; i++) {
    console.log(reviews[i]);
    total += reviews[i];
}
console.log("Total: " + total);
var sports = ["Futebol", "Volei", "Basquete"];
sports.push("Natação");
sports.push("Tennis");
for (var _i = 0, sports_1 = sports; _i < sports_1.length; _i++) {
    var tempSport = sports_1[_i];
    if (tempSport == "Futebol") {
        console.log("My favorite sport!" + tempSport);
    }
    else {
        console.log(tempSport);
    }
}
