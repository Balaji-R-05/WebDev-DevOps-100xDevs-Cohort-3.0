function countVowels(str) {
    str = str.toLowerCase();
    let count = 0;

    for (let char of str) {
        if ("aeiou".includes(char)) {
            count++;
        }
    }
    return count;
}


function countVowelsReg(str) {
    str = str.replace(/[^aeiouAEIOU]/g, "")
    return str.length;
}

console.log(countVowels("Hello World"));      // 3
console.log(countVowels("AEIOU aeiou"));      // 10
console.log(countVowels("Javascript"));       // 3
console.log(countVowels("Rhythm"));           // 0