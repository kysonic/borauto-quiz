AFRAME.registerState({
    initialState: {
        score: 1,
    },

    handlers: {
        decreaseScore: function (state, action) {
            state.score -= action.points;
        },

        increaseScore: function (state, action) {
            state.score += action.points;
        },
    },
});
