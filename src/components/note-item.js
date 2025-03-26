class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector("button").addEventListener("click", this.deleteNote.bind(this));
    }

    async deleteNote() {
        const noteId = this.getAttribute("data-id");

        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Catatan berhasil dihapus!");
            document.querySelector("note-list").fetchNotes();
        } else {
            alert("Gagal menghapus catatan!");
        }
    }

    render() {
        const title = this.getAttribute("data-title");
        const body = this.getAttribute("data-body");

        this.shadowRoot.innerHTML = `
            <style>
                .note { padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
                button { background-color: red; color: white; border: none; padding: 5px; cursor: pointer; }
            </style>
            <div class="note">
                <h3>${title}</h3>
                <p>${body}</p>
                <button>Hapus</button>
            </div>
        `;
    }
}

customElements.define("note-item", NoteItem);
