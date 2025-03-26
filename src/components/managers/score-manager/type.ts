import { AInputComponent } from '@/components/a-components/a-input/type';
import { PostgrestError } from '@supabase/supabase-js';
import type { Entity } from 'aframe';

export interface ScoreManagerComponent {
    isSending: boolean;
    nameInputDom: HTMLInputElement | null;
    nameErrorDom: HTMLElement | null;
    saveButtonDom: HTMLElement | null;
    nameErrorVr: Entity | null;
    nameInputVr: Entity<{
        'a-input': AInputComponent;
    }> | null;
    sendScoreButtonVr: Entity | null;

    // Handlers
    changeNameDomHandler: (e: Event) => void;
    submitScoreDomHandler: (e: MouseEvent) => void;
    submitScoreVrHandler: () => void;
    changeNameVrHandler: (e: Event) => void;
    // Methods
    bindVr: () => void;
    bindDom: () => void;
    changeNameDom: (e: Event) => void;
    submitScoreDom: (e: MouseEvent) => void;
    submitScoreVr: () => void;
    changeNameVr: (e: Event) => void;
    unbindVR: () => void;
    unbindDom: () => void;
    hasError: () => boolean;
    saveDom: () => void;
    saveVr: () => void;
    savedDom: () => void;
    savedVr: () => void;
    saveToDatabase: (name: string) => Promise<PostgrestError | null>;
    saveScoresHandler: (e: MouseEvent) => void;
    domError: (message: string) => void;
    vrError: (message: string) => void;
}
