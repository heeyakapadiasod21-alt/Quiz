/* ============================================================
   Quiz.js  —  Core Logic for BrainZap Quiz
   This file manages the state, transitions, and dynamic 
   content rendering for the application.
   ============================================================ */

/**
 * Quiz Data Array
 * Each object represents one question with its difficulty,
 * options, answer index, and feedback content.
 */
const quizData = [
    {
        q: "Which planet in our solar system has the most moons?",
        diff: "easy",
        responses: ["Jupiter", "Saturn", "Neptune", "Uranus"],
        answerIndex: 1,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> Saturn has <strong>146 confirmed moons</strong> as of 2024! Its moon Titan even has lakes — but filled with liquid methane, not water.",
        wrong_emoji: "💪",
        wrong_fact: "The correct answer is <strong>Saturn</strong>. It just overtook Jupiter with 146 moons! Saturn's moon Titan has a thick atmosphere and lakes of liquid methane.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/800px-Saturn_during_Equinox.jpg"
    },
    {
        q: "What is the only number that is both even and prime?",
        diff: "easy",
        responses: ["1", "2", "4", "0"],
        answerIndex: 1,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> 2 is the only even prime number. Every other even number is divisible by 2, disqualifying them from primality. It's also the smallest prime!",
        wrong_emoji: "💪",
        wrong_fact: "The answer is <strong>2</strong>! It's the only even prime because all other even numbers are divisible by 2 — making 2 uniquely special in mathematics.",
        img: ""
    },
    {
        q: "How long does it take light from the Sun to reach Earth?",
        diff: "medium",
        responses: ["About 1 minute", "About 8 minutes", "About 30 minutes", "About 1 second"],
        answerIndex: 1,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> Sunlight takes ~8 minutes 20 seconds to reach us. When you look at the Sun, you're seeing it as it was 8 minutes ago — you're literally watching the past!",
        wrong_emoji: "💪",
        wrong_fact: "The correct answer is <strong>~8 minutes</strong>. Sunlight travels 150 million km at 300,000 km/s. When stargazing, you're always seeing the past!",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/800px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg"
    },
    {
        q: "Which language has the most native speakers in the world?",
        diff: "easy",
        responses: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
        answerIndex: 2,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> Mandarin has over <strong>900 million native speakers</strong>! Chinese writing has 50,000+ characters, though you only need ~2,000 for daily use.",
        wrong_emoji: "💪",
        wrong_fact: "The answer is <strong>Mandarin Chinese</strong>, with ~900M native speakers. English is actually 3rd — Spanish comes in 2nd! Surprised?",
        img: ""
    },
    {
        q: "What is the Fermi Paradox about?",
        diff: "hard",
        responses: [
            "Why nuclear energy is efficient",
            "The contradiction between the likelihood of alien life and no contact with it",
            "A paradox in quantum entanglement theory",
            "Why certain chemical reactions seem to reverse time"
        ],
        answerIndex: 1,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> Enrico Fermi asked: 'Where is everybody?' Given billions of stars, statistically life should be everywhere — yet silence. The 'Great Filter' theory suggests something eliminates civilizations before contact.",
        wrong_emoji: "💪",
        wrong_fact: "The Fermi Paradox questions why, with billions of potentially habitable planets, we've had zero confirmed alien contact. One of science's biggest mysteries!",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Arecibo_message.svg/400px-Arecibo_message.svg.png"
    },
    {
        q: "A banana is botanically classified as a…",
        diff: "medium",
        responses: ["Vegetable", "Nut", "Berry", "Legume"],
        answerIndex: 2,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> Botanically, bananas are berries! Meanwhile, strawberries are NOT berries. Avocados and watermelons are berries too. Nature is chaotic.",
        wrong_emoji: "💪",
        wrong_fact: "Bananas are botanically <strong>berries</strong>! A botanical berry is a fleshy fruit from a single flower. Strawberries, raspberries? Not berries. Mind = blown. 🤯",
        img: ""
    },
    {
        q: "What percentage of the ocean has been explored by humans?",
        diff: "hard",
        responses: ["About 20%", "About 50%", "About 80%", "Less than 25%"],
        answerIndex: 3,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> Only ~20% of Earth's oceans have been mapped in high-resolution. The deepest point, Challenger Deep, is <strong>11km deep</strong> — deeper than Everest is tall. More people have been to space!",
        wrong_emoji: "💪",
        wrong_fact: "Less than <strong>25%</strong> of the ocean has been explored! The deep sea is more mysterious than outer space. Giant squid weren't photographed alive until 2004!",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sonar_image_of_the_Challenger_Deep.jpg/800px-Sonar_image_of_the_Challenger_Deep.jpg"
    },
    {
        q: "Which of these is NOT one of the four fundamental forces of nature?",
        diff: "hard",
        responses: ["Gravity", "Electromagnetism", "Centripetal Force", "Strong Nuclear Force"],
        answerIndex: 2,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> The four fundamental forces are Gravity, Electromagnetism, Strong Nuclear, and Weak Nuclear. Centripetal force is just the net force keeping objects in circular motion.",
        wrong_emoji: "💪",
        wrong_fact: "<strong>Centripetal Force</strong> is not fundamental — it's a name for net inward force in circular motion. The real four: Gravity, Electromagnetism, Strong & Weak Nuclear forces.",
        img: ""
    },
    {
        q: "In which year was the World Wide Web invented?",
        diff: "medium",
        responses: ["1983", "1989", "1995", "1991"],
        answerIndex: 1,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> Tim Berners-Lee proposed the Web in <strong>1989</strong> at CERN — just to help scientists share documents. The first website ever is still online at info.cern.ch",
        wrong_emoji: "💪",
        wrong_fact: "The Web was invented in <strong>1989</strong> by Tim Berners-Lee. The internet existed before, but HTML, URLs, and browsers — that was his gift at CERN.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/First_Web_Server.jpg/800px-First_Web_Server.jpg"
    },
    {
        q: "What does DNA stand for?",
        diff: "easy",
        responses: [
            "Deoxyribonucleic Acid",
            "Dynamic Nitrogen Array",
            "Directional Nucleotide Allele",
            "Dual Nitrogenase Activator"
        ],
        answerIndex: 0,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> If you uncoiled all the DNA in one human cell, it would stretch <strong>2 meters</strong>! All your body's DNA laid end-to-end would reach the Sun and back ~300 times.",
        wrong_emoji: "💪",
        wrong_fact: "DNA = <strong>Deoxyribonucleic Acid</strong>! Every cell in your body contains about 2 meters of it, tightly coiled. You're basically a walking library of code.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/DNA_orbit_animated.gif/200px-DNA_orbit_animated.gif"
    },
    {
        q: "What does RNA stand for?",
        diff: "easy",
        responses: [
            "Deoxyribonucleic Acid",
            "Ribonucleic Acid",
            "Random Nucleotide Acid",
            "Dual Nitrogenous Acid"
        ],
        answerIndex: 1,
        correct_emoji: "🎉",
        correct_title: "Brilliant answer!",
        correct_fact: "<strong>Fun fact:</strong> If you uncoiled all the DNA in one human cell, it would stretch <strong>2 meters</strong>! All your body's DNA laid end-to-end would reach the Sun and back ~300 times.",
        wrong_emoji: "💪",
        wrong_fact: "DNA = <strong>Deoxyribonucleic Acid</strong>! Every cell in your body contains about 2 meters of it, tightly coiled. You're basically a walking library of code.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/DNA_orbit_animated.gif/200px-DNA_orbit_animated.gif"
    }
];

// ── GLOBAL STATE VARIABLES ───────────────────────────────────
let currentIndex = 0;   // Index of the current question being viewed
let score = 0;          // Running total of correct answers
let results = [];       // Log of user responses for the final summary

// ── DOM ELEMENT REFERENCES ───────────────────────────────────
const myTextElement = document.getElementById("question-text");
const myOptionsArea = document.getElementById("options-area");
const myNextButton = document.getElementById("next-button");

/**
 * Transition from Splash Screen to Quiz Screen
 */
function startQuiz() {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    buildDots();    // Initialise the progress markers
    showQuestion(); // Render the first question
}

/**
 * Creates the progress dot markers based on quizData length
 */
function buildDots() {
    const c = document.getElementById('progress-dots');
    c.innerHTML = '';
    quizData.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.id = `dot-${i}`;
        c.appendChild(d);
    });
}

/**
 * Updates the width of the horizontal progress bar
 */
function updateProgress() {
    const pct = ((currentIndex) / quizData.length) * 100;
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = pct + '%';
}

/**
 * Updates the visual state of the progress dots
 */
function updateDots(idx, correct) {
    document.getElementById(`dot-${idx}`).className = 'dot ' + (correct ? 'done-correct' : 'done-wrong');
    if (idx + 1 < quizData.length) {
        document.getElementById(`dot-${idx + 1}`).className = 'dot active';
    }
}

/**
 * Renders the current question and its options to the DOM
 */
function showQuestion() {
    const q = quizData[currentIndex];

    // Reset scroll position to the top for the new question
    const quizScreen = document.getElementById('quiz-screen');
    if (quizScreen) quizScreen.scrollTo(0, 0);

    updateProgress();

    // Update headers and badges
    document.getElementById('q-label').textContent = `Question ${currentIndex + 1} of ${quizData.length}`;
    document.getElementById('score-display').textContent = score;
    document.getElementById('q-num-badge').textContent = String(currentIndex + 1).padStart(2, '0') + ' / ' + quizData.length;

    // Set difficulty tag text and colour class
    const dt = document.getElementById('diff-tag');
    dt.textContent = q.diff.charAt(0).toUpperCase() + q.diff.slice(1);
    dt.className = 'difficulty-tag diff-' + q.diff;

    myTextElement.innerText = q.q;

    // Clear and build options list
    myOptionsArea.innerHTML = '';
    ['A', 'B', 'C', 'D'].forEach((l, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.innerHTML = `<div class="opt-letter">${l}</div><div class="opt-text">${q.responses[i]}</div>`;
        btn.onclick = () => selectAnswer(i);
        myOptionsArea.appendChild(btn);
    });

    // Reset UI components for the new question
    document.getElementById('feedback-panel').className = 'feedback-panel';
    myNextButton.classList.remove('show');
    document.getElementById('fb-img').style.display = 'none';

    // Trigger re-entry animation for the card
    const box = document.getElementById('quiz-box');
    box.style.animation = 'none';
    requestAnimationFrame(() => { box.style.animation = 'cardIn 0.45s cubic-bezier(0.22,1,0.36,1) both'; });
}

/**
 * Handles user interaction when an answer is selected
 * @param {number} chosen - The index of the selected option
 */
function selectAnswer(chosen) {
    const q = quizData[currentIndex];
    const buttons = document.querySelectorAll('.opt-btn');

    // Disable all options once a choice is made
    buttons.forEach(b => b.disabled = true);

    const isCorrect = chosen === q.answerIndex;
    if (isCorrect) score++;

    // Add visual feedback classes to buttons
    buttons[chosen].classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) buttons[q.answerIndex].classList.add('reveal-correct');

    // Populate and show the feedback panel
    const fp = document.getElementById('feedback-panel');
    fp.className = 'feedback-panel show ' + (isCorrect ? 'feedback-correct' : 'feedback-wrong');
    document.getElementById('fb-emoji').textContent = isCorrect ? q.correct_emoji : q.wrong_emoji;
    document.getElementById('fb-title').textContent = isCorrect ? q.correct_title : 'Keep going!';
    document.getElementById('fb-fact').innerHTML = isCorrect ? q.correct_fact : q.wrong_fact;

    // Display image if available
    const imgEl = document.getElementById('fb-img');
    if (q.img) { imgEl.src = q.img; imgEl.style.display = 'block'; }
    else imgEl.style.display = 'none';

    // Show navigation button
    myNextButton.classList.add('show');
    document.getElementById('score-display').textContent = score;

    // Log result and update progress dots
    results.push({ q: q.q, correct: isCorrect, correctAnswer: q.responses[q.answerIndex] });
    updateDots(currentIndex, isCorrect);

    // Smoothly scroll to reveal feedback if content is long
    setTimeout(() => {
        const screen = document.getElementById('quiz-screen');
        screen.scrollTo({
            top: screen.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}

/**
 * Logic to move to the next question or show the results
 */
function goToNext() {
    currentIndex++;
    if (currentIndex < quizData.length) showQuestion();
    else showResults();
}

/**
 * Transition to the final Results Screen
 */
function showResults() {
    document.getElementById('quiz-screen').style.display = 'none';
    const rs = document.getElementById('result-screen');
    rs.style.display = 'flex';

    // Calculate score percentage
    const pct = Math.round((score / quizData.length) * 100);

    // Update the conic-gradient ring via CSS variable
    document.getElementById('result-ring').style.setProperty('--pct', pct);
    document.getElementById('result-score-inner').textContent = `${score}/${quizData.length}`;

    // Update numerical breakdown
    document.getElementById('rb-correct').textContent = score;
    document.getElementById('rb-wrong').textContent = quizData.length - score;

    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = '100%';

    // Static text update
    document.getElementById('result-grade').textContent = 'Congratulations!! 🥳';
    document.getElementById('result-msg').innerHTML = "Hey, you learned some cool facts today<br>Here's your result";

    // Launch celebration if score is high enough
    if (pct >= 60) launchConfetti();
}

/**
 * Resets the application state to restart the quiz
 */
function replay() {
    currentIndex = 0; score = 0; results = [];
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    buildDots();
    showQuestion();
}

/**
 * Renders a particle-based confetti effect on the canvas
 */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;

    const colors = ['#e8490f', '#f97316', '#eab308', '#16a34a', '#2563d4', '#ec4899'];

    // Create piece objects
    const pieces = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width, y: -20 - Math.random() * 180,
        w: 7 + Math.random() * 9, h: 4 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 7,
        vx: (Math.random() - 0.5) * 3.5, vy: 2 + Math.random() * 4.5
    }));

    let f = 0; // frame counter
    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color; ctx.globalAlpha = 0.85;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            // Apply physics: gravity and velocity
            p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.1;
        });

        // Loop for ~210 frames then clear
        if (++f < 210) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    })();
}
