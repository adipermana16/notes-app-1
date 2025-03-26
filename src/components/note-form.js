class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector("form").addEventListener("submit", this.submitForm.bind(this));
    }

    async submitForm(event) {
        event.preventDefault();
        const title = this.shadowRoot.querySelector("#title").value;
        const body = this.shadowRoot.querySelector("#body").value;

        if (!title || !body) {
            alert("Judul dan isi catatan harus diisi!");
            return;
        }

        const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });

        if (response.ok) {
            alert("Catatan berhasil ditambahkan!");
            document.querySelector("note-list").fetchNotes();
            this.shadowRoot.querySelector("form").reset();
        } else {
            alert("Gagal menambahkan catatan!");
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
            </style>
            <form>
                <input id="title" type="text" placeholder="Judul Catatan" required />
                <textarea id="body" placeholder="Isi Catatan" required></textarea>
                <button type="submit">Tambah Catatan</button>
            </form>
        `;
    }
}

customElements.define("note-form", NoteForm);
