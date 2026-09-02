/* ================================================================
   KSite Plus — isolated premium logic
   This file deliberately does not replace app.js.
   ================================================================ */

(() => {
    "use strict";

    const KEYS = {
        plus: "ksite.plus",
        readiness: "ksite.plus.readiness",
        readinessScore: "ksite.plus.readinessScore",
        readinessYear: "ksite.plus.birthYear",
        readinessVersion: "ksite.plus.readinessVersion"
    };

    const READINESS_VERSION = "1";

    function isPlusActive() {
        return localStorage.getItem(KEYS.plus) === "true";
    }

    function setPlus(active) {
        localStorage.setItem(KEYS.plus, String(Boolean(active)));
        syncPlusUI();
    }

    function hasReadinessPass() {
        return localStorage.getItem(KEYS.readiness) === "passed" &&
            localStorage.getItem(KEYS.readinessVersion) === READINESS_VERSION;
    }

    function notify(message, type = "success") {
        if (window.KSite?.showToast) {
            window.KSite.showToast(message, type);
            return;
        }
        console.info(`[KSite Plus] ${message}`);
    }

    function activatePlus() {
        setPlus(true);
        notify("KSite Plus is geactiveerd.");
    }

    function disablePlus() {
        setPlus(false);
        notify("KSite Plus is uitgeschakeld.");
        if (document.body.dataset.page === "plus-dashboard") {
            window.location.href = "plus.html";
        }
    }

    function syncPlusUI() {
        const active = isPlusActive();
        const readiness = hasReadinessPass();

        document.documentElement.dataset.ksitePlus = active ? "active" : "free";
        document.documentElement.dataset.ksiteReadiness = readiness ? "passed" : "pending";

        document.querySelectorAll("[data-kplus-status]").forEach(el => {
            el.textContent = active ? "Actief" : "Niet actief";
        });

        document.querySelectorAll("[data-kplus-readiness]").forEach(el => {
            el.textContent = readiness ? "Voltooid" : "Nog niet voltooid";
        });

        document.querySelectorAll("[data-kplus-activate]").forEach(button => {
            if (active) {
                button.textContent = "Open Plus Dashboard";
                button.onclick = () => { window.location.href = "plus-dashboard.html"; };
            } else {
                button.textContent = "Activeer Plus-demo";
                button.onclick = activatePlus;
            }
        });

        document.querySelectorAll("[data-kplus-disable]").forEach(button => {
            button.classList.toggle("hidden", !active);
            button.onclick = disablePlus;
        });

        document.querySelectorAll("[data-kplus-dashboard]").forEach(link => {
            link.classList.toggle("hidden", !active);
        });

        document.querySelectorAll("[data-kplus-advanced]").forEach(el => {
            el.classList.toggle("hidden", !(active && readiness));
        });

        document.querySelectorAll("[data-kplus-advanced-lock]").forEach(el => {
            el.classList.toggle("hidden", active && readiness);
        });

        document.querySelectorAll(".plus-status-panel").forEach(panel => {
            panel.classList.toggle("is-active", active);
        });

        const gate = document.getElementById("plusGate");
        const dashboard = document.getElementById("plusDashboardContent");
        if (document.body.dataset.page === "plus-dashboard") {
            gate?.classList.toggle("hidden", active);
            dashboard?.classList.toggle("hidden", !active);
        }
    }

    function calculateAgeFromYear(year) {
        const currentYear = new Date().getFullYear();
        return currentYear - Number(year);
    }

    function getCheckedValue(name) {
        return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
    }

    function scoreReadiness(form) {
        const year = Number(form.querySelector("#birthYear")?.value);
        const claimedAge = Number(form.querySelector("#claimedAge")?.value);
        const calculatedAge = calculateAgeFromYear(year);
        let score = 0;
        const notes = [];

        if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear()) {
            notes.push("Vul een geldig geboortejaar in.");
        } else if (Math.abs(calculatedAge - claimedAge) <= 1) {
            score += 20;
        } else {
            notes.push("Je opgegeven leeftijd en geboortejaar komen niet logisch overeen.");
        }

        const correct = {
            consent: "stop",
            laughter: "no",
            boundaries: "ask",
            pressure: "leave",
            privacy: "no-sensitive",
            emergency: "stop-help"
        };

        Object.entries(correct).forEach(([name, expected]) => {
            const answer = getCheckedValue(name);
            if (answer === expected) {
                score += 12;
            } else {
                notes.push(`Controleer je antwoord bij: ${name}.`);
            }
        });

        const understand = form.querySelector("#understandRules")?.checked;
        const voluntary = form.querySelector("#voluntaryUse")?.checked;
        if (understand) score += 4;
        else notes.push("Bevestig dat je de regels begrijpt.");
        if (voluntary) score += 4;
        else notes.push("Bevestig dat deelname vrijwillig hoort te zijn.");

        return {
            score: Math.min(100, score),
            year,
            claimedAge,
            calculatedAge,
            passed: score >= 88 && notes.length <= 1,
            notes
        };
    }

    function setupReadinessWizard() {
        const form = document.getElementById("readinessForm");
        if (!form) return;

        const steps = [...form.querySelectorAll(".readiness-step")];
        const bar = document.getElementById("readinessProgressBar");
        const meta = document.getElementById("readinessProgressText");
        const result = document.getElementById("readinessResult");
        let index = 0;

        function showStep(nextIndex) {
            index = Math.max(0, Math.min(steps.length - 1, nextIndex));
            steps.forEach((step, i) => step.classList.toggle("active", i === index));
            const percent = Math.round(((index + 1) / steps.length) * 100);
            if (bar) bar.style.width = `${percent}%`;
            if (meta) meta.textContent = `Stap ${index + 1} van ${steps.length}`;
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        form.querySelectorAll("[data-readiness-next]").forEach(button => {
            button.addEventListener("click", () => {
                const current = steps[index];
                const required = [...current.querySelectorAll("input[required], select[required]")];
                const invalid = required.find(input => {
                    if (input.type === "radio") {
                        return !current.querySelector(`input[name="${input.name}"]:checked`);
                    }
                    if (input.type === "checkbox") return !input.checked;
                    return !input.value;
                });
                if (invalid) {
                    invalid.focus?.();
                    notify("Vul eerst alle vragen van deze stap in.", "default");
                    return;
                }
                showStep(index + 1);
            });
        });

        form.querySelectorAll("[data-readiness-back]").forEach(button => {
            button.addEventListener("click", () => showStep(index - 1));
        });

        form.addEventListener("submit", event => {
            event.preventDefault();
            const outcome = scoreReadiness(form);
            localStorage.setItem(KEYS.readinessScore, String(outcome.score));
            localStorage.setItem(KEYS.readinessYear, String(outcome.year));

            if (outcome.passed) {
                localStorage.setItem(KEYS.readiness, "passed");
                localStorage.setItem(KEYS.readinessVersion, READINESS_VERSION);
                result.className = "readiness-result show pass";
                result.innerHTML = `<h3>Check voltooid — ${outcome.score}/100</h3><p>Je antwoorden laten zien dat je de veiligheids- en grensregels begrijpt. Advanced Plus is nu beschikbaar. Dit is geen officiële identiteits- of leeftijdsverificatie.</p>`;
                notify("Advanced Plus ontgrendeld.");
            } else {
                localStorage.removeItem(KEYS.readiness);
                result.className = "readiness-result show review";
                result.innerHTML = `<h3>Nog niet geslaagd — ${outcome.score}/100</h3><p>Lees de regels opnieuw en probeer de check daarna nog eens. De check gebruikt alleen je antwoorden in deze browser en is geen officiële leeftijdsverificatie.</p>`;
            }
            syncPlusUI();
        });

        document.getElementById("resetReadiness")?.addEventListener("click", () => {
            localStorage.removeItem(KEYS.readiness);
            localStorage.removeItem(KEYS.readinessScore);
            localStorage.removeItem(KEYS.readinessYear);
            localStorage.removeItem(KEYS.readinessVersion);
            form.reset();
            if (result) result.className = "readiness-result";
            syncPlusUI();
            showStep(0);
            notify("Readiness-check is gereset.", "default");
        });

        showStep(0);
    }

    function populateReadinessSummary() {
        const score = localStorage.getItem(KEYS.readinessScore) || "—";
        document.querySelectorAll("[data-readiness-score]").forEach(el => el.textContent = score === "—" ? "—" : `${score}/100`);
    }

    function init() {
        syncPlusUI();
        setupReadinessWizard();
        populateReadinessSummary();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }

    window.KSitePlus = {
        isPlusActive,
        activatePlus,
        disablePlus,
        hasReadinessPass,
        syncPlusUI
    };
})();