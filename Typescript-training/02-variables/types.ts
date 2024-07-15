let found: boolean = true;
let grade: number = 88.6;
let firstName: string = "Pedro";
let lastName: string = "Freitas";

console.log(found)
console.log("Grade: " + grade)
console.log("Hi " + firstName + " " + lastName);
console.log(`Hi ${firstName} ${lastName}`);

// lOOPS
let reviews: number[] = [5, 5, 4.5 , 1];
let total: number = 0;

for (let i=0; i< reviews.length; i++) {
    console.log(reviews[i]);
    total+= reviews[i];
}
console.log("Total: " + total);


let sports: string[] = ["Futebol", "Volei", "Basquete"];

sports.push("Natação");
sports.push("Tennis");
for(let tempSport of sports) {
    if (tempSport == "Futebol") {
        console.log("My favorite sport!" + tempSport);
    } else {
    console.log(tempSport);
}
}