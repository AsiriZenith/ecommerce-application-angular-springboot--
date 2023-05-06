import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Country } from "../commen/country";
import { State } from "../commen/state";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ShopFormService {

    private countriesUrl = `${environment.baseUrl}/countries`;
    private statesUrl = `${environment.baseUrl}/states`;

    constructor(private httpClient: HttpClient) { }

    getCountries(): Observable<Country[]> {
        return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
            map(responce => responce._embedded.countries)
        )
    }

    getStates(theCountryCode: string): Observable<State[]> {
        // search url
        const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`

        return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
            map(response => response._embedded.states)
        )
    }

    getCreditCardMonths(startMonth: number): Observable<number[]> {
        let data: number[] = []

        // build an array for 'Month' dropdown list
        // start at current month and loop

        for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
            data.push(theMonth)
        }

        return of(data)
    }

    getCreditCardYears(): Observable<number[]> {
        let data: number[] = []

        // build an array for 'Month' dropdown list
        // start at current month and loop

        const startYear: number = new Date().getFullYear()
        const endYear: number = startYear + 10

        for (let theYear = startYear; theYear < endYear; theYear++) {
            data.push(theYear)
        }

        return of(data)
    }
}

interface GetResponseCountries {
    _embedded: {
        countries: Country[]
    }
}

interface GetResponseStates {
    _embedded: {
        states: State[]
    }
}
