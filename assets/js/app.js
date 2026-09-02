/* ================================================================
   KSite 3.0 — Application Logic
   ================================================================ */

(() => {
    "use strict";

    const STORAGE_KEYS = {
        theme: "ksite.theme",
        xp: "ksite.xp",
        completedLessons: "ksite.completedLessons",
        quizBest: "ksite.quizBest",
        quizRuns: "ksite.quizRuns",
        plus: "ksite.plus",
        displayName: "ksite.displayName",
        streak: "ksite.streak",
        lastVisit: "ksite.lastVisit",
        challenges: "ksite.challenges"
    };

    const CHALLENGE_XP = {
        terms: 30,
        route: 35,
        "two-types": 30,
        zones: 40,
        variation: 40,
        map: 45,
        myths: 45,
        self: 40,
        laughter: 35,
        quiz90: 60,
        explain: 60,
        master: 80
    };

    function readNumber(key, fallback = 0) {
        const value = Number(localStorage.getItem(key));
        return Number.isFinite(value) ? value : fallback;
    }

    function readJson(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            console.warn("KSite kon lokale data niet lezen:", error);
            return fallback;
        }
    }

    function writeJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function showToast(message, type = "default") {
        const container = document.getElementById("toastContainer");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = `toast ${type === "success" ? "success" : ""}`;
        toast.textContent = message;
        container.appendChild(toast);
        window.setTimeout(() => toast.remove(), 3300);
    }

    function getXP() { return readNumber(STORAGE_KEYS.xp, 0); }
    function setXP(value) {
        const safe = Math.max(0, Math.round(value));
        localStorage.setItem(STORAGE_KEYS.xp, String(safe));
        refreshProgressUI();
        return safe;
    }
    function addXP(amount, reason = "Activiteit") {
        setXP(getXP() + amount);
        showToast(`+${amount} XP • ${reason}`, "success");
    }
    function getLevel(xp = getXP()) { return Math.floor(xp / 250) + 1; }
    function getLevelProgress(xp = getXP()) { return Math.round(((xp % 250) / 250) * 100); }
    function isPlusActive() { return localStorage.getItem(STORAGE_KEYS.plus) === "true"; }

    function applyStoredTheme() {
        if (localStorage.getItem(STORAGE_KEYS.theme) === "light") document.body.classList.add("light-theme");
        updateThemeButton();
    }
    function updateThemeButton() {
        const button = document.getElementById("themeBtn");
        if (!button) return;
        const light = document.body.classList.contains("light-theme");
        button.textContent = light ? "☾" : "◐";
        button.title = light ? "Donker thema" : "Licht thema";
    }
    function toggleTheme() {
        const light = document.body.classList.toggle("light-theme");
        localStorage.setItem(STORAGE_KEYS.theme, light ? "light" : "dark");
        updateThemeButton();
    }

    function setupNavigation() {
        const menuButton = document.getElementById("menuBtn");
        const mobileMenu = document.getElementById("mobileMenu");
        document.getElementById("themeBtn")?.addEventListener("click", toggleTheme);
        menuButton?.addEventListener("click", () => mobileMenu?.classList.toggle("open"));
        mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => mobileMenu.classList.remove("open")));
        document.addEventListener("click", event => {
            if (mobileMenu && menuButton && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) mobileMenu.classList.remove("open");
        });
    }

    function setupRevealAnimations() {
        const elements = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            elements.forEach(el => el.classList.add("visible"));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(el => observer.observe(el));
    }

    function refreshProgressUI() {
        const xp = getXP();
        const level = getLevel(xp);
        const progress = getLevelProgress(xp);
        const completedLessons = readJson(STORAGE_KEYS.completedLessons, []).length;
        const values = { homeXp: xp, profileXp: xp, dashboardXp: xp, homeLevel: level, profileLevel: level, dashboardLevel: level, homeLessons: completedLessons, profileLessons: completedLessons, dashboardLessons: completedLessons };
        Object.entries(values).forEach(([id,value]) => { const el = document.getElementById(id); if (el) el.textContent = value; });
        ["homeProgress","profileProgress","dashboardProgress"].forEach(id => { const el = document.getElementById(id); if (el) el.style.width = `${progress}%`; });
    }

    function activatePlus() {
        localStorage.setItem(STORAGE_KEYS.plus, "true");
        showToast("KSite Plus demo is geactiveerd!", "success");
        window.setTimeout(() => { if (document.body.dataset.page === "plus") location.href = "plus-dashboard.html"; }, 500);
    }
    function deactivatePlus() {
        localStorage.setItem(STORAGE_KEYS.plus, "false");
        showToast("Plus demo is uitgeschakeld.");
        updatePlusUI();
    }
    function updatePlusUI() {
        const active = isPlusActive();
        document.querySelectorAll("[data-plus-status]").forEach(el => el.textContent = active ? "Actief" : "Niet actief");
        document.getElementById("activatePlusBtn")?.classList.toggle("hidden", active);
        document.getElementById("deactivatePlusBtn")?.classList.toggle("hidden", !active);
        if (document.body.dataset.page === "plus-dashboard" && !active) location.href = "plus.html";
    }

    function setupChallenges() {
        if (document.body.dataset.page !== "challenges") return;
        const gate = document.getElementById("challengeGate");
        const content = document.getElementById("challengeContent");
        if (!isPlusActive()) {
            gate?.classList.remove("hidden");
            content?.classList.add("hidden");
            return;
        }
        gate?.classList.add("hidden");
        content?.classList.remove("hidden");
        const completed = readJson(STORAGE_KEYS.challenges, []);

        function refresh() {
            const current = readJson(STORAGE_KEYS.challenges, []);
            let challengeXp = 0;
            current.forEach(id => challengeXp += CHALLENGE_XP[id] || 0);
            const doneEl = document.getElementById("challengeDone");
            const xpEl = document.getElementById("challengeXp");
            if (doneEl) doneEl.textContent = current.length;
            if (xpEl) xpEl.textContent = `${challengeXp} XP`;
            document.querySelectorAll(".challenge-card").forEach(card => {
                const done = current.includes(card.dataset.challenge);
                card.classList.toggle("completed", done);
                const button = card.querySelector(".challenge-complete");
                if (button) button.textContent = done ? "Voltooid ✓" : "Markeer voltooid";
            });
        }

        document.querySelectorAll(".challenge-complete").forEach(button => {
            button.addEventListener("click", () => {
                const card = button.closest(".challenge-card");
                const id = card?.dataset.challenge;
                if (!id) return;
                const current = readJson(STORAGE_KEYS.challenges, []);
                if (current.includes(id)) {
                    showToast("Deze challenge is al voltooid.");
                    return;
                }
                if (id === "master" && current.length < 11) {
                    showToast("Voltooi eerst de andere 11 challenges.");
                    return;
                }
                current.push(id);
                writeJson(STORAGE_KEYS.challenges, current);
                addXP(CHALLENGE_XP[id] || 0, "Plus Challenge voltooid");
                refresh();
            });
        });
        refresh();
    }

    function setupGenericButtons() {
        document.getElementById("activatePlusBtn")?.addEventListener("click", activatePlus);
        document.getElementById("deactivatePlusBtn")?.addEventListener("click", deactivatePlus);
    }

    function setupStreak() {
        const today = new Date().toISOString().slice(0,10);
        const previous = localStorage.getItem(STORAGE_KEYS.lastVisit);
        if (previous === today) return;
        let streak = readNumber(STORAGE_KEYS.streak, 0);
        if (previous) {
            const diff = Math.round((new Date(today) - new Date(previous)) / 86400000);
            streak = diff === 1 ? streak + 1 : 1;
        } else streak = 1;
        localStorage.setItem(STORAGE_KEYS.streak, String(streak));
        localStorage.setItem(STORAGE_KEYS.lastVisit, today);
    }

    function init() {
        applyStoredTheme();
        setupNavigation();
        setupRevealAnimations();
        setupStreak();
        refreshProgressUI();
        updatePlusUI();
        setupGenericButtons();
        setupChallenges();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();