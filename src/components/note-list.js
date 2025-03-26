class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.fetchNotes();
    }

    async fetchNotes() {
        this.shadowRoot.innerHTML = `<p>Loading...</p>`;

        try {
            const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
            const result = await response.json();

            this.render(result.data);
        } catch (error) {
            this.shadowRoot.innerHTML = `<p>Gagal mengambil catatan</p>`;
            console.error("Error:", error);
        }
    }

    render(notes) {
        this.shadowRoot.innerHTML = `
            <style>
                .note-list { display: flex; flex-wrap: wrap; gap: 10px; }
            </style>
            <div class="note-list">
                ${notes.map(note => `
                    <note-item data-id="${note.id}" data-title="${note.title}" data-body="${note.body}"></note-item>
                `).join("")}
            </div>
        `;
    }
}

customElements.define("note-list", NoteList);
