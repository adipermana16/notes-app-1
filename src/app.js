import "./styles.css";
import "./components/loading-indicator";
import "./components/note-form";
import "./components/note-list";
import "./components/note-item";
document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(document.createElement("note-list"));
});