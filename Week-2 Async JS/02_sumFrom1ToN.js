function sum(num) {
	let ans = 0;

	for (let i = 1; i <= num; i++) {
		ans = ans + i
	}

	return ans;
}

let ans = sum(10);

console.log(ans); // 55