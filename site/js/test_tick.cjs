const bootState = { target: 0, progress: 0, done: false };
function bumpBoot(p) { bootState.target = Math.max(bootState.target, p); }

function simulate() {
    let now = 0;
    let last = 0;
    bumpBoot(1);
    for (let i = 0; i < 20; i++) {
        now += 16.666;
        let dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        bootState.progress += (bootState.target - bootState.progress) * Math.min(1, dt * 6);
        if (bootState.target >= 1) bootState.progress += (1 - bootState.progress) * Math.min(1, dt * 4);
        let p = Math.max(0, Math.min(1, bootState.progress));
        let count = String(Math.round(p * 100)).padStart(2, "0");
        console.log(`Frame ${i}: count = ${count}, p = ${p}`);
        if (p >= 0.99 && !bootState.done) {
            bootState.done = true;
            console.log("finishBoot called!");
        }
    }
}
simulate();
