class LoadingIndicator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .loading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                    color: #007bff;
                    font-weight: bold;
                }
            </style>
            <div class="loading">Loading...</div>
        `;
    }
}

customElements.define("loading-indicator", LoadingIndicator);