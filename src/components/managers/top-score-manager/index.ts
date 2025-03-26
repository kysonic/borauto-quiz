import { Font } from '@/config';
import { supabase } from '@/lib/db';
import { createHTMLFromString } from '@/lib/dom';
import { IStateUpdateEvent, StateSystem } from '@/states/type';
import { AssertType } from '@/types/common';
import { TopScoresManagerComponent } from './type';

AFRAME.registerComponent<TopScoresManagerComponent>('top-scores-manager', {
    topScoresList: null,

    stateUpdateHandler: (e: Event) => {},

    async init() {
        this.topScoresList = document.getElementById('top-scores-list');
        // Handlers
        this.stateUpdateHandler = this.stateUpdate.bind(this);
        // Events
        this.el?.sceneEl?.addEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );

        await this.getData();
    },

    async getData() {
        const { data, error } = await supabase
            .from('scores')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);

        this.el?.sceneEl?.emit('setTopScores', { topScores: data });
    },

    stateUpdate(e) {
        const customEvent = e as CustomEvent<IStateUpdateEvent>;
        const action = customEvent.detail.action;
        // Because a-frame-state cannot handle arrays
        if (action === 'setTopScores') {
            this.renderTopScores();
        }
    },

    renderTopScores() {
        if (!this.topScoresList) {
            return false;
        }
        // Clear container
        this.topScoresList.innerHTML = '';
        // Get state
        const topScores = AssertType<StateSystem>(
            this.el?.sceneEl?.systems['state'],
        ).state.topScores;
        // Render list
        for (let index in topScores) {
            const item = topScores[index];
            const y = -(index + 1) * 0.01 + 1.85;

            this.topScoresList.appendChild(
                createHTMLFromString<HTMLElement>(/*html*/ `
                        <a-entity>
                            <a-text
                                position="0.8 ${y} -0.5"
                                rotation="0 180 0"
                                align="left"
                                font="${Font}"
                                value="${item.name}"
                                width="2"
                                color="#FFF"
                            ></a-text>
                            <a-text
                                position="-0.7 ${y} -0.5"
                                rotation="0 180 0"
                                align="left"
                                font="${Font}"
                                value="${item?.score}"
                                width="2"
                                color="#FFF"
                            ></a-text>
                        </a-entity>
                    `),
            );
        }
    },
});
