(() => {
    "use strict";

    const STORAGE = {
        plus: "ksite.plus",
        xp: "ksite.xp",
        challenges: "ksite.challenges"
    };

    const challengeXp = {
        terms: 30,
        route: 35,
        compare: 40,
        zones: 45,
        variation: 45,
        mythlab: 50,
        explain: 55,
        quiz90: 60,
        sourcecheck: 65,
        longform: 70,
        teachback: 75,
        master: 100
    };

    const readJson = (key, fallback) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch {
            return fallback;
        }
    };

    const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    const plusActive = () => localStorage.getItem(STORAGE.plus) === "true";

    const showToast = (text) => {
        const host = document.getElementById("toastContainer");
        if (!host) return;
        const el = document.createElement("div");
        el.className = "toast success";
        el.textContent = text;
        host.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    };

    function addXp(amount) {
        const current = Number(localStorage.getItem(STORAGE.xp) || 0);
        localStorage.setItem(STORAGE.xp, String(Math.max(0, current + amount)));
    }

    function setupChallenges() {
        if (document.body.dataset.page !== "challenges") return;

        const gate = document.getElementById("challengeGate");
        const content = document.getElementById("challengeContent");

        if (!plusActive()) {
            gate?.classList.remove("hidden");
            content?.classList.add("hidden");
            return;
        }

        gate?.classList.add("hidden");
        content?.classList.remove("hidden");

        const refresh = () => {
            const completed = readJson(STORAGE.challenges, []);
            const totalXp = completed.reduce((sum, id) => sum + (challengeXp[id] || 0), 0);

            const done = document.getElementById("challengeDone");
            const xp = document.getElementById("challengeXp");
            if (done) done.textContent = completed.length;
            if (xp) xp.textContent = `${totalXp} XP`;

            document.querySelectorAll(".challenge-card[data-challenge]").forEach(card => {
                const isDone = completed.includes(card.dataset.challenge);
                card.classList.toggle("completed", isDone);
                const button = card.querySelector(".challenge-complete");
                if (button) button.textContent = isDone ? "Voltooid ✓" : "Markeer voltooid";
            });
        };

        document.querySelectorAll(".challenge-complete").forEach(button => {
            button.addEventListener("click", () => {
                const card = button.closest(".challenge-card");
                if (!card) return;

                const id = card.dataset.challenge;
                const completed = readJson(STORAGE.challenges, []);

                if (completed.includes(id)) {
                    showToast("Deze challenge is al voltooid.");
                    return;
                }

                if (id === "master" && completed.length < 11) {
                    showToast("Voltooi eerst de andere 11 challenges.");
                    return;
                }

                completed.push(id);
                writeJson(STORAGE.challenges, completed);
                addXp(challengeXp[id] || 0);
                showToast(`Challenge voltooid: +${challengeXp[id] || 0} XP`);
                refresh();
            });
        });

        refresh();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupChallenges);
    } else {
        setupChallenges();
    }
})();
