/* ================================================================
   KSite 2.0 — Application Logic
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
        lastVisit: "ksite.lastVisit"
    };

    const LESSONS = [
        {
            id: "basis",
            number: 1,
            title: "De basis van tast",
            category: "basis",
            duration: 6,
            xp: 40,
            plus: false,
            description: "Leer hoe huidreceptoren verschillende soorten aanraking registreren."
        },
        {
            id: "zenuwen",
            number: 2,
            title: "Zenuwen en signalen",
            category: "zenuwstelsel",
            duration: 8,
            xp: 50,
            plus: false,
            description: "Volg de route van een tastprikkel van de huid naar het centrale zenuwstelsel."
        },
        {
            id: "hersenen",
            number: 3,
            title: "Hoe je brein aanraking verwerkt",
            category: "hersenen",
            duration: 9,
            xp: 60,
            plus: false,
            description: "Ontdek hoe verwachting, aandacht en context samen je ervaring beïnvloeden."
        },
        {
            id: "reflexen",
            number: 4,
            title: "Reflexen en reacties",
            category: "reacties",
            duration: 7,
            xp: 50,
            plus: false,
            description: "Bekijk waarom sommige reacties snel en automatisch kunnen lijken."
        },
        {
            id: "lachen",
            number: 5,
            title: "Waarom mensen soms lachen",
            category: "gedrag",
            duration: 7,
            xp: 55,
            plus: false,
            description: "Leer waarom lachen niet altijd hetzelfde betekent en welke factoren meespelen."
        },
        {
            id: "verschillen",
            number: 6,
            title: "Waarom iedereen anders reageert",
            category: "verschillen",
            duration: 8,
            xp: 60,
            plus: true,
            description: "Duik dieper in persoonlijke verschillen, gewenning en aandacht."
        },
        {
            id: "voorspelling",
            number: 7,
            title: "Voorspelling in het brein",
            category: "hersenen",
            duration: 10,
            xp: 70,
            plus: true,
            description: "Onderzoek waarom zelf veroorzaakte en onverwachte prikkels anders kunnen aanvoelen."
        },
        {
            id: "grenzen",
            number: 8,
            title: "Grenzen en toestemming",
            category: "respect",
            duration: 6,
            xp: 50,
            plus: false,
            description: "Leer hoe je duidelijk en respectvol met lichamelijke grenzen omgaat."
        }
    ];

    const QUIZ_QUESTIONS = [
        {
            question: "Welke uitspraak over tast is het meest correct?",
            answers: [
                "Tast wordt door één enkel type receptor geregeld.",
                "Verschillende receptoren reageren op verschillende mechanische prikkels.",
                "Tast wordt uitsluitend in de huid verwerkt.",
                "Tast heeft niets met zenuwen te maken."
            ],
            correct: 1,
            explanation: "De huid bevat meerdere soorten receptoren en zenuwuiteinden die op verschillende prikkels reageren."
        },
        {
            question: "Waarom kan zelf veroorzaakte aanraking anders worden ervaren?",
            answers: [
                "Omdat je huid dan tijdelijk uitstaat.",
                "Omdat je brein de beweging en gevolgen beter kan voorspellen.",
                "Omdat zenuwen alleen reageren op andere mensen.",
                "Omdat je hartslag altijd daalt."
            ],
            correct: 1,
            explanation: "Je hersenen gebruiken voorspellingen over je eigen bewegingen en de verwachte zintuiglijke gevolgen."
        },
        {
            question: "Is gevoeligheid voor lichte aanraking bij iedereen hetzelfde?",
            answers: [
                "Ja, volledig hetzelfde.",
                "Alleen bij volwassenen.",
                "Nee, er bestaan duidelijke persoonlijke verschillen.",
                "Alleen wanneer iemand moe is."
            ],
            correct: 2,
            explanation: "Gevoeligheid verschilt per persoon en kan ook binnen dezelfde persoon per moment veranderen."
        },
        {
            question: "Welke factor kan invloed hebben op de ervaring van aanraking?",
            answers: [
                "Aandacht",
                "Verwachting",
                "Context",
                "Alle bovenstaande antwoorden"
            ],
            correct: 3,
            explanation: "Aandacht, verwachting en context kunnen allemaal invloed hebben op hoe prikkels worden verwerkt."
        },
        {
            question: "Wat betekent lachen tijdens een lichamelijke reactie automatisch?",
            answers: [
                "Dat iemand de situatie altijd leuk vindt.",
                "Dat iemand toestemming geeft.",
                "Niets specifieks over toestemming; grenzen moeten apart worden gerespecteerd.",
                "Dat iemand geen grenzen heeft."
            ],
            correct: 2,
            explanation: "Een automatische lachreactie is geen toestemming. Een duidelijk nee- of stopsignaal moet altijd worden gerespecteerd."
        },
        {
            question: "Wat is de veiligste regel bij lichamelijke grenzen?",
            answers: [
                "Doorgaan totdat iemand twee keer nee zegt.",
                "Stoppen wanneer iemand aangeeft dat diegene wil stoppen.",
                "Alleen stoppen wanneer iemand boos wordt.",
                "Nooit vooraf iets vragen."
            ],
            correct: 1,
            explanation: "Een stop- of nee-signaal betekent stoppen. Toestemming hoort vrijwillig te zijn."
        },
        {
            question: "Welke route beschrijft een tastprikkel het best?",
            answers: [
                "Huid → zenuwsignalen → centrale verwerking",
                "Huid → longen → haar",
                "Spieren → tanden → huid",
                "Ogen → huid → maag"
            ],
            correct: 0,
            explanation: "Mechanische prikkels worden door receptoren omgezet in zenuwsignalen die verder worden verwerkt."
        },
        {
            question: "Kan gewenning invloed hebben op hoe opvallend een prikkel voelt?",
            answers: [
                "Nee, nooit.",
                "Ja, herhaalde prikkels kunnen soms minder opvallend worden.",
                "Alleen bij geluid.",
                "Alleen tijdens slaap."
            ],
            correct: 1,
            explanation: "Het zenuwstelsel kan zich aanpassen aan herhaalde of voorspelbare informatie."
        }
    ];

    const state = {
        quizIndex: 0,
        quizScore: 0,
        quizLocked: false
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

    function getXP() {
        return readNumber(STORAGE_KEYS.xp, 0);
    }

    function setXP(value) {
        const safeValue = Math.max(0, Math.round(value));
        localStorage.setItem(STORAGE_KEYS.xp, String(safeValue));
        refreshProgressUI();
        return safeValue;
    }

    function addXP(amount, reason = "Activiteit") {
        const previous = getXP();
        const next = setXP(previous + amount);
        showToast(`+${amount} XP • ${reason}`, "success");
        return next;
    }

    function getLevel(xp = getXP()) {
        return Math.floor(xp / 250) + 1;
    }

    function getLevelProgress(xp = getXP()) {
        const withinLevel = xp % 250;
        return Math.round((withinLevel / 250) * 100);
    }

    function getCompletedLessons() {
        return readJson(STORAGE_KEYS.completedLessons, []);
    }

    function isLessonCompleted(id) {
        return getCompletedLessons().includes(id);
    }

    function completeLesson(id) {
        const lesson = LESSONS.find(item => item.id === id);
        if (!lesson) {
            return;
        }

        const completed = getCompletedLessons();
        if (completed.includes(id)) {
            showToast("Deze les was al voltooid.");
            return;
        }

        completed.push(id);
        writeJson(STORAGE_KEYS.completedLessons, completed);
        addXP(lesson.xp, `Les voltooid: ${lesson.title}`);
        renderLessons();
        refreshProgressUI();
    }

    function isPlusActive() {
        return localStorage.getItem(STORAGE_KEYS.plus) === "true";
    }

    function activatePlus() {
        localStorage.setItem(STORAGE_KEYS.plus, "true");
        showToast("KSite Plus demo is geactiveerd!", "success");
        updatePlusUI();
        window.setTimeout(() => {
            if (document.body.dataset.page === "plus") {
                window.location.href = "plus-dashboard.html";
            }
        }, 650);
    }

    function deactivatePlus() {
        localStorage.setItem(STORAGE_KEYS.plus, "false");
        showToast("Plus demo is uitgeschakeld.");
        updatePlusUI();
    }

    function updateThemeButton() {
        const button = document.getElementById("themeBtn");
        if (!button) {
            return;
        }

        const isLight = document.body.classList.contains("light-theme");
        button.textContent = isLight ? "☾" : "◐";
        button.title = isLight ? "Donker thema" : "Licht thema";
    }

    function applyStoredTheme() {
        const saved = localStorage.getItem(STORAGE_KEYS.theme);
        if (saved === "light") {
            document.body.classList.add("light-theme");
        }
        updateThemeButton();
    }

    function toggleTheme() {
        const isLight = document.body.classList.toggle("light-theme");
        localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
        updateThemeButton();
    }

    function setupNavigation() {
        const menuButton = document.getElementById("menuBtn");
        const mobileMenu = document.getElementById("mobileMenu");
        const themeButton = document.getElementById("themeBtn");

        themeButton?.addEventListener("click", toggleTheme);

        menuButton?.addEventListener("click", () => {
            mobileMenu?.classList.toggle("open");
        });

        mobileMenu?.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });

        document.addEventListener("click", event => {
            if (!mobileMenu || !menuButton) {
                return;
            }
            if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
                mobileMenu.classList.remove("open");
            }
        });
    }

    function setupRevealAnimations() {
        const elements = document.querySelectorAll(".reveal");

        if (!("IntersectionObserver" in window)) {
            elements.forEach(element => element.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elements.forEach(element => observer.observe(element));
    }

    function refreshProgressUI() {
        const xp = getXP();
        const level = getLevel(xp);
        const progress = getLevelProgress(xp);
        const completed = getCompletedLessons().length;

        const mappings = {
            homeXp: xp,
            profileXp: xp,
            dashboardXp: xp,
            homeLevel: level,
            profileLevel: level,
            dashboardLevel: level,
            homeLessons: completed,
            profileLessons: completed,
            dashboardLessons: completed
        };

        Object.entries(mappings).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        ["homeProgress", "profileProgress", "dashboardProgress"].forEach(id => {
            const bar = document.getElementById(id);
            if (bar) {
                bar.style.width = `${progress}%`;
            }
        });
    }

    function renderLessons() {
        const container = document.getElementById("lessonGrid");
        if (!container) {
            return;
        }

        const activeFilter = document.querySelector(".filter-chip.active")?.dataset.filter || "all";
        const query = (document.getElementById("lessonSearch")?.value || "").trim().toLowerCase();
        const plusActive = isPlusActive();

        const filtered = LESSONS.filter(lesson => {
            const categoryMatch = activeFilter === "all" || lesson.category === activeFilter;
            const queryMatch = !query || `${lesson.title} ${lesson.description} ${lesson.category}`.toLowerCase().includes(query);
            return categoryMatch && queryMatch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <strong>Geen lessen gevonden</strong>
                    <p>Probeer een andere zoekterm of kies een ander filter.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(lesson => {
            const completed = isLessonCompleted(lesson.id);
            const locked = lesson.plus && !plusActive;
            const action = locked
                ? `<a class="btn secondary small" href="plus.html">Ontgrendel Plus</a>`
                : `<button class="btn ${completed ? "secondary" : "primary"} small complete-lesson" data-lesson-id="${lesson.id}" type="button">${completed ? "Voltooid ✓" : "Markeer voltooid"}</button>`;

            return `
                <article class="lesson-card ${locked ? "locked" : ""}">
                    <span class="lesson-number">MODULE ${String(lesson.number).padStart(2, "0")}</span>
                    <h3>${lesson.title}</h3>
                    <p>${lesson.description}</p>
                    <div class="lesson-meta">
                        <span>${lesson.duration} min</span>
                        <span>+${lesson.xp} XP</span>
                        <span>${lesson.category}</span>
                    </div>
                    <div class="lesson-progress"><span style="width:${completed ? 100 : 0}%"></span></div>
                    ${action}
                </article>
            `;
        }).join("");

        container.querySelectorAll(".complete-lesson").forEach(button => {
            button.addEventListener("click", () => completeLesson(button.dataset.lessonId));
        });
    }

    function setupLessonFilters() {
        const chips = document.querySelectorAll(".filter-chip[data-filter]");
        const search = document.getElementById("lessonSearch");

        chips.forEach(chip => {
            chip.addEventListener("click", () => {
                chips.forEach(item => item.classList.remove("active"));
                chip.classList.add("active");
                renderLessons();
            });
        });

        search?.addEventListener("input", renderLessons);
    }

    function setupKnowledgeSearch() {
        const input = document.getElementById("knowledgeSearch");
        const cards = [...document.querySelectorAll("[data-knowledge-card]")];
        const resultCount = document.getElementById("knowledgeResultCount");

        if (!input || cards.length === 0) {
            return;
        }

        const filterCards = () => {
            const query = input.value.trim().toLowerCase();
            let visible = 0;

            cards.forEach(card => {
                const match = !query || card.textContent.toLowerCase().includes(query);
                card.classList.toggle("hidden", !match);
                if (match) {
                    visible += 1;
                }
            });

            if (resultCount) {
                resultCount.textContent = `${visible} onderwerpen`;
            }
        };

        input.addEventListener("input", filterCards);
        filterCards();
    }

    function renderQuiz() {
        const question = QUIZ_QUESTIONS[state.quizIndex];
        const title = document.getElementById("questionTitle");
        const answers = document.getElementById("answerList");
        const progressText = document.getElementById("quizProgressText");
        const progressBar = document.getElementById("quizProgressBar");
        const score = document.getElementById("quizLiveScore");
        const explanation = document.getElementById("quizExplanation");
        const nextButton = document.getElementById("quizNextBtn");

        if (!question || !title || !answers) {
            return;
        }

        state.quizLocked = false;
        title.textContent = question.question;
        answers.innerHTML = "";

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.className = "answer-btn";
            button.type = "button";
            button.textContent = answer;
            button.addEventListener("click", () => handleQuizAnswer(index));
            answers.appendChild(button);
        });

        if (progressText) {
            progressText.textContent = `Vraag ${state.quizIndex + 1} van ${QUIZ_QUESTIONS.length}`;
        }

        if (progressBar) {
            progressBar.style.width = `${((state.quizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;
        }

        if (score) {
            score.textContent = state.quizScore;
        }

        if (explanation) {
            explanation.classList.add("hidden");
            explanation.textContent = "";
        }

        if (nextButton) {
            nextButton.classList.add("hidden");
        }
    }

    function handleQuizAnswer(selectedIndex) {
        if (state.quizLocked) {
            return;
        }

        state.quizLocked = true;
        const question = QUIZ_QUESTIONS[state.quizIndex];
        const buttons = [...document.querySelectorAll(".answer-btn")];
        const explanation = document.getElementById("quizExplanation");
        const nextButton = document.getElementById("quizNextBtn");

        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add("correct");
            }
            if (index === selectedIndex && index !== question.correct) {
                button.classList.add("wrong");
            }
        });

        if (selectedIndex === question.correct) {
            state.quizScore += 1;
            const liveScore = document.getElementById("quizLiveScore");
            if (liveScore) {
                liveScore.textContent = state.quizScore;
            }
        }

        if (explanation) {
            explanation.textContent = question.explanation;
            explanation.classList.remove("hidden");
        }

        nextButton?.classList.remove("hidden");
    }

    function nextQuizQuestion() {
        if (state.quizIndex < QUIZ_QUESTIONS.length - 1) {
            state.quizIndex += 1;
            renderQuiz();
            return;
        }

        finishQuiz();
    }

    function finishQuiz() {
        const percentage = Math.round((state.quizScore / QUIZ_QUESTIONS.length) * 100);
        const best = readNumber(STORAGE_KEYS.quizBest, 0);
        const runs = readNumber(STORAGE_KEYS.quizRuns, 0) + 1;
        const reward = state.quizScore * 10;

        localStorage.setItem(STORAGE_KEYS.quizRuns, String(runs));
        localStorage.setItem(STORAGE_KEYS.quizBest, String(Math.max(best, percentage)));
        addXP(reward, "Quiz afgerond");

        const shell = document.getElementById("quizMainCard");
        if (!shell) {
            return;
        }

        shell.innerHTML = `
            <div class="empty-state">
                <span class="eyebrow">QUIZ VOLTOOID</span>
                <h2 class="mt-16">${state.quizScore}/${QUIZ_QUESTIONS.length} goed</h2>
                <p>Je score is ${percentage}% en je verdiende ${reward} XP.</p>
                <div class="hero-actions" style="justify-content:center">
                    <button class="btn primary" id="restartQuiz" type="button">Nog een keer</button>
                    <a class="btn secondary" href="lessen.html">Naar lessen</a>
                </div>
            </div>
        `;

        document.getElementById("restartQuiz")?.addEventListener("click", restartQuiz);
        refreshQuizStats();
    }

    function restartQuiz() {
        state.quizIndex = 0;
        state.quizScore = 0;
        window.location.reload();
    }

    function refreshQuizStats() {
        const best = readNumber(STORAGE_KEYS.quizBest, 0);
        const runs = readNumber(STORAGE_KEYS.quizRuns, 0);
        const bestElement = document.getElementById("quizBest");
        const runsElement = document.getElementById("quizRuns");

        if (bestElement) {
            bestElement.textContent = `${best}%`;
        }

        if (runsElement) {
            runsElement.textContent = runs;
        }
    }

    function setupQuiz() {
        if (!document.getElementById("questionTitle")) {
            return;
        }

        renderQuiz();
        refreshQuizStats();
        document.getElementById("quizNextBtn")?.addEventListener("click", nextQuizQuestion);
    }

    function updatePlusUI() {
        const active = isPlusActive();

        document.querySelectorAll("[data-plus-status]").forEach(element => {
            element.textContent = active ? "Actief" : "Niet actief";
            element.classList.toggle("text-green", active);
        });

        document.querySelectorAll("[data-plus-activate]").forEach(button => {
            button.textContent = active ? "Open Plus Dashboard" : "Activeer demo Plus";
            button.onclick = active
                ? () => { window.location.href = "plus-dashboard.html"; }
                : activatePlus;
        });

        document.getElementById("disablePlusBtn")?.classList.toggle("hidden", !active);
        renderLessons();
    }

    function guardPlusDashboard() {
        if (document.body.dataset.page !== "plus-dashboard") {
            return;
        }

        const gate = document.getElementById("plusGate");
        const content = document.getElementById("plusDashboardContent");
        const active = isPlusActive();

        gate?.classList.toggle("hidden", active);
        content?.classList.toggle("hidden", !active);
    }

    function setupProfile() {
        const input = document.getElementById("displayNameInput");
        const saveButton = document.getElementById("saveProfileBtn");
        const displayName = localStorage.getItem(STORAGE_KEYS.displayName) || "KSite Leerling";

        document.querySelectorAll("[data-display-name]").forEach(element => {
            element.textContent = displayName;
        });

        if (input) {
            input.value = displayName;
        }

        saveButton?.addEventListener("click", () => {
            const nextName = input.value.trim().slice(0, 32) || "KSite Leerling";
            localStorage.setItem(STORAGE_KEYS.displayName, nextName);
            document.querySelectorAll("[data-display-name]").forEach(element => {
                element.textContent = nextName;
            });
            showToast("Profielnaam opgeslagen.", "success");
        });
    }

    function updateStreak() {
        const today = new Date();
        const todayKey = today.toISOString().slice(0, 10);
        const previous = localStorage.getItem(STORAGE_KEYS.lastVisit);
        let streak = readNumber(STORAGE_KEYS.streak, 0);

        if (!previous) {
            streak = 1;
        } else if (previous !== todayKey) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = yesterday.toISOString().slice(0, 10);
            streak = previous === yesterdayKey ? streak + 1 : 1;
        }

        localStorage.setItem(STORAGE_KEYS.lastVisit, todayKey);
        localStorage.setItem(STORAGE_KEYS.streak, String(streak));

        document.querySelectorAll("[data-streak]").forEach(element => {
            element.textContent = streak;
        });
    }

    function updateProfileBadges() {
        const xp = getXP();
        const lessons = getCompletedLessons().length;
        const runs = readNumber(STORAGE_KEYS.quizRuns, 0);
        const streak = readNumber(STORAGE_KEYS.streak, 0);
        const plus = isPlusActive();

        const rules = {
            starter: xp >= 10,
            learner: lessons >= 2,
            scholar: lessons >= 5,
            quizzer: runs >= 1,
            streak: streak >= 3,
            plus: plus,
            expert: xp >= 1000,
            complete: lessons >= LESSONS.length
        };

        Object.entries(rules).forEach(([badge, unlocked]) => {
            const card = document.querySelector(`[data-badge="${badge}"]`);
            if (card) {
                card.classList.toggle("locked", !unlocked);
            }
        });
    }

    function populateDashboardCharts() {
        const bars = document.querySelectorAll(".chart-bars span");
        if (bars.length === 0) {
            return;
        }

        const base = Math.max(15, Math.min(100, getLevelProgress() + 20));
        bars.forEach((bar, index) => {
            const variation = ((index * 17) % 44) - 14;
            bar.style.height = `${Math.max(12, Math.min(100, base + variation))}%`;
        });
    }

    function showToast(message, type = "default") {
        let container = document.getElementById("toastContainer");

        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            container.setAttribute("aria-live", "polite");
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        window.setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(8px)";
            window.setTimeout(() => toast.remove(), 220);
        }, 3200);
    }

    function setupButtons() {
        document.querySelectorAll("[data-plus-activate]").forEach(button => {
            button.addEventListener("click", activatePlus);
        });

        document.getElementById("disablePlusBtn")?.addEventListener("click", deactivatePlus);

        document.querySelectorAll("[data-reset-progress]").forEach(button => {
            button.addEventListener("click", () => {
                const confirmed = window.confirm("Wil je je lokale KSite-voortgang echt wissen?");
                if (!confirmed) {
                    return;
                }

                localStorage.removeItem(STORAGE_KEYS.xp);
                localStorage.removeItem(STORAGE_KEYS.completedLessons);
                localStorage.removeItem(STORAGE_KEYS.quizBest);
                localStorage.removeItem(STORAGE_KEYS.quizRuns);
                refreshProgressUI();
                updateProfileBadges();
                renderLessons();
                showToast("Voortgang is gewist.");
            });
        });
    }

    function updateDocumentMetadata() {
        const plus = isPlusActive();
        if (plus) {
            document.documentElement.dataset.plus = "true";
        }
    }

    function init() {
        applyStoredTheme();
        setupNavigation();
        setupRevealAnimations();
        setupLessonFilters();
        setupKnowledgeSearch();
        setupQuiz();
        setupProfile();
        setupButtons();
        updateStreak();
        updatePlusUI();
        guardPlusDashboard();
        refreshProgressUI();
        refreshQuizStats();
        updateProfileBadges();
        populateDashboardCharts();
        updateDocumentMetadata();
        renderLessons();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }

    window.KSite = {
        addXP,
        completeLesson,
        activatePlus,
        deactivatePlus,
        getXP,
        getLevel,
        getCompletedLessons,
        isPlusActive,
        showToast,
        lessons: LESSONS,
        questions: QUIZ_QUESTIONS
    };
})();