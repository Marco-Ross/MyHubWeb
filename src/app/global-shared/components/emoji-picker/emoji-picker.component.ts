import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { faGrinAlt } from '@fortawesome/free-solid-svg-icons';
import { EmojiPickerService } from './emoji-picker.service';

@Component({
    selector: 'emoji-picker',
    templateUrl: 'emoji-picker.component.html',
    styleUrls: ['emoji-picker.component.scss']
})
export class EmojiPickerComponent
{
    constructor(private emojiPickerService: EmojiPickerService) { }

    faGrinAlt = faGrinAlt;

    //

    @Input() control: AbstractControl | null = null;
    @Input() inputElement!: HTMLInputElement;

    ngOnInit()
    {
    }

    //////

    openPicker(emoji: HTMLElement)
    {
        if (!this.control)
            return;

        this.emojiPickerService.openPicker(emoji, this.inputElement, this.control);
    }
}