import { pages } from '../config';

export const domUi = {
    current: 'start',
    pages: Object.values(pages),
    nodes: {},

    init() {
        for (let id of this.pages) {
            const node = document.getElementById(`${id}-dom`);

            if (!node) {
                continue;
            }

            this.nodes[id] = node;
        }
    },

    hideAll() {
        Object.values(this.nodes).forEach(this.hideNode);
    },

    changeScreen(id: string) {
        this.current = id;
        this.hideAll();
        this.showNode(this.nodes[id]);
    },

    hideNode(node: HTMLElement) {
        node.style.display = 'none';
    },

    showNode(node: HTMLElement) {
        node.style.display = 'flex';
    },

    emit(event, payload) {
        document
            .getElementById('scene')
            .dispatchEvent(new CustomEvent(event, { detail: payload }));
    },
};

window.addEventListener('DOMContentLoaded', domUi.init.bind(domUi));
window.domUi = domUi;
