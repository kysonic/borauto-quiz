import { supabase } from '../lib/db';

AFRAME.registerComponent('top-scores-manager', {
    async init() {
        const { data, error } = await supabase
            .from('scores')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);

        this.el.sceneEl.emit('setTopScores', { topScores: data });
    },
});
