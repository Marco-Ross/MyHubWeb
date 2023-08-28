import { PopupPickerController, createPopup } from '@picmo/popup-picker';
import { AbstractControl } from '@angular/forms';

export class EmojiPickerService
{
    constructor() { }

    private picker!: PopupPickerController;
    private setEmoji!: (event: any) => void;


    openPicker(emoji: HTMLElement, inputElement: HTMLInputElement, control: AbstractControl)
    {
        if (this.picker && this.picker.isOpen)
        {
            this.picker.close();
            return;
        }

        if (this.picker)
            this.picker.removeEventListener('emoji:select', this.setEmoji);

        this.setEmoji = (event: any) =>
        {
            let selection = inputElement.selectionStart === inputElement.selectionEnd ? inputElement.selectionStart : inputElement.selectionEnd;

            let end = control?.value.slice(selection);
            let updatedText = control?.value.slice(0, inputElement.selectionStart) + event.emoji + end;

            control.setValue(updatedText);

            if (!inputElement.selectionStart)
                return;

            let focusSelect = inputElement.selectionStart - end.length;
            inputElement.focus();
            inputElement.setSelectionRange(focusSelect, focusSelect);

        };

        if (!this.picker)
            this.picker = createPopup(
                {
                    emojiSize: '1.2rem',
                    emojisPerRow: 13,
                    className: 'emoji-picker'
                },
                {
                    triggerElement: emoji,
                    referenceElement: emoji,
                    position: 'bottom-start',
                    hideOnEmojiSelect: false
                }
            );
        else
        {
            this.picker.referenceElement = emoji;
            this.picker.triggerElement = emoji;
            this.picker.options.position = 'bottom-start';
        }

        this.picker.addEventListener('emoji:select', this.setEmoji);

        this.picker.open();
    }
}