import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TitbitService } from '../../services/titbit.service';
import { faList, faAdd, faMinus, faUndo } from '@fortawesome/free-solid-svg-icons';
import { ITitbitCategory } from '../add-titbit/interfaces/tibit-category.interface';
import { ITitbitCategoriesResponse } from '../add-titbit/interfaces/titbit-categories-response.interface';
import { ITitbitCategoryChanges } from './interfaces/titbit-category-changes.interface';

@Component({
    selector: 'manage-titbit-categories',
    templateUrl: 'manage-titbit-categories.component.html',
    styleUrls: ['manage-titbit-categories.component.scss']
})
export class ManageTitbitCategoriesComponent
{
    constructor(private formBuilder: FormBuilder, private titbitService: TitbitService) { }

    faList = faList;
    faAdd = faAdd;
    faMinus = faMinus;
    faUndo = faUndo;

    //

    @Input() options: any;

    manageTitbitCategoryFG!: FormGroup;
    categories: ITitbitCategory[] = [];
    selectedCategory!: ITitbitCategory;
    manageTitbitCategoriesSubmitted: boolean = false;
    deletedCategories: Map<number, number> = new Map<number, number>();

    ngOnInit()
    {
        this.manageTitbitCategoryFG = this.formBuilder.group({
            categories: this.formBuilder.array([])
        });

        this.titbitService.getTitbitCategories().subscribe({
            next: (response: ITitbitCategoriesResponse) =>
            {
                this.categories = response.categories;

                this.categories.forEach((category) =>
                {
                    this.addCategory(category.description);
                });
            }
        });
    }

    //////

    get categoryForms() { return this.manageTitbitCategoryFG.controls["categories"] as FormArray; }
    getFormGroup(control: AbstractControl) { return control as FormGroup; }
    getFormControl(control: AbstractControl | null) { return control as FormControl; }

    deleteCategory(index: number)
    {
        this.deletedCategories.set(index, index);
        this.categoryForms.at(index).get('description')?.disable();
    }

    restoreDeletedCategory(index: number)
    {
        this.deletedCategories.delete(index);
        this.categoryForms.at(index).get('description')?.enable();
    }

    restoreUpdatedCategory(index: number)
    {
        this.categoryForms.at(index).get('description')?.setValue(this.getFormControl(this.categoryForms.at(index).get('description')).defaultValue);
    }

    isDeleted(index: number)
    {
        return this.deletedCategories.get(index) != undefined;
    }

    isUpdated(control: FormControl)
    {
        return control.defaultValue !== '' && control.defaultValue != control.value;
    }

    isAdded(control: FormControl)
    {
        return control.defaultValue === '';
    }

    addCategory(description: string = '')
    {
        const categoryForm = this.formBuilder.nonNullable.group({
            description: [description, Validators.required]
        });

        this.categoryForms.push(categoryForm);
    }

    onClose = () =>
    {
        return new Promise((resolve, reject) =>
        {
            this.manageTitbitCategoriesSubmitted = true;

            if (!this.manageTitbitCategoryFG.valid)
                return reject();

            let titbitCategories: ITitbitCategoryChanges[] = [];

            this.checkDeleted(titbitCategories);
            this.checkAddOrUpdate(titbitCategories);

            resolve(titbitCategories);
        });
    }

    checkDeleted(titbitCategories: ITitbitCategoryChanges[])
    {
        if (this.deletedCategories.size)
        {
            for (let i = this.categoryForms.controls.length - 1; i >= 0; i--)
            {
                if (this.categories[i]?.id && this.deletedCategories.get(i))
                    titbitCategories.push({ id: this.categories[i]?.id, operation: 'delete' } as ITitbitCategoryChanges);

                else if (this.deletedCategories.get(i))
                    this.categoryForms.removeAt(i);
            }
        }
    }

    checkAddOrUpdate(titbitCategories: ITitbitCategoryChanges[])
    {
        for (let i = 0; i < this.categoryForms.controls.length; i++)
        {
            let control = this.categoryForms.controls.at(i)?.get('description') as FormControl;

            if (this.isAdded(control))
                titbitCategories.push({ id: '', description: control.value, operation: 'add' } as ITitbitCategoryChanges);

            else if (this.isUpdated(control))
                titbitCategories.push({ id: this.categories[i]?.id, description: control.value, operation: 'update' } as ITitbitCategoryChanges);
        }
    }
}