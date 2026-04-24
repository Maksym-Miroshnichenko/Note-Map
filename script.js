document.addEventListener('DOMContentLoaded', () => {

    const notes = document.querySelectorAll('.note');
    const allNotesButtons = document.querySelectorAll('.buttons-all-notes');
    const clearBtn = document.querySelector('.clear');
    const gammaNotes = document.querySelectorAll('.gamma-notes');

const gammaMap = {
    "C/Am": ["C", "D", "E", "F", "G", "A", "B"],
    "G/Em": ["G", "A", "B", "C", "D", "E", "F-sh"],
    "D/Bm": ["D", "E", "F-sh", "G", "A", "B", "C-sh"],
    "A/F#m": ["A", "B", "C-sh", "D", "E", "F-sh", "G-sh"],
    "E/C#m": ["E", "F-sh", "G-sh", "A", "B", "C-sh", "D-sh"],
    "B/G#m": ["B", "C-sh", "D-sh", "E", "F-sh", "G-sh", "A-sh"],
    "F#/D#m": ["F-sh", "G-sh", "A-sh", "B", "C-sh", "D-sh", "F"],
    "C#/A#m": ["C-sh", "D-sh", "F", "F-sh", "G-sh", "A-sh", "C"],
    "G#/Fm": ["G-sh", "A-sh", "C", "C-sh", "D-sh", "F", "G"],
    "D#/Cm": ["D-sh", "F", "G", "G-sh", "A-sh", "C", "D"],
    "A#/Gm": ["A-sh", "C", "D", "D-sh", "F", "G", "A"],
    "F/Dm": ["F", "G", "A", "A-sh", "C", "D", "E"]
};

    function updateAllButtons() {

        allNotesButtons.forEach(button => {

            const allClass = [...button.classList].find(c => c.startsWith('all-'));

            if (!allClass) return; //

            const noteClass = allClass.replace('all-', '');

            const relatedNotes = [...notes].filter(note =>
                note.classList.contains(noteClass)
            );

            const allActive = relatedNotes.length > 0 &&
                relatedNotes.every(note => note.classList.contains('active'));

            button.classList.toggle('active', allActive);
        });
    }

    notes.forEach(note => {
        note.addEventListener('click', () => {
            note.classList.toggle('active');
            gammaNotes.forEach(btn => btn.classList.remove('active'));
            updateAllButtons();
        });
    });

    allNotesButtons.forEach(button => {
        button.addEventListener('click', () => {

            const allClass = [...button.classList].find(c => c.startsWith('all-'));

            if (!allClass) return;

            const noteClass = allClass.replace('all-', '');
            const isActive = button.classList.contains('active');

            notes.forEach(note => {
                if (note.classList.contains(noteClass)) {
                    note.classList.toggle('active', !isActive);
                }
            });

            gammaNotes.forEach(btn => btn.classList.remove('active'));
            updateAllButtons();
        });
    });

    gammaNotes.forEach(button => {
        button.addEventListener('click', () => {

            const isActive = button.classList.contains('active');

            gammaNotes.forEach(btn => btn.classList.remove('active'));
            notes.forEach(note => note.classList.remove('active'));

            if (isActive) {
                updateAllButtons();
                return;
            }

            button.classList.add('active');

            const gamma = button.textContent.trim();
            const scaleNotes = gammaMap[gamma];

            if (!scaleNotes) return;

            notes.forEach(note => {
                if (scaleNotes.some(n => note.classList.contains(n))) {
                    note.classList.add('active');
                }
            });

            updateAllButtons();
        });
    });

    clearBtn.addEventListener('click', () => {
        notes.forEach(note => note.classList.remove('active'));
        allNotesButtons.forEach(btn => btn.classList.remove('active'));
        gammaNotes.forEach(btn => btn.classList.remove('active'));
    });

});