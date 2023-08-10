import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputValidator } from 'src/app/global-shared/validators/empty-input.validator';
import { ManageTitbit } from './classes/manage-titbit.class';
import { TitbitService } from '../../services/titbit.service';
import { ITitbitCategoriesResponse } from './interfaces/titbit-categories-response.interface';
import { ITitbitCategory } from './interfaces/tibit-category.interface';
import { faList, faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { TitbitLink } from './classes/titbit-link.class';

@Component({
    selector: 'manage-titbit',
    templateUrl: 'manage-titbit.component.html',
    styleUrls: ['manage-titbit.component.scss']
})
export class ManageTitbitComponent
{
    constructor(private formBuilder: FormBuilder, private titbitService: TitbitService) { }

    faList = faList;
    faAdd = faAdd;
    faMinus = faMinus;

    //

    @Input() options: any;

    addTitbitFG!: FormGroup;
    categories: ITitbitCategory[] = [];
    selectedCategory!: ITitbitCategory;
    addTitbitSubmitted: boolean = false;

    ngOnInit()
    {
        this.titbitService.getTitbitCategories().subscribe({
            next: (response: ITitbitCategoriesResponse) =>
            {
                this.categories = response.categories;
            }
        });

        this.addTitbitFG = this.formBuilder.group({
            title: [this.options.data.title, [Validators.required, InputValidator.whiteSpace]],
            description: [this.options.data.description, [Validators.required, InputValidator.whiteSpace]],
            links: this.formBuilder.array([])
        });

        if (this.options.data.id)
        {
            this.selectedCategory = this.options.data.titbitCategory;

            this.options.data.titbitLinks.forEach((link: TitbitLink) =>
            {
                this.addExistingLink(link);
            });
        }
    }

    //////

    get linkForms() { return this.addTitbitFG.controls["links"] as FormArray; }

    getFormGroup(control: AbstractControl) { return control as FormGroup; }

    addExistingLink(link: TitbitLink)
    {
        const linkForm = this.formBuilder.group({
            id: link.id,
            title: [link.title, Validators.required],
            link: [link.link, Validators.required]
        });

        this.linkForms.push(linkForm);
    }

    addLink()
    {
        const linkForm = this.formBuilder.group({
            title: ['', Validators.required],
            link: ['', Validators.required]
        });

        this.linkForms.push(linkForm);
    }

    deleteLink(linkIndex: number)
    {
        this.linkForms.removeAt(linkIndex);
    }

    onClose = () =>
    {
        return new Promise((resolve, reject) =>
        {
            this.addTitbitSubmitted = true;

            if (!this.addTitbitFG.valid || !this.selectedCategory)
                return reject();

            let titbitLinks: TitbitLink[] = [];

            this.linkForms.controls.forEach(group =>
            {
                titbitLinks.push(new TitbitLink(group.get('id')?.value, group.get('title')?.value, group.get('link')?.value));
            });

            resolve(new ManageTitbit(this.options.data.id, this.addTitbitFG.get('title')?.value, titbitLinks, this.addTitbitFG.get('description')?.value, this.selectedCategory?.id));
        });
    }
}