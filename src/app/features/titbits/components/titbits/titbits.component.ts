import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faAdd, faList, faHeart as faFullHeart, faX, faEdit, faCheck, faCaretRight, faCaretDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PopupService } from 'src/app/global-shared/components/bootstrap-modal/popup.service';
import { uploadOptions } from 'src/app/global-shared/components/upload-component/upload-options.class';
import { TitbitService } from '../../services/titbit.service';
import { HubToastService } from 'src/app/global-shared/services/hub-toastr/hub-toastr.service';
import { ManageTitbitCategoriesComponent } from '../manage-titbit-categories/manage-titbit-categories.component';
import { ManageTitbitCategoriesModule } from '../manage-titbit-categories/manage-titbit-categories.module';
import { ITitbitCategoryChanges } from '../manage-titbit-categories/interfaces/titbit-category-changes.interface';
import { debounce, timer } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ITitbit, ITitbitFilters } from '../manage-titbit/interfaces/titbit.interface';
import { ITitbitCategory } from '../manage-titbit/interfaces/tibit-category.interface';
import { ITitbitResponse } from '../manage-titbit/interfaces/titbit-response.interface';
import { ITitbitCategoriesResponse } from '../manage-titbit/interfaces/titbit-categories-response.interface';
import { ManageTitbitComponent } from '../manage-titbit/manage-titbit.component';
import { ManageTitbitModule } from '../manage-titbit/manage-titbit.module';
import { ManageTitbit } from '../manage-titbit/classes/manage-titbit.class';

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
    faX = faX;
    faEdit = faEdit;
    faCheck = faCheck;
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;
    faInfoCircle = faInfoCircle;

    //

    titbitsFG!: FormGroup;
    viewTitbits: boolean = false;
    selectedCategory: string = '';
    titbits: ITitbit[] = [];
    titbitCategories: ITitbitCategory[] = [];
    isAdmin: boolean = false;
    showCategories: boolean = false;
    showTitbitsLoading: boolean = false;
    titbitsLoaded: boolean = false;
    isResourceCollapsed: Array<boolean> = [];

    filterOptions: ITitbitFilters = {
        isCategorized: false,
        isLiked: false,
        isSearched: false
    };

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

        this.getTitbitCategories();
        this.getTitbits();

        this.titbitsFG.get('search')?.valueChanges.pipe(debounce(() => timer(500))).subscribe((searchValue) => this.search(searchValue));
    }

    //////

    getTitbits()
    {
        let timeout = setTimeout(() => this.showTitbitsLoading = true, 180);

        this.titbitService.getTitbits().subscribe({
            next: (response: ITitbitResponse) =>
            {
                clearTimeout(timeout);
                this.showTitbitsLoading = false;
                this.titbitsLoaded = true;

                this.titbits = response.titbits;
                this.isResourceCollapsed = Array(response.titbits.length).fill(true);
            }
        });
    }

    getTitbitCategories()
    {
        let timeout = setTimeout(() => this.showCategories = true, 180);

        this.titbitService.getTitbitCategories().subscribe({
            next: (response: ITitbitCategoriesResponse) =>
            {
                clearTimeout(timeout);
                this.showCategories = true;

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

        this.popupService.open(ManageTitbitComponent, ManageTitbitModule, options).then((response: ManageTitbit) =>
        {
            this.titbitService.addTitbit(response).subscribe({
                next: (titbit: ITitbit) =>
                {
                    this.hubToast.success('Titbit Added');
                    this.titbits.unshift(titbit);
                    this.isResourceCollapsed.unshift(true);
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

            this.hubToast.success('Category changes saved');
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

    deleteTitbit(titbitId: string, titbitIndex: number)
    {
        this.titbitService.deleteTitbit(titbitId).subscribe({
            next: _ =>
            {
                this.titbits.splice(titbitIndex, 1);
                this.hubToast.success('Titbit deleted');
                this.isResourceCollapsed.splice(titbitIndex, 1);
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

        this.popupService.open(ManageTitbitComponent, ManageTitbitModule, options).then((response: ManageTitbit) =>
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