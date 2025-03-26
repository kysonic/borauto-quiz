export interface TopScoresManagerComponent {
    topScoresList: HTMLElement | null;
    // Handlers
    stateUpdateHandler: (e: Event) => void;
    // Methods
    stateUpdate: (e: Event) => void;
    getData: () => void;
    renderTopScores: () => void;
}
