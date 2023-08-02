import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faAdd, faList, faHeart as faFullHeart, faMinus, faEdit, faCheck, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { PopupService } from 'src/app/global-shared/components/bootstrap-modal/popup.service';
import { AddTitbitComponent } from '../add-titbit/add-titbit.component';
import { AddTitbitModule } from '../add-titbit/add-titbit.module';
import { uploadOptions } from 'src/app/global-shared/components/upload-component/upload-options.class';
import { TitbitService } from '../../services/titbit.service';
import { ITitbitResponse } from '../add-titbit/interfaces/titbit-response.interface';
import { ITitbit, ITitbitFilters } from '../add-titbit/interfaces/titbit.interface';
import { ITitbitCategoriesResponse } from '../add-titbit/interfaces/titbit-categories-response.interface';
import { ITitbitCategory } from '../add-titbit/interfaces/tibit-category.interface';
import { HubToastService } from 'src/app/global-shared/services/hub-toastr/hub-toastr.service';
import { AddTitbit } from '../add-titbit/classes/add-titbit.class';
import { ManageTitbitCategoriesComponent } from '../manage-titbit-categories/manage-titbit-categories.component';
import { ManageTitbitCategoriesModule } from '../manage-titbit-categories/manage-titbit-categories.module';
import { ITitbitCategoryChanges } from '../manage-titbit-categories/interfaces/titbit-category-changes.interface';
import { debounce, timer } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
    selector: 'titbits',
    templateUrl: 'titbits.component.html',
    styleUrls: ['titbits.component.scss']
})
export class TitbitsComponent
{
    constructor(private formBuilder: FormBuilder, private popupService: PopupService, private titbitService: TitbitService, private hubToast: HubToastService,
        private authenticationService: AuthenticationService) { }

    faArrowRight = faArrowRight;
    faAdd = faAdd;
    faList = faList
    faHeart = faHeart;
    faFullHeart = faFullHeart;
    faMinus = faMinus;
    faEdit = faEdit;
    faCheck = faCheck;
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;

    //

    titbitsFG!: FormGroup;
    viewTitbits: boolean = false;
    selectedCategory: string = '';
    titbits: ITitbit[] = [];
    titbitCategories: ITitbitCategory[] = [];
    isAdmin: boolean = false;
    isResourceCollapsed: Array<boolean> = [];

    filterOptions: ITitbitFilters = {
        isCategorized: false,
        isLiked: false,
        isSearched: false
    }

    ngOnInit()
    {
        this.titbitsFG = this.formBuilder.group({
            search: ''
        });

        this.authenticationService.getIsAdmin().subscribe({
            next: (response) =>
            {
                this.isAdmin = response.isAdmin;
            }
        });

        this.getTitbits();
        this.getTitbitCategories();

        this.titbitsFG.get('search')?.valueChanges.pipe(debounce(() => timer(500))).subscribe((searchValue) => this.search(searchValue));
    }

    //////

    getTitbits()
    {
        this.titbitService.getTitbits().subscribe({
            next: (response: ITitbitResponse) =>
            {
                this.titbits = response.titbits;
                this.isResourceCollapsed = Array(response.titbits.length).fill(true);
            }
        });
    }

    getTitbitCategories()
    {
        this.titbitService.getTitbitCategories().subscribe({
            next: (response: ITitbitCategoriesResponse) =>
            {
                this.titbitCategories = response.categories;

                let allCategories = { id: '', description: 'All' } as ITitbitCategory;
                this.titbitCategories.unshift(allCategories);
                this.selectedCategory = allCategories.id;
            }
        });
    }

    addTitbit()
    {
        let options = new uploadOptions('Add a new titbit');
        options.buttonText = 'Add';

        this.popupService.open(AddTitbitComponent, AddTitbitModule, options).then((response: AddTitbit) =>
        {
            this.titbitService.addTitbit(response).subscribe({
                next: (titbit: ITitbit) =>
                {
                    this.hubToast.success('Category Added');
                    this.titbits.unshift(titbit);
                },
                error: (error) =>
                {
                    this.hubToast.error('Failed to add titbit', error);
                }
            });
        }, () => { });
    }

    manageCategories()
    {
        let options = new uploadOptions('Manage categories');
        options.buttonText = 'Save';

        this.popupService.open(ManageTitbitCategoriesComponent, ManageTitbitCategoriesModule, options).then((categories: ITitbitCategoryChanges[]) =>
        {
            let add = categories.filter(x => x.operation === 'add');
            if (add.length)
                this.titbitService.addTitbitCategories(add).subscribe({
                    next: (categoriesResponse: ITitbitCategoriesResponse) =>
                    {
                        this.titbitCategories = this.titbitCategories.concat(categoriesResponse.categories);
                    }
                });

            let update = categories.filter(x => x.operation === 'update');
            if (update.length)
                this.titbitService.updateTitbitCategories(update).subscribe({
                    next: (categoriesResponse: ITitbitCategoriesResponse) =>
                    {
                        categoriesResponse.categories.forEach(category =>
                        {
                            let categoryToUpdate = this.titbitCategories.find(x => x.id === category.id);

                            if (categoryToUpdate)
                                categoryToUpdate.description = category.description;
                        });
                    }
                });

            let remove = categories.filter(x => x.operation === 'delete');
            if (remove.length)
                this.titbitService.deleteTitbitCategories(remove).subscribe({
                    next: () =>
                    {
                        remove.forEach((category) =>
                        {
                            let removeIndex = this.titbitCategories.findIndex(x => x.id == category.id);
                            this.titbitCategories.splice(removeIndex, 1);
                        });
                    }
                });
        }, () =>
        {
        });
    }

    onCategorySelect(categoryId: string)
    {
        if (categoryId === '')
            this.filterOptions.isCategorized = false;
        else
            this.filterOptions.isCategorized = true;

        this.selectedCategory = categoryId;

        this.titbits.forEach((titbit) =>
        {
            if (this.filterOptions.isCategorized)
                (titbit.filters ||= {} as ITitbitFilters).isCategorized = categoryId === titbit.titbitCategory.id;
            else
                (titbit.filters ||= {} as ITitbitFilters).isCategorized = false;
        });
    }

    like(titbit: ITitbit)
    {
        this.titbitService.likeTitbit(titbit.id).subscribe({
            next: _ =>
            {
                titbit.isLiked = true;
            },
            error: (error) =>
            {
                //dont show more than one at a time?
                this.hubToast.error("The titbit may have been removed. Actions limited.", error);
            }
        });
    }
    unlike(titbit: ITitbit)
    {
        this.titbitService.unlikeTitbit(titbit.id).subscribe({
            next: _ =>
            {
                titbit.isLiked = false;

                if (this.filterOptions.isLiked)
                    (titbit.filters ||= {} as ITitbitFilters).isLiked = titbit.isLiked;
            },
            error: (error) =>
            {
                this.hubToast.error("The titbit may have been removed. Actions limited.", error);
            }
        });
    }

    showFavourites()
    {
        this.filterOptions.isLiked = !this.filterOptions.isLiked;
        this.titbits.forEach(titbit =>
        {
            if (this.filterOptions.isLiked)
                (titbit.filters ||= {} as ITitbitFilters).isLiked = titbit.isLiked;
            else
                (titbit.filters ||= {} as ITitbitFilters).isLiked = false;
        });
    }

    search(searchValue: any)
    {
        if (!searchValue)
        {
            this.filterOptions.isSearched = false;
            return;
        }

        this.filterOptions.isSearched = !!searchValue.length;

        this.titbits.filter(titbit =>
        {
            if (titbit.title.toLowerCase().includes(searchValue.toLowerCase()) || titbit.description.toLowerCase().includes(searchValue.toLowerCase()))
            {
                (titbit.filters ||= {} as ITitbitFilters).isSearched = true;
                return true;
            }
            else
                (titbit.filters ||= {} as ITitbitFilters).isSearched = false;

            return false;
        });
    }

    isFiltered(titbit: ITitbit)
    {
        let isFiltered = true;

        if (this.filterOptions.isCategorized && !titbit.filters?.isCategorized)
            isFiltered = false;

        if (this.filterOptions.isLiked && !titbit.filters?.isLiked)
            isFiltered = false;

        if (this.filterOptions.isSearched && !titbit.filters?.isSearched)
            isFiltered = false;

        return isFiltered;
    }

    deleteTitbit(titbitId: string)
    {
        this.titbitService.deleteTitbit(titbitId).subscribe({
            next: _ =>
            {
            },
            error: (error) =>
            {
                this.hubToast.error("Unable to delete titbit", error);
            }
        });
    }

    editTitbit(titbit: ITitbit)
    {
        let options = new uploadOptions('Update titbit');
        options.buttonText = 'Update';
        options.data = titbit;

        this.popupService.open(AddTitbitComponent, AddTitbitModule, options).then((response: AddTitbit) =>
        {
            this.titbitService.updateTitbit(response).subscribe({
                next: (updatedTitbit: ITitbit) =>
                {
                    this.hubToast.success('Titbit updated');
                    Object.assign(titbit, updatedTitbit);
                },
                error: (error) =>
                {
                    this.hubToast.error('Failed to update titbit', error);
                }
            });
        }, () => { });
    }
}