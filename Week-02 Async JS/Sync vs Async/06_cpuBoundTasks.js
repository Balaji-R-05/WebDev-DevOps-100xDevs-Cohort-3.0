// CPUBoundTask - Tasks involving high cpu computation

let ans = 0;

for (let i = 1; i <= 10000000000; i++) {
	ans = ans + i
}

console.log(ans); // 500000500000