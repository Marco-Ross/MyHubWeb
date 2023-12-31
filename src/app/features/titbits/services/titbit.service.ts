import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManageTitbit } from '../components/manage-titbit/classes/manage-titbit.class';
import { ITitbit } from '../components/manage-titbit/interfaces/titbit.interface';
import { ITitbitResponse } from '../components/manage-titbit/interfaces/titbit-response.interface';
import { ITitbitCategory } from '../components/manage-titbit/interfaces/tibit-category.interface';
import { ITitbitCategoriesResponse } from '../components/manage-titbit/interfaces/titbit-categories-response.interface';

@Injectable()
export class TitbitService
{
    private readonly ApiController: string = 'Titbits';

    constructor(private http: HttpClient) { }

    addTitbit(titbit: ManageTitbit): Observable<ITitbit>
    {
        return this.http.post<ITitbit>(this.ApiController, titbit);
    }
    
    updateTitbit(titbit: ManageTitbit): Observable<ITitbit>
    {
        return this.http.put<ITitbit>(this.ApiController, titbit);
    }

    getTitbits(): Observable<ITitbitResponse>
    {
        return this.http.get<ITitbitResponse>(this.ApiController);
    }

    addTitbitCategories(category: ITitbitCategory[]): Observable<ITitbitCategoriesResponse>
    {
        return this.http.post<ITitbitCategoriesResponse>(this.ApiController + '/Categories', { categories: category });
    }

    updateTitbitCategories(category: ITitbitCategory[]): Observable<ITitbitCategoriesResponse>
    {
        return this.http.put<ITitbitCategoriesResponse>(this.ApiController + '/Categories', { categories: category });
    }

    deleteTitbitCategories(category: ITitbitCategory[]): Observable<any>
    {
        return this.http.post(this.ApiController + '/Categories/Delete', { categories: category });
    }

    getTitbitCategories(): Observable<ITitbitCategoriesResponse>
    {
        return this.http.get<ITitbitCategoriesResponse>(this.ApiController + '/Categories');
    }

    likeTitbit(titbitId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Like', { titbitId: titbitId });
    }

    unlikeTitbit(titbitId: string): Observable<any>
    {
        return this.http.post(this.ApiController + '/Unlike', { titbitId: titbitId });
    }

    deleteTitbit(titbitId: string): Observable<any>
    {
        return this.http.delete(this.ApiController + '/' + titbitId);
    }
}